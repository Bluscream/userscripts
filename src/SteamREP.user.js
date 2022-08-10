// ==UserScript==
// @name         SteamREP on profiles + steam64 and steam32 ids
// @namespace    bluscream
// @version      1.0
// @description  Adds SteamREP status to any profile (even private ones)
// @createdWith  TamperMonkey
// @createdFor   TamperMonkey (Chrome), Adguard For Windows
// @author       Bluscream
// @downloadURL  https://gist.github.com/Bluscream/300bc72907fdd4731836783b49f4609d/raw/SteamREP.user.js
// @updateURL    https://gist.github.com/Bluscream/300bc72907fdd4731836783b49f4609d/raw/SteamREP.user.js
// @match        *://steamcommunity.com/profiles/*
// @match        *://steamcommunity.com/id/*
// @grant		 host:steamrep.com
// @connect      steamrep.com
// @grant        GM_xmlhttpRequest
// @grant        GM_log
// @grant         GM_addStyle
// @grant         GM_getResourceText
// @grant         GM_notification
// @resource      css https://gist.githubusercontent.com/Bluscream/300bc72907fdd4731836783b49f4609d/raw/SteamREP.css
// ==/UserScript==
// @grant        GM.xmlhttpRequest
// @grant        GM.log

(function () {
	'use strict';
    // if (typeof GM !== 'undefined') GM_log = GM.log; GM_xmlhttpRequest = GM.xmlhttpRequest;

    // GM_addStyle(GM_getResourceText('css'));
    // GM_notification("starting");
    GM_addStyle(`
.rep_error {
    color: lightred;
}
.rep_none {
    color: initial;
}
.rep_red {
    color: red;
}
.rep_caution {
    color: orange;
}
.rep_green {
    color: lightgreen;
}
		`);

    var log = function(msg, format) {
        GM_log("[Userscript:SteamREP] " + msg);
    }

    var getSteamID64 = function() {
        var url_re = /^https?:\/\/steamcommunity\.com\/(id|profiles)\/([^?\/]+)/;
        var match = url_re.exec(location.href);
        if (!match) {
            return;
        }

        var profile_type = match[1]; // 'id' or 'profiles'
        var profile_id_or_name = match[2];
        var steam_id;

        // profile_type == 'id' means that the user has configured a custom profile URL
        // profile_type == 'profiles' means that the URL still uses the numeric profile ID
        if (profile_type !== 'id') {
            // Steam ID is directly available from the URL
            return profile_id_or_name;
        }

        // Looking for "Report abuse" hidden ID.
        // It should be available whenever the browser is logged in.
        var abuse_id_input = document.querySelector('#abuseForm input[name="abuseID"]');

        if (abuse_id_input) {
            return abuse_id_input.value;
        }

        // Looking for "Add friend" link.
        // It is available even if the browser is not logged in.
        var add_friend_link = document.querySelector('#rightActionBlock .actionItem a[href*="steamcommunity.com/actions/AddFriend/"]');
        if (add_friend_link) {
            var friend_re = /^https?:\/\/steamcommunity\.com\/actions\/AddFriend\/([0-9]+)/;
            var result = friend_re.exec(add_friend_link.href);
            if (result) {
                return result[1];
            }
        }
        // check to see if we get it from the global javascript
        if (window.g_rgProfileData) {
            return window.g_rgProfileData.steamid;
        }
        return 'NotFound';
    }

    function setSteamID64(steamID64) {
        var elem_steamID64 = document.getElementById("steamid64");
        elem_steamID64.value = steamID64;
    }
    function setSteamID32(steamID32) {
        var elem_steamID32 = document.getElementById("steamid32");
        elem_steamID32.value = steamID32;
    }
    function setRepStatus(summary, full, color, image) {
        var elem_repStatus = document.getElementById("profile_steam_rep_summary");
        var elem_repFull = document.getElementById("profile_steam_rep_full");
        elem_repStatus.innerHTML = summary;
        elem_repFull.innerHTML = full;
        if (color) {
						elem_repStatus.classList.add(color);
						elem_repFull.classList.add(color);
        }
				if (image){
					var name = document.getElementsByClassName("persona_name")[0];
					// for (var i = 0; i < names.length; i++) {
					name.insertAdjacentHTML('beforeend', '&nbsp;<img style="margin-bottom:-2%;width:9%;" src="' + image + '" />'); // .classList.add(image);
					//}
				}
    }
    function setRepURL(url) {
        var elem_repURL = document.getElementById("steamrep_url");
        elem_repURL.href = url;
    }
    function setRepFromJSON(json){
        var summary = json.reputation.summary;
        var full = json.reputation.full;
        var color;var image;
        var status = summary;
        summary = summary.toLowerCase();
        if (summary === "none") {
            status = "No reputation";
            color = "rep_caution"; // image = "https://steamrep.com/js/SilverShield1.png"; // "rep_shield_unknown";
        } else if (summary === "scammer") {
            color = "rep_red"; image = "https://steamrep.com/js/RedShield1.png"; // "rep_shield_red";
        } else if (summary === "caution") {
            color = "rep_caution"; image = "https://steamrep.com/js/CautionShield1.png"; // "rep_shield_yellow";
        } else if (["admin","middleman","trusted seller"].includes(summary)) {
            color = "rep_green"; image = "https://steamrep.com/js/GreenShield1.png"; // "rep_shield_green";
        }
        setRepStatus(status, full, color, image);
    }

    var fillSteamRep = function(json) {
        var doesExist = json.steamrep.flags.status === "exists" ? true : false;
        if (!doesExist) {
            setSteamID32("Error");
            setRepStatus("Unknown", "", null);
            return;
        }
        setSteamID32(json.steamrep.steamID32);
        setRepURL(json.steamrep.steamrepurl);
        setRepFromJSON(json.steamrep);
    }

    var getSteamRep = function(steamID64, details=0) {
        var url = "http://steamrep.com/api/beta4/reputation/" + steamID64 + "?tagdetails=" + details + "&json=1"
        log("Requesting " + url);
        var ret = GM_xmlhttpRequest({
            method: "GET",
            headers: {"Accept": "application/json"},
            url: url,
            onreadystatechange: function(res) {

            },
            onload: function(res) {
                var json = res.responseJSON;
                if (typeof json === 'undefined') json = JSON.parse(res.responseText);
                console.log(json.steamrep);
                fillSteamRep(json);
            },
            onerror: function(res) {
                var msg = "An error occurred."
                + "\nresponseText: " + res.responseText
                + "\nreadyState: " + res.readyState
                + "\nresponseHeaders: " + res.responseHeaders
                + "\nstatus: " + res.status
                + "\nstatusText: " + res.statusText
                + "\nfinalUrl: " + res.finalUrl;
                log(msg);
                setSteamID32("");
                setRepStatus("Error (" + res.status + ")", res.statusText, "rep_error");
            }
        });
    }

    var appendHTMLToBans = function(className, html){
        document.getElementsByClassName(className)[0].insertAdjacentHTML('beforeend', html);
    }
	const repHTML = `<div class="profile_rep">
Steam ID 64: <input type="text" readonly id="steamid64" value="%%steamid64%%"/></br>
Steam ID 32: <input type="text" readonly id="steamid32" value="Loading..."/></br></br>
<a href="http://steamrep.com/profiles/%%steamid64%%" id="steamrep_url">SteamRep</a>: <span id="profile_steam_rep_summary">Loading...</span></br>
<span id="profile_steam_rep_full"></span>
</div>
`

    // if (!document.getElementsByClassName('profile_ban_status').length) {
    var appendToClass;
    if (document.getElementsByClassName('profile_private_info').length) {
        appendToClass = 'profile_rightcol';
    } else {
        appendToClass = 'responsive_status_info';
    }

    var id = getSteamID64();
    log("Got Steam ID: " + id);

    var html = repHTML.replace("%%steamid64%%", id);

    appendHTMLToBans(appendToClass, html);

    var test = getSteamRep(id);
    console.log(test);
})();

// @originalURL	https://gist.github.com/300bc72907fdd4731836783b49f4609d#file-SteamREP-user-js