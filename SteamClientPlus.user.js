// ==UserScript==
// @name         Steam Client +
// @namespace    Bluscream
// @version      1.0
// @description	 Enhances the Steam client.
// @author       Bluscream
// @match        http://steamcommunity.com/*
// @match        https://steamcommunity.com/*
// @grant        unsafeWindow
// @grant		 GM_xmlhttpRequest
// @require		 https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0/jquery.min.js
// @run-at		 document-end
// ==/UserScript==

'use strict';

var a=function(a){return a!==void 0?null!==this.IsCommunityID(a)?this.SetCommunityID(a):null!==this.IsSteam2(a)?this.SetSteam2(a):this.SetAccountID(a):this};a.prototype={AccountID:0,IsCommunityID:function(a){return"string"!=typeof a?null:a.match(/^7656119([0-9]{10})$/)},IsSteam2:function(a){return"string"!=typeof a?null:a.match(/^STEAM_0:([0-1]):([0-9]+)$/)},SetAccountID:function(a){if("number"==typeof a)this.AccountID=a;else{if("string"!=typeof a||isNaN(a))return!1;this.AccountID=parseInt(a,10)}return this},SetCommunityID:function(a){if(a=this.IsCommunityID(a),null===a)return!1;a=a[0].substring(7);var b=a%2;return a=(a-b-7960265728)/2,this.AccountID=a<<1|b,this},SetSteam2:function(a){return a=this.IsSteam2(a),null===a?!1:(this.AccountID=a[2]<<1|a[1],this)},GetCommunityID:function(){return"7656119"+(7960265728+this.AccountID)},GetSteam2:function(){return"STEAM_0:"+(1&this.AccountID)+":"+(this.AccountID>>1)},GetSteam3:function(){return"[U:1:"+this.AccountID+"]"},GetAccountID:function(){return this.AccountID}},"object"==typeof module&&module&&"object"==typeof module.exports?module.exports=a:window.SteamID=a

