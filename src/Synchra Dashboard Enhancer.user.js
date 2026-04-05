// ==UserScript==
// @name         Synchra Dashboard Enhancer
// @namespace    http://tampermonkey.net/
// @version      0.7.0
// @description  Consolidated high-fidelity enhancement for Synchra Dashboard Activity Feed, Chat, and User Popouts.
// @author       Antigravity
// @match        https://dash.synchra.net/*
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// ==/UserScript==
(function() {
    'use strict';
    const DEBUG = true; // Set to true for terminal debugging
    const log = (msg) => { if (DEBUG) console.debug(`[Synchra Enhancer] ${msg}`); };
    let giftMap = {}; // Gift mapping (Learned via Gist + API Interceptor)
    const loadGifts = async () => { // Fetch external gift data
        try {
            const response = await fetch('https://gist.githubusercontent.com/Bluscream/bc20c5e469eda2129d229242e28abe1c/raw/tiktok-gifts-list.json');
            if (!response.ok) throw new Error(`HTTP status: ${response.status}`);
            const data = await response.json();
            log("Gift Repository Loaded.");
            data.forEach(g => {
                if (g.id) giftMap[g.id] = g;
                if (g.slug) giftMap[g.slug.toLowerCase()] = g;
                if (g.names) {
                    Object.values(g.names).forEach(name => {
                        const lowerName = name.toLowerCase();
                        if (!giftMap[lowerName]) giftMap[lowerName] = g;
                    });
                }
            });
        } catch (e) {
            log(`Failed to load gift repo: ${e}`);
            setTimeout(loadGifts, 5000);
        }
    };
    loadGifts();
    GM_addStyle(`
        .synchra-master-wrapper { display: flex !important; flex-flow: row nowrap !important; align-items: center !important; gap: 12px !important; width: 100% !important; padding: 4px 0; }
        .synchra-handle { font-weight: 600; color: #fff; max-width: 180px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .synchra-diamond-badge { background: rgba(0, 242, 234, 0.15); color: #00f2ea; padding: 2px 8px; border-radius: 4px; font-weight: bold; font-size: 0.85rem; white-space: nowrap; }
        .synchra-gift-icon { width: 32px; height: 32px; object-fit: contain; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.4)); transition: transform 0.2s; }
        .synchra-gift-icon:hover { transform: scale(2.0); z-index: 100; }
        .synchra-master-wrapper svg { width: 18px !important; height: 18px !important; flex-shrink: 0; }
        .mantine-datatable-row[data-is-gift="true"] { background-color: rgba(255, 0, 80, 0.03) !important; }
        .synchra-fallback-name { font-weight: bold; color: #ccc; font-size: 0.85rem; font-style: italic; }
        .synchra-profile-btn { background: var(--brand-bg, rgba(255,255,255,0.05)); border: 1px solid var(--brand-border, rgba(255,255,255,0.2)); color: #ffffff !important; width: 32px; height: 32px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; margin-left: 12px; margin-right: 8px; flex-shrink: 0; }
        .synchra-profile-btn:hover { background: var(--brand-hover, rgba(255,255,255,0.1)); border-color: var(--brand-color, #ffffff); transform: translateY(-1px); box-shadow: 0 4px 12px var(--brand-glow, rgba(255,255,255,0.1)); }
    `);
    function getMantinePart(root, order) { return root.querySelector(`[style*="order: ${order}"]`); }
    function applyEnrichment(container, giftName, diamondCount) {
        const gift = giftMap[giftName.toLowerCase()] || { name: giftName, diamond_count: diamondCount };
        const finalDia = diamondCount || gift.diamond_count;
        if (finalDia > 0) { // Diamond Badge (Order 10)
            let badge = container.querySelector('.synchra-diamond-badge');
            if (!badge) { badge = document.createElement('span'); badge.className = 'synchra-diamond-badge'; container.appendChild(badge); }
            badge.textContent = `💎 ${finalDia}`;
            badge.style.order = "10";
        }
        if (gift.image_url) { // Gift Icon (Order 20)
            let img = container.querySelector('.synchra-gift-icon');
            if (!img) { img = document.createElement('img'); img.className = 'synchra-gift-icon'; container.appendChild(img); }
            img.src = gift.image_url; img.title = giftName; img.style.order = "20";
            container.querySelector('.synchra-fallback-name')?.remove();
        } else { // Fallback Name (Order 15)
            let fallback = container.querySelector('.synchra-fallback-name');
            if (!fallback) { fallback = document.createElement('span'); fallback.className = 'synchra-fallback-name'; container.appendChild(fallback); }
            fallback.textContent = giftName; fallback.style.order = "15";
        }
    }
    function enhanceActivityRow(row) {
        if (row.dataset.synchraEnhanced) return; // Immediate guard
        const typeLabel = row.querySelector('.mantine-Paper-root') || row.querySelector('.m_1b7284a3');
        if (!typeLabel || !typeLabel.textContent.includes('Gift')) return;
        row.dataset.synchraEnhanced = "true"; row.dataset.isGift = "true"; // Mark early
        const namePart = getMantinePart(row, 12); const countPart = getMantinePart(row, 11);
        if (!namePart) return;
        const giftName = namePart.textContent.trim(); const diamondCount = parseInt(countPart?.textContent) || 0;
        namePart.style.display = 'none'; if (countPart) countPart.style.display = 'none';
        const flexRoot = row.querySelector('.mantine-Flex-root'); if (!flexRoot) return;
        let master = flexRoot.parentElement.querySelector('.synchra-master-wrapper');
        if (!master) { master = document.createElement('div'); master.className = 'synchra-master-wrapper'; flexRoot.parentElement.prepend(master); }
        const icon = row.querySelector('svg[class*="brand-"], .tabler-icon-brand-tiktok, .tabler-icon-brand-twitch');
        if (icon) { // Move Platform Icon (Order 1)
            const iconWrap = icon.closest('.mantine-Flex-root') || icon.parentElement; iconWrap.style.order = "1"; master.appendChild(iconWrap);
        }
        typeLabel.style.order = "2"; master.appendChild(typeLabel); // Move Label (Order 2)
        const handle = row.querySelector('p'); if (handle) { handle.style.order = "3"; master.appendChild(handle); } // Move Handle (Order 3)
        Array.from(row.querySelectorAll('.mantine-Flex-root')).forEach(f => { // Cleanup original flex containers
            if (f !== master && !master.contains(f)) f.style.display = 'none';
        });
        applyEnrichment(master, giftName, diamondCount);
    }
    function enhanceChatMessage(msg) {
        if (msg.dataset.synchraEnhanced) return; // Immediate guard
        const text = msg.textContent.toLowerCase(); if (!text.includes('sent ')) return;
        for (const [key, gift] of Object.entries(giftMap)) {
            if (text.includes(`sent ${key.toLowerCase()}`)) {
                msg.dataset.synchraEnhanced = "true"; // Mark early
                const target = msg.querySelector('[class*="_message-content_"]') || msg;
                applyEnrichment(target, gift.name || key, gift.diamond_count || 0); break;
            }
        }
    }
    function enhanceUserPopout(dialog) {
        if (dialog.dataset.synchraProfileInjected) return;
        const header = dialog.querySelector('.mantine-Modal-header') || dialog.querySelector('.m_220c80f2') || dialog.querySelector('[class*="Modal-header"]');
        if (!header) { setTimeout(() => enhanceUserPopout(dialog), 100); return; } // Retry if header not yet rendered
        const titleEle = dialog.querySelector('h2') || dialog.querySelector('.mantine-Modal-title');
        const title = (titleEle?.textContent || '').trim();
        if (!title) { setTimeout(() => enhanceUserPopout(dialog), 100); return; } // Retry if title not yet rendered
        const platformMarkers = {
            twitch: ['.tabler-icon-brand-twitch', 'img[alt*="Twitch"]', 'img[src*="twitch"]'],
            tiktok: ['.tabler-icon-brand-tiktok', 'img[alt*="TikTok"]', 'img[src*="tiktok"]', 'Moderation not supported for TikTok'],
            youtube: ['.tabler-icon-brand-youtube', 'img[alt*="YouTube"]', 'img[src*="youtube"]'],
            kick: ['.tabler-icon-brand-kick', 'img[alt*="Kick"]', 'img[src*="kick"]']
        };
        let platform = null; // Explicitly null for retry logic
        const modMatch = dialog.innerText.match(/Moderation not supported for (\w+)/);
        if (modMatch) { platform = modMatch[1].toLowerCase(); }
        else {
            for (const [p, selectors] of Object.entries(platformMarkers)) {
                if (selectors.some(s => s.includes('.') || s.includes('[') ? dialog.querySelector(s) : dialog.innerText.includes(s))) { platform = p; break; }
            }
        }
        if (!platform) {
            if (!dialog.dataset.synchraDetectRetries) dialog.dataset.synchraDetectRetries = 0;
            if (parseInt(dialog.dataset.synchraDetectRetries) < 20) { // Retry for 2s
                dialog.dataset.synchraDetectRetries = parseInt(dialog.dataset.synchraDetectRetries) + 1;
                setTimeout(() => enhanceUserPopout(dialog), 100); return;
            }
            platform = 'tiktok'; // Final fallback
        }
        log(`Detected platform for ${title}: ${platform}`);
        const urls = { tiktok: `https://www.tiktok.com/search/user?q=${encodeURIComponent(title)}`, twitch: `https://www.twitch.tv/${title}`, youtube: `https://www.youtube.com/@${title}`, kick: `https://kick.com/${title}` };
        const iconSvgs = {
            tiktok: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-brand-tiktok"><path d="M9 12a4 4 0 1 0 4 4v-12a5 5 0 0 0 5 5"></path></svg>`,
            twitch: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-brand-twitch"><path d="M4 5v11h3v3l3 -3h4l4 -4v-7z"></path><path d="M9 8v2"></path><path d="M14 8v2"></path></svg>`,
            youtube: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-brand-youtube"><rect x="3" y="5" width="18" height="14" rx="4"></rect><path d="M10 9l5 3l-5 3z"></path></svg>`
        };
        const brandColors = {
            tiktok: { main: '#ffffff', bg: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.2)', hover: 'rgba(255,255,255,0.1)', glow: 'rgba(255,255,255,0.1)' },
            twitch: { main: '#9146ff', bg: 'rgba(145, 70, 255, 0.1)', border: 'rgba(145, 70, 255, 0.3)', hover: 'rgba(145, 70, 255, 0.2)', glow: 'rgba(145, 70, 255, 0.2)' },
            youtube: { main: '#ff4e45', bg: 'rgba(255, 0, 0, 0.1)', border: 'rgba(255, 0, 0, 0.3)', hover: 'rgba(255, 0, 0, 0.2)', glow: 'rgba(255, 0, 0, 0.2)' },
            kick: { main: '#53fc18', bg: 'rgba(83, 252, 24, 0.1)', border: 'rgba(83, 252, 24, 0.3)', hover: 'rgba(83, 252, 24, 0.2)', glow: 'rgba(83, 252, 24, 0.2)' }
        };
        const clr = brandColors[platform] || brandColors.tiktok;
        const btn = document.createElement('button'); btn.className = 'synchra-profile-btn';
        btn.style.setProperty('--brand-color', clr.main); btn.style.setProperty('--brand-bg', clr.bg);
        btn.style.setProperty('--brand-border', clr.border); btn.style.setProperty('--brand-hover', clr.hover);
        btn.style.setProperty('--brand-glow', clr.glow);
        btn.innerHTML = iconSvgs[platform] || iconSvgs.tiktok;
        btn.title = `Open ${platform.charAt(0).toUpperCase() + platform.slice(1)} Profile`;
        btn.onclick = (e) => { e.stopPropagation(); window.open(urls[platform] || urls.tiktok, '_blank'); };
        if (!header.querySelector('.synchra-profile-btn')) {
            const existingIcon = header.querySelector('.m_8d3afb97')?.closest('button') || header.querySelector('.tabler-icon-external-link')?.closest('button') || header.querySelector('.mantine-ActionIcon-root');
            if (existingIcon) existingIcon.parentElement.insertBefore(btn, existingIcon); else header.prepend(btn);
        }
        dialog.dataset.synchraProfileInjected = "true";
    }
    const originalFetch = window.fetch;
    window.fetch = async function(...args) { // Interceptor for real-time gift learning
        const res = await originalFetch(...args);
        const url = args[0]?.toString() || '';
        if (['/chat-messages', '/activities', '/chat-events'].some(e => url.includes(e))) {
            const clone = res.clone();
            try {
                const json = await clone.json();
                const items = json.data || (Array.isArray(json) ? json : (json.entries || []));
                (Array.isArray(items) ? items : [items]).forEach(item => {
                    const g = item.gift_metadata || item.payload?.gift_metadata || item.notice_message_parts?.find(p => p.type === 'gift_metadata')?.gift_metadata;
                    if (g && g.name) { giftMap[g.name.toLowerCase()] = { ...giftMap[g.name.toLowerCase()], ...g }; }
                });
            } catch(e) {}
        }
        return res;
    };
    const observer = new MutationObserver((mutations) => {
        mutations.forEach(m => {
            m.addedNodes.forEach(node => {
                if (node.nodeType !== 1) return; // Skip non-elements
                const process = (n) => {
                    if (n.classList.contains('mantine-datatable-row')) enhanceActivityRow(n);
                    else if (n.matches('[class*="_message_"]')) enhanceChatMessage(n);
                    else if (n.getAttribute('role') === 'dialog' || n.classList.contains('mantine-Modal-root')) enhanceUserPopout(n);
                };
                process(node);
                node.querySelectorAll('.mantine-datatable-row, [class*="_message_"], [role="dialog"], .mantine-Modal-root').forEach(process);
            });
        });
    });
    const start = () => {
        const feed = document.querySelector('.mantine-datatable tbody');
        const chat = document.querySelector('[class*="_messages_"]');
        if (feed) { observer.observe(feed, { childList: true, subtree: true }); feed.querySelectorAll('.mantine-datatable-row').forEach(enhanceActivityRow); }
        if (chat) { observer.observe(chat, { childList: true, subtree: true }); chat.querySelectorAll('[class*="_message_"]').forEach(enhanceChatMessage); }
        observer.observe(document.body, { childList: true, subtree: true }); // Watch for modals
        if (!feed || !chat) setTimeout(start, 2000);
    };
    start();
})();
