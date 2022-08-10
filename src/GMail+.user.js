// ==UserScript==
// @name         GMail+
// @version      0.1
// @description  try to take over the world!
// @match        *mail.google.com/mail/*
// @require      https://code.jquery.com/jquery-2.2.1.min.js
// @require      https://cdn.rawgit.com/brandonaaron/livequery/1.1.1/jquery.livequery.js
// @grant        none
// @run-at       document-end
// @author       Bluscream
// @namespace    admin@timo.de.vc
// ==/UserScript==

(function() {
    'use strict';
    $( document ).ready(function() {
        console.log('loaded.');
        //$('.J-Ke.n4').livequery(function(){ $(this).click(); });
        setTimeout(function(){ $('.J-Ke.n4').click(); }, 5000);
        console.log('clicked.');
    });
})();

// @originalURL	https://gist.github.com/18dd0a9e28ec9b4d26f8#file-GMail+-user-js