elemExists = function(elem, times) {
	if(elem){
		if(times){
			if($(elem).length > times-1){
				return true;
			}else{
				return false;
			}
		}else{
			if($(elem).length > 0){
				return true;
			}else{
				return false;
			}
		}
	}
}
requireCSS = function(uri, elemID){
	if(!elemExists($('link[href="'+uri+'"]'))){
		if(elemID){
			if(!elemExists($('#'+elemID))){
				$("<link/>",{ type: "text/css", rel: "stylesheet", href: uri, id: elemID }).appendTo($("head"));
			}
		}else{
			$("<link/>",{ type: "text/css", rel: "stylesheet", href: uri }).appendTo($("head"));
		}
	}
}
function open_url_copy(url) {
    new ShowAlertDialog('Quick Copy', "<b>Press Ctrl + C</b><br/><br/><div class='gray_bevel for_text_input'><input class='dynInput copythistext' type='text' size='70' value='" + url + "' ></div>");
    document.getElementsByClassName("copythistext")[0].focus();
    document.getElementsByClassName("copythistext")[0].select();
}
$ = jQuery || $;
requireCSS('https://cdn.rawgit.com/Bluscream/SteamClient-/master/dist/steam.css', 'steamclientpluscss');
var joinurl = $('.profile_in_game_joingame>a').attr('href');
if(joinurl && joinurl != 'steam://'){
	var _joinurl = joinurl.replace('steam://', '');_joinurl = _joinurl.replace('connect', '');_joinurl = _joinurl.replace('joinlobby', '');
	$('.profile_in_game.persona.in-game').append('</br><input class="join-url dynInput" type="text" title="'+joinurl+'" value="'+_joinurl+'" />');
	$('.join-url').prop('readonly', true);
	$('.join-url').on('click', function (e) { open_url_copy($(this).attr('title')); });
} else if(joinurl && joinurl == 'steam://') {
	$('.profile_in_game_joingame>a[href="'+joinurl+'"]').remove();
	if ($(".profile_in_game_joingame").siblings().length < 1) {
		$('.profile_in_game_joingame').remove();
	}
}
var UserSID = new SteamID(document.documentElement.outerHTML.match(/steamid"\:"(.+)","personaname/)[1]),
SteamID64 = UserSID.GetCommunityID();
var linksbox = '<div class="steamids-sidebar"></div>';
$(".profile_in_game").after(linksbox);
$(".steamids-sidebar").html("<b>Community ID:</b> <span id='cid'>"+UserSID.GetCommunityID()+"</span><br/><b>Steam 2:</b> <span id='id2'>"+UserSID.GetSteam2()+"</span><br/><b>Steam 3:</b> <span id='id3'>"+UserSID.GetSteam3()+"</span><br/>");
$('#cid,#id2,#id3').on('click', function (e) { open_url_copy($(this).text()); });
new GM_xmlhttpRequest({
  method: "GET",
  url: "https://api.truckersmp.com/v2/player/"+SteamID64,
  onload: function(response) {
  	var _json = JSON.parse(response.responseText);_json = _json.response.id;
  	if(_json && typeof _json !== undefined && _json != "undefined"){
    	$(".steamids-sidebar").append("<b>TruckersMP ID:</b> <a id='truckersmpid' href='http://truckersmp.com/en_US/user/"+_json+"'>"+_json+"</a><br/>");
    }
  }
});
var ban = '<div class="steamids-sidebar" id="bantable"></div>';
$(".steamids-sidebar").after(ban);
new GM_xmlhttpRequest({
  method: "GET",
  url: "http://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=6D46DA3A460BC5B096E95A4142A487CB&steamids="+SteamID64,
  onload: function(response) {
  	var _json = JSON.parse(response.responseText);_json = _json.players[0];
  	if(_json){
    	if(_json.VACBanned){ $('#bantable').append("<b>VAC:</b> <span id='banned_vac' color='red'>BANNED</span> ("+_json.NumberOfVACBans+" times)<br/>");
    	}else if(_json.VACBanned == false){ $('#bantable').append("<b>VAC:</b> <span id='banned_vac' color='green'>Unbanned</span><br/>");
    	}else{ $('#bantable').append("<b>VAC:</b> <span id='banned_vac'>Unknown</span><br/>"); }
    	if(_json.NumberOfGameBans > 0){ $('#bantable').append("<b>Game:</b> <span id='banned_game' color='red'>BANNED</span> ("+_json.NumberOfGameBans+" times)<br/>");
    	}else if(_json.NumberOfGameBans == 0){ $('#bantable').append("<b>Game:</b> <span id='banned_game' color='green'>Unbanned</span><br/>");
    	}else{ $('#bantable').append("<b>Game:</b> <span id='banned_game'>Unknown</span><br/>"); }
    	if(_json.CommunityBanned){ $('#bantable').append("<b>Community:</b> <span id='banned_community' color='red'>BANNED</span><br/>");
    	}else if(_json.CommunityBanned == false){ $('#bantable').append("<b>Community:</b> <span id='banned_community' color='green'>Unbanned</span><br/>");
    	}else{ $('#bantable').append("<b>Community:</b> <span id='banned_community'>Unknown</span><br/>"); }
    	if(_json.EconomyBan && _json.EconomyBan != 'none'){ $('#bantable').append("<b>Trading:</b> <span id='banned_trade' color='red'>BANNED</span><br/>");
    	}else if(_json.EconomyBan == 'none'){ $('#bantable').append("<b>Trading:</b> <span id='banned_trade' color='green'>Unbanned</span><br/>");
    	}else{ $('#bantable').append("<b>Trading:</b> <span id='banned_trade'>Unknown</span><br/>"); }
    }
  }
});
new GM_xmlhttpRequest({
  method: "GET",
  url: "https://api.truckersmp.com/v2/bans/"+SteamID64,
  onload: function(response) {
  	var _json = JSON.parse(response.responseText);_json = _json.response;
  	if(_json && typeof _json !== undefined && _json != "undefined"){
    	if(_json.length > 0){ $('#bantable').append("<b>TruckersMP:</b> <span id='banned_truckersmp' color='red'>BANNED</span><br/>");
    	}else if(_json.length == 0){ $('#bantable').append("<b>TruckersMP:</b> <span id='banned_truckersmp' color='green'>Unbanned</span><br/>");
    	}else{ $('#bantable').append("<b>TruckersMP:</b> <span id='banned_truckersmp'>Unknown</span><br/>"); }
    }
  }
});
if(!elemExists('a[title="javascript:AddFriend()"]')){
	$('.profile_header_actions').prepend('<a class="btn_profile_action btn_medium" href="steam://friends/add/'+SteamID64+'"><span>Add Friend</span></a>');
}
$('.profile_header_actions').append('<a class="btn_profile_action btn_medium" href="steam://friends/message/'+SteamID64+'"><span>Message</span></a>');
