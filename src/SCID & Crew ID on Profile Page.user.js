// ==UserScript==
// @name         SCID & Crew ID on Profile Page
// @namespace    http://tampermonkey.net/
// @version      2.0.1
// @description  Adds SCID and 2Take1 fake Friends Compatible name:SCID for easy Copy and paste into Scid.cfg
// @description  Adds Primar Crew ID to profile
// @author       IN2Moist
// @match        https://socialclub.rockstargames.com/member/*
// @match        *socialclub.rockstargames.com/member/*
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';

    function getCookie(e) {
        for (var t = e + "=", r = decodeURIComponent(document.cookie).split(";"), o = 0; o < r.length; o++) {
            for (var n = r[o];
                 " " == n.charAt(0);) n = n.substring(1);
            if (0 == n.indexOf(t)) return n.substring(t.length, n.length)
        }
        return ""
    }

    var path = window.location.pathname;
    if(path[path.length-1] != '/') path += '/';
    var username = /^\/member\/([\w\W]+)\//.exec(path)[1];

    setTimeout(function() { // Wait for everything to load
    $.ajax({
          method: 'GET', 
          url: 'https://scapi.rockstargames.com/profile/getprofile?nickname=' + username + '&maxFriends=3',
          beforeSend: function(request) {
              request.setRequestHeader('Authorization', 'Bearer ' + getCookie('BearerToken'));
              request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
          }
    })
        .done(function(data) {
            console.log(data);
            var scid = data.accounts[0].rockstarAccount.rockstarId;
            var sclanid = data.accounts[0].rockstarAccount.primaryClanId;
            var schx = scid.toString(16);
            var $info = $('[class^="ProfileHeader__extraInfo"]');
            $info.append('<HR><span style="margin-left:10px;"><P>Social Club ID: ' + scid + '</P><HR><P>'+ username +":" + schx +'</P><HR><P>Crew ID: ' + sclanid + '</P></span>');
        });
    }, 1000);
})();