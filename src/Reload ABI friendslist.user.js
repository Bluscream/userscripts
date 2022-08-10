// ==UserScript==
// @name         Reload ABI friendslist
// @namespace    https://ljoonal.xyz
// @version      0.3.2
// @author       ljoonal
// @match        https://hub.abinteractive.net/dashboard
// @match        https://hub.abinteractive.net/social/friends
// @updateURL    https://git.ljoonal.xyz/ljoonal/user._/raw/scripts/ABI-reloader.user.js
// @icon         https://git.ljoonal.xyz/ljoonal/user._/raw/resources/icon.png
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  function reloadWhenVisible() {
    // Why would we spam the ABI servers if the document is hidden...
    if (document.visibilityState === "visible") window.location.reload();
    else document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") window.location.reload();
    });
  }

  setInterval(reloadWhenVisible, 1000 * 60 * 10)
})();
