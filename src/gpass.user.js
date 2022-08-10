// ==UserScript==
// @name         Google Passwords
// @namespace    admin@timo.de.vc
// @version      0.1
// @description  try to take over the world!
// @author       Bluscream
// @match        *.google.com/*
// @grant        none
// @require      https://code.jquery.com/jquery-2.2.1.min.js
// @require      https://cdn.rawgit.com/brandonaaron/livequery/1.1.1/jquery.livequery.js
// ==/UserScript==

gpass = {
     login : function () {
        switch($('#reauthEmail').text()){
            case "<FIRST ACC EMAIL HERE>":
                $('#Passwd').val('<FIRST ACC PW HERE>');
                break;
            case "<SECOND ACC EMAIL HERE>":
                $('#Passwd').val('<SECOND ACC PW HERE>');
                break;
        }
        $('#signIn').click();
    },
    showPasswords : function() {
        var time = 1000;
        $('.Vaa.AW.BW').each(function( index, item ) {
            setTimeout( function(){ $(item).click(); }, time);
            time += 1000;
        });
    },
    removeCrap : function() {
           $('.Hn, .y4VOmd, .iKeNEd, div[jsmodel="xLMTec"]').remove();
    }
};

(function() {
    'use strict';
    switch (window.location.host) {
        case "accounts.google.com":
            switch (true) {
                case /^\/ServiceLogin/.test(window.location.pathname):
                    $( document ).ready(function() {
                        gpass.login();
                    });
            }
            break;
        case "passwords.google.com":
            $( document ).ready(function() {
                setTimeout(function () { gpass.removeCrap();/*gpass.showPasswords();*/ }, 10000);
            });
            break;
    }
})();


// @originalURL	https://gist.github.com/e1e77edbaf10af906fb3a27cf6f80446#file-gpass-user-js