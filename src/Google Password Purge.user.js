// ==UserScript==
// @name         Google Password Purge
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://passwords.google.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant  unsafeWindow
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';
    function sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }
    var fireOnHashChangesToo    = true;
    var pageURLCheckTimer       = setInterval (
        function () {
            if (   this.lastPathStr  !== location.pathname
                || this.lastQueryStr !== location.search
                || (fireOnHashChangesToo && this.lastHashStr !== location.hash)
               ) {
                this.lastPathStr  = location.pathname;
                this.lastQueryStr = location.search;
                this.lastHashStr  = location.hash;
                gmMain ();
            }
        }
        , 111
    );
    function gmMain () {
        console.log ('URL Changed: ', navigation.currentEntry.url);
            if (navigation.currentEntry.url.startsWith("https://passwords.google.com/?ep=1")) {
        sleep(2000).then(() => {
//                 var button = document.createElement("Button");
//                 button.innerHTML = "Title";
//                 button.style = "top:0;right:0;position:absolute;z-index: 9999"
//                 document.body.appendChild(button);

                let links = [];
                const allHeader = document.querySelectorAll(".K6ZZTd");
                for (const header of allHeader) {
                    links.push("https://passwords.google.com/password/"+header.getAttribute("data-id")+"?ep=1");
                }
                console.log(links.join("\n"));
                location.href = links[0];
                //history.pushState({},"URL Rewrite Example",links[0]);
        });
            } else if (navigation.currentEntry.url.startsWith("https://passwords.google.com/password/")) {
        sleep(1500).then(() => {
                document.querySelector("#yDmH0d > c-wiz > div > div.qFCzge > c-wiz > c-wiz > div > div:nth-child(1) > c-wiz > div > div > div > div.QeNpne > div.V6qdjc > div:nth-child(2)").click();
                sleep(1000).then(() => {
                    document.querySelector("#yDmH0d > div.llhEMd.iWO5td > div > div.g3VIld.fHKvqc.BVDXod.Up8vH.J9Nfi.iWO5td > div.XfpsVe.J9fJmf > div.U26fgb.O0WRkf.oG5Srb.HQ8yf.C0oVfc.kHssdc.HvOprf.FsOtSd.I0k89d.M9Bg4d").click();
                });
        });
            }
    }
})();