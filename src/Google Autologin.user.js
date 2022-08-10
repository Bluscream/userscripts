// ==UserScript==
// @name         Google Autologin
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://accounts.google.com/signin/v2/challenge/pwd?continue=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        unsafeWindow
// ==/UserScript==

(function() {
    console.log("Google Autologin: START");
    'use strict';
    function sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }
    function fill() {
        console.log("FILLING PASSWORD");
        document.querySelector("#password > div.aCsJod.oJeWuf > div > div.Xb9hP > input").value = "Bueffel911mal1";
        sleep(500).then(() => {
            document.querySelector("#passwordNext > div > button").click();
        });
    }
//     let observer = new MutationObserver((mutations) => {
//         console.log("Google Autologin: MutationObserver fired");
//         mutations.forEach((mutation) => {
//             if (!mutation.addedNodes) return

//             for (let i = 0; i < mutation.addedNodes.length; i++) {
//                 // do things to your newly added nodes here
//                 let node = mutation.addedNodes[i];
//                 console.log("NEW NODE:");
//                 console.log(node);
//                 }
//         })
//     })

//     observer.observe(document.body, {
//         childList: true
//         , subtree: true
//         , attributes: false
//         , characterData: false
//     })
    sleep(500).then(() => {
        console.log("Google Autologin: sleep passed");
        fill();
    });
    console.log("Google Autologin: END");
})();