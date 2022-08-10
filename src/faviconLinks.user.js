// ==UserScript==
// @name        Add Favicons to links
// @namespace   Bluscream
// @version     1.0
// @description H3H3
// @author      Bluscream
// @include     *
// @grant       unsafeWindow
// @grant       GM_xmlhttpRequest
// @require     https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0/jquery.min.js
// @downloadURL https://gist.githubusercontent.com/Bluscream/0ac506f36795951962492785a9626132/raw/d65b3fcdc844e812774406b2532537af2bf9698a/faviconLinks.js
// @run-at      document-end
// ==/UserScript==
(function() {
    'use strict';
    try { $ = jQuery || $; } catch(err) { console.log(err.message); }
    $( document ).ready(function () {
        $("a:not(.stylish_dontparse)").each(function (nId,oData,oError){
            url = $(oData).prop("hostname");
            if (url != "" &&
            document.domain != url &&
            $(oData).css('background-image') == "none" &&
            $(oData).css('background-repeat') == "repeat" &&
            $(oData).css('background-position') == "0% 0%" &&
            $(oData).css('padding') == "" ) {
                var url = "https://www.google.com/s2/favicons?domain="+url;
                console.log("Requesting "+url);
                $(oData).css("padding", "0 18px 0 0");
                $(oData).css("background-image", "url('"+url+"')");
                $(oData).css("background-repeat", "no-repeat");
                $(oData).css("background-position", "center right");
            }
        });
    });
})();

// @originalURL	https://gist.github.com/0ac506f36795951962492785a9626132#file-faviconLinks-user-js