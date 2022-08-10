// ==UserScript==
// @name         DiscordTroll
// @namespace    http://betterdiscord.net/
// @version      0.1
// @description  try to take over the world!
// @author       ___
// @match        http*://discordapp.com/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
// @require      https://raw.githubusercontent.com/brandonaaron/livequery/1.1.1/jquery.livequery.js
// @grant        none
// ==/UserScript==

(function() {
    donttry = false;
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (window.location.href == 'https://discordapp.com/register') {
                var rand1 = Math.floor(Math.random() * (9999999999- 1000 + 1)) + 1000;
                var rand2 = Math.floor(Math.random() * (9999999999- 1000 + 1)) + 1000;
                $('input[id="register-email"]').val(rand1+'@'+rand2+'.com');
                $('input[id="register-username"]').val(rand1);
                $('input[id="register-password"]').val('1234');
            };
            if ((window.location.href == 'https://discordapp.com/channels/@me') || (window.location.href == 'https://discordapp.com/channels/@me?')) {
                $('button[data-reactid=".0.5.$=1$NewUserFlow.0.0.1.1"]').livequery(function(){
                    $('button[data-reactid=".0.5.$=1$NewUserFlow.0.0.1.1"]').click();
                });
                $('button[data-reactid=".0.5.$=1$ChangeLog.0.0.0.1"]').livequery(function(){
                    $('button[data-reactid=".0.5.$=1$ChangeLog.0.0.0.1"]').click();
                });
                if (donttry != true) {
                    $(".guilds-add").click();
                    $(".action.join .btn").click();
                    $(".create-guild-container input").val('0ESuwoZe4M1IZxTH');//Replace with the invite code of the server you want to auto join.
                    $(".form.join-server .btn-primary").click();
                    if ($('.error').text() == "(Die Soforteinladung ist ungültig oder abgelaufen.)") { // Change this text to what it's called in your language.
                        donttry = true;
                        $('.btn-default').click();
                        simulateKeyPress("ESC");
                        //donttry = false;
                    }
                }
            };
        });
    });
    function simulateKeyPress(character) {
         jQuery.event.trigger({ type : 'keypress', which : character.charCodeAt(0) });
        console.log('keypressed: '+character.charCodeAt(0));
    }
    observer.observe(document.body, { childList: true, subtree: true, attributes: false, characterData: false });
})();

// @originalURL	https://gist.github.com/f8c3f4e9246af39b12a5#file-DiscordTroll-user-js