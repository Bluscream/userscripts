// ==UserScript==
// @name         browserTools
// @namespace    https://github.com/Bluscream/userscripts
// @version      1.2.0
// @description  Right-click toolbox: unlock disabled/readonly/unselectable/blurred elements, unhide, make editable, remove, copy selector/HTML, unlock the page, nuke overlays.
// @author       Bluscream
// @homepageURL  https://github.com/Bluscream/userscripts
// @downloadURL  https://raw.githubusercontent.com/Bluscream/userscripts/master/src/browserTools.user.js
// @updateURL    https://raw.githubusercontent.com/Bluscream/userscripts/master/src/browserTools.user.js
// @match        *://*/*
// @run-at       document-start
// @grant        GM_registerMenuCommand
// ==/UserScript==

(function () {
    'use strict';

    /* ------------------------------------------------------------------ *
     *  Target tracking
     *  Firefox dispatches no mousedown/contextmenu on disabled form
     *  controls, so the right-clicked element comes from pointerdown, with
     *  the last pointer position as a fallback.
     * ------------------------------------------------------------------ */

    let targetEl = null;
    let targetPoint = null; // page coordinates of the right-click
    let lastPointer = null; // page coordinates; freezes while the native menu is open

    const IS_TOP = window.top === window.self;

    function remember(e) {
        targetEl = e.target;
        targetPoint = { x: e.pageX, y: e.pageY };
    }

    function resolveTarget() {
        if (targetEl && targetEl.isConnected) return targetEl;
        // The element was re-rendered, or never recorded: use the position.
        const point = targetPoint || lastPointer;
        if (!point) return null;
        targetEl = document.elementFromPoint(point.x - scrollX, point.y - scrollY);
        return targetEl;
    }

    /* ------------------------------------------------------------------ *
     *  Element actions
     * ------------------------------------------------------------------ */

    const DISABLED_CLASS = /(^|[-_])(disabled|is-disabled|readonly|locked)($|[-_])/i;
    const CONTROL = 'button, input, select, textarea, a, [role=button]';

    // Marks our own toast/menu so page-wide actions leave them alone.
    const OWN_UI = 'data-browser-tools';

    // Visit root and every descendant element; count how many fn changed.
    function walk(root, fn) {
        let count = 0;
        for (const el of [root, ...root.querySelectorAll('*')]) {
            if (!el.closest(`[${OWN_UI}]`) && fn(el)) count++;
        }
        return count;
    }

    // Undo everything that makes an element unusable: disabled/readonly/inert
    // attributes and properties, CSS fakes (pointer-events, faded opacity,
    // user-select, blur filters) and "disabled"-looking classes.
    function unlock(el) {
        let changed = false;
        const strip = (attr) => {
            if (el.hasAttribute(attr)) { el.removeAttribute(attr); changed = true; }
        };
        const force = (prop, value) => {
            el.style.setProperty(prop, value, 'important');
            changed = true;
        };

        strip('disabled');
        strip('readonly');
        strip('inert');
        if (el.getAttribute('aria-disabled') === 'true') { el.setAttribute('aria-disabled', 'false'); changed = true; }
        if (el.getAttribute('tabindex') === '-1') strip('tabindex');
        if (el.getAttribute('contenteditable') === 'false') strip('contenteditable');

        // Live properties are not always mirrored by attributes.
        if (el.disabled === true) { el.disabled = false; changed = true; }
        if (el.readOnly === true) { el.readOnly = false; changed = true; }

        const cs = getComputedStyle(el);
        if (cs.pointerEvents === 'none') force('pointer-events', 'auto');
        if (cs.userSelect === 'none') force('user-select', 'text');
        if (cs.filter !== 'none') force('filter', 'none');
        if (parseFloat(cs.opacity) < 0.95 && el.matches(CONTROL)) force('opacity', '1');

        for (const c of [...el.classList]) {
            if (DISABLED_CLASS.test(c)) { el.classList.remove(c); changed = true; }
        }
        return changed;
    }

    function unhide(el) {
        let changed = false;
        const force = (prop, value) => {
            el.style.setProperty(prop, value, 'important');
            changed = true;
        };
        if (el.hasAttribute('hidden')) { el.removeAttribute('hidden'); changed = true; }
        const cs = getComputedStyle(el);
        if (cs.display === 'none') force('display', 'revert');
        if (cs.visibility === 'hidden') force('visibility', 'visible');
        if (parseFloat(cs.opacity) === 0) force('opacity', '1');
        return changed;
    }

    function toggleEditable(el) {
        const on = !el.isContentEditable;
        el.contentEditable = on ? 'true' : 'inherit';
        return on ? 'Editable: click to type' : 'No longer editable';
    }

    function copy(text, msg) {
        navigator.clipboard?.writeText(text);
        return msg;
    }

    function cssSelector(el) {
        const parts = [];
        for (let node = el; node && node.nodeType === 1 && parts.length < 5; node = node.parentElement) {
            if (node.id) { parts.unshift(`#${CSS.escape(node.id)}`); break; }
            let part = node.nodeName.toLowerCase();
            if (node.classList.length) {
                part += '.' + [...node.classList].map((c) => CSS.escape(c)).join('.');
            } else if (node.parentElement) {
                const same = [...node.parentElement.children].filter((c) => c.nodeName === node.nodeName);
                if (same.length > 1) part += `:nth-of-type(${same.indexOf(node) + 1})`;
            }
            parts.unshift(part);
        }
        return parts.join(' > ');
    }

    /* ------------------------------------------------------------------ *
     *  Page-wide actions
     * ------------------------------------------------------------------ */

    const BLOCKED_EVENTS = ['contextmenu', 'selectstart', 'copy', 'cut', 'paste', 'dragstart'];
    let pageFreed = false;

    // Stop the page's own listeners from blocking right-click, selection and
    // copy/paste, then unlock every element.
    function unlockPage() {
        if (!pageFreed) {
            pageFreed = true;
            for (const type of BLOCKED_EVENTS) {
                // Capture on window runs before the page's listeners.
                window.addEventListener(type, (e) => e.stopImmediatePropagation(), true);
            }
            const style = document.createElement('style');
            style.textContent = '* { user-select: text !important; -webkit-user-select: text !important; }';
            (document.head || document.documentElement).appendChild(style);
        }
        for (const type of BLOCKED_EVENTS) {
            document['on' + type] = null;
            document.documentElement['on' + type] = null;
            if (document.body) document.body['on' + type] = null;
        }
        return `Page unlocked; ${walk(document.body, unlock)} element(s) changed`;
    }

    // Remove full-viewport fixed/absolute layers on top of the page
    // (paywalls, login gates, cookie walls) and restore scrolling.
    function removeOverlays() {
        let removed = 0;
        for (const el of document.querySelectorAll('body *')) {
            const cs = getComputedStyle(el);
            if (cs.position !== 'fixed' && cs.position !== 'absolute') continue;
            if (cs.pointerEvents === 'none' || (parseInt(cs.zIndex, 10) || 0) < 100) continue;
            const r = el.getBoundingClientRect();
            if (r.width >= innerWidth * 0.9 && r.height >= innerHeight * 0.9) { el.remove(); removed++; }
        }
        document.documentElement.style.setProperty('overflow', 'auto', 'important');
        document.body.style.setProperty('overflow', 'auto', 'important');
        document.body.style.setProperty('position', 'static', 'important');
        return `Removed ${removed} overlay(s)`;
    }

    /* ------------------------------------------------------------------ *
     *  Menu definition
     * ------------------------------------------------------------------ */

    const MENU = [
        {
            label: 'Unlock',
            hint: 'undisable, unblur, make selectable (incl. children)',
            run: (el) => `Unlocked ${walk(el, unlock)} element(s)`,
        },
        {
            label: 'Unhide',
            hint: 'reveal hidden children',
            run: (el) => `Revealed ${walk(el, unhide)} element(s)`,
        },
        { label: 'Toggle Editable', run: toggleEditable },
        { label: 'Remove Element', run: (el) => { el.remove(); return 'Element removed'; } },
        { label: 'Copy Selector', run: (el) => { const s = cssSelector(el); return copy(s, s); } },
        { label: 'Copy HTML', run: (el) => copy(el.outerHTML, 'Outer HTML copied') },
        { separator: true },
        {
            label: 'Unlock Page',
            hint: 'right-click, selection, copy/paste + unlock everything',
            pageWide: true,
            run: unlockPage,
        },
        {
            label: 'Remove Overlays',
            hint: 'paywalls, login gates, cookie walls',
            pageWide: true,
            run: removeOverlays,
        },
    ];

    function runItem(item) {
        const el = item.pageWide ? null : resolveTarget();
        if (!item.pageWide && !el) {
            toast('Right-click an element first, then pick this from the Tampermonkey menu');
            return;
        }
        try {
            toast(item.run(el));
        } catch (err) {
            console.error('[browserTools]', err);
            toast('Error: ' + err.message);
        }
    }

    /* ------------------------------------------------------------------ *
     *  UI: toast + Ctrl+Right-click menu
     * ------------------------------------------------------------------ */

    let menuEl = null;

    function closeMenu() {
        if (menuEl) { menuEl.remove(); menuEl = null; }
    }

    function toast(msg) {
        if (!msg) return;
        const t = document.createElement('div');
        t.setAttribute(OWN_UI, '');
        t.textContent = String(msg);
        Object.assign(t.style, {
            position: 'fixed', zIndex: 2147483647, bottom: '20px', left: '50%',
            transform: 'translateX(-50%)', background: '#1e1e1e', color: '#fff',
            padding: '10px 16px', borderRadius: '8px', font: '13px/1.4 system-ui, sans-serif',
            boxShadow: '0 4px 20px rgba(0,0,0,.4)', pointerEvents: 'none', opacity: '0',
            transition: 'opacity .15s', maxWidth: '80vw',
        });
        document.body.appendChild(t);
        requestAnimationFrame(() => { t.style.opacity = '1'; });
        setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 200); }, 2200);
    }

    function openMenu(x, y) {
        closeMenu();
        menuEl = document.createElement('div');
        menuEl.setAttribute(OWN_UI, '');
        Object.assign(menuEl.style, {
            position: 'fixed', zIndex: 2147483647, top: y + 'px', left: x + 'px',
            background: '#242424', color: '#eee', border: '1px solid #3a3a3a',
            borderRadius: '8px', padding: '4px', minWidth: '220px',
            font: '13px system-ui, sans-serif', boxShadow: '0 8px 30px rgba(0,0,0,.5)',
            userSelect: 'none',
        });

        const header = document.createElement('div');
        header.textContent = 'browserTools';
        Object.assign(header.style, {
            padding: '6px 10px', fontSize: '11px', letterSpacing: '.08em',
            textTransform: 'uppercase', color: '#888',
        });
        menuEl.appendChild(header);

        for (const item of MENU) {
            if (item.separator) {
                const hr = document.createElement('div');
                Object.assign(hr.style, { height: '1px', background: '#3a3a3a', margin: '4px 6px' });
                menuEl.appendChild(hr);
                continue;
            }
            const row = document.createElement('div');
            Object.assign(row.style, {
                padding: '7px 10px', borderRadius: '5px', cursor: 'pointer',
                display: 'flex', flexDirection: 'column', gap: '2px',
            });
            const lbl = document.createElement('span');
            lbl.textContent = item.label;
            row.appendChild(lbl);
            if (item.hint) {
                const h = document.createElement('span');
                h.textContent = item.hint;
                Object.assign(h.style, { fontSize: '11px', color: '#888' });
                row.appendChild(h);
            }
            row.addEventListener('mouseenter', () => { row.style.background = '#3a6ea5'; });
            row.addEventListener('mouseleave', () => { row.style.background = 'transparent'; });
            row.addEventListener('click', (e) => {
                e.stopPropagation();
                closeMenu();
                runItem(item);
            });
            menuEl.appendChild(row);
        }

        document.body.appendChild(menuEl);

        // Keep the menu inside the viewport.
        const r = menuEl.getBoundingClientRect();
        if (r.right > innerWidth) menuEl.style.left = (innerWidth - r.width - 8) + 'px';
        if (r.bottom > innerHeight) menuEl.style.top = (innerHeight - r.height - 8) + 'px';
    }

    /* ------------------------------------------------------------------ *
     *  Event wiring (capture on window: runs before the page's listeners)
     * ------------------------------------------------------------------ */

    window.addEventListener('pointerdown', (e) => {
        if (e.button !== 2) return;
        remember(e);
        // Open from pointerdown, not contextmenu, so Ctrl+Right-click also
        // works on disabled controls, which never get a contextmenu event.
        if (e.ctrlKey) openMenu(e.clientX, e.clientY);
    }, true);

    window.addEventListener('contextmenu', (e) => {
        remember(e);
        if (!e.ctrlKey) return;
        e.preventDefault();
        e.stopImmediatePropagation();
    }, true);

    window.addEventListener('pointermove', (e) => {
        lastPointer = { x: e.pageX, y: e.pageY };
    }, { capture: true, passive: true });

    // A left click outside our menu ends the right-click: drop the target
    // and close the menu.
    window.addEventListener('click', (e) => {
        if (menuEl && menuEl.contains(e.target)) return;
        targetEl = null;
        targetPoint = null;
        closeMenu();
    }, true);
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); }, true);
    window.addEventListener('scroll', closeMenu, true);

    // Tampermonkey menu (toolbar popup and Firefox's right-click submenu).
    // Top frame only, so a command never runs in a frame that didn't see the
    // right-click; the Ctrl+Right-click menu still works inside iframes.
    if (IS_TOP) {
        for (const item of MENU) {
            if (item.separator) continue;
            GM_registerMenuCommand(`${item.pageWide ? '🌐' : '🎯'} ${item.label}`, () => runItem(item));
        }
    }
})();
