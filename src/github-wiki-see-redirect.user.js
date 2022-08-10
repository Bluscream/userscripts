// ==UserScript==
// @name         github-wiki-see-redirect
// @namespace    nelsonjchen.github-wiki-see-redirect
// @version      0.1
// @description
// @author       nelsonjchen
// @match        https://github-wiki-see.page/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    if (document.getElementById('header_button')) {
        window.location.replace(document.querySelector(".visit_url_button").href);
    }
})();