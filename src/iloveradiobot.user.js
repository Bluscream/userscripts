// ==UserScript==
// @name         ILoveRadioBot
// @namespace    Bluscream
// @version      1
// @description  Provides a bot interface for I?Radio
// @author       Bluscream
// @downloadurl  https://gist.githubusercontent.com/Bluscream/d0f3bf4f4e380e528cb60f51aafc28c7/raw/iloveradiobot.user.js
// @updateurl    https://gist.githubusercontent.com/Bluscream/d0f3bf4f4e380e528cb60f51aafc28c7/raw/iloveradiobot.user.js
// @match        http://www.iloveradio.de/iloveradio/?popup
// @grant        none
// ==/UserScript==

if(window.location.href == "http://www.iloveradio.de/iloveradio/?popup"){
	var interval;
	(function() {
	    'use strict';
		var debug = true;var disabled = localStorage.getItem('disabled') || 'false';var random = localStorage.getItem('random') || 'false';var welcome = localStorage.getItem('welcome') || 'true'; var bye = localStorage.getItem('bye') || 'false';
		//console.warn(disabled);console.warn(random);console.warn(welcome);console.warn(bye);
		var sendMessage = function(msg){ if(debug){console.info('Sending message: \n\n'+msg);}ilr3.shoutbox.send(msg);};
		var sayMessage = function(name, msg){ sendMessage(name+': '+msg);};
		var randomString = function(len){
			var text = "";var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
			for(var i=0;i<len;i++){text += possible.charAt(Math.floor(Math.random() * possible.length));}
			return text;
		};
		var ilr = {
			eval: true,
			name: 'James',
			operators: ['Kevin'],
			prefix: '!',
			welcomes: ['hi', 'hey', 'hall', 'jo', 'guten'],
			byes: ['bye', 'tschüss', 'tschau', 'ciao'],
			users: [],
			blacklist: [],
			commands: {
				'coms': 'var coms = "";'+
					'for (var key in ilr.commands) {'+
						'if (!ilr.commands.hasOwnProperty(key)){continue;}'+
						'if (ilr.admincommands.hasOwnProperty(key)){continue;}'+
						'coms = coms + ilr.prefix +key+" ";'+
					'}'+
					'sendMessage('+
					'"Befehle: "+coms);',
				'boot': 'sendMessage("gist[DOT]github[DOT]com/Bluscream/d0f3bf4f4e380e528cb60f51aafc28c7");',
				'playing': 'var _radio = $(".channel-headline.big").text();'+
				'var _artist = $(".channelinfo>.artist").text().toTitleCase();'+
				'var _title = $(".channelinfo>.title").text().toTitleCase();'+
					'sendMessage(_radio+" is playing \'"+_title+"\' by \'"+_artist+"\'.");',
				'time': 'var _now = new Date();sendMessage(_now.toString());',
				'last': 'sendMessage("UPPER: \'"+lastMessage.name.toUpperCase()+"\' lower: \'"+lastMessage.name.toLowerCase()+"\'");',
				'love': 'switch(args.length){'+
					'case 1:'+
						'sendMessage(msg.name+" ? "+args[0]);break;'+
					'case 2:'+
						'sendMessage(args[0]+" ? "+args[1]);break;'+
				'};',
				'credits': 'sendMessage("Thanks to Angi, FaridBang and Rooz.");',
				'info': 'sendMessage("Boot written as ECMS Java Userscrlpt by Bluscream with ?");',
				'calc': 'if(args.length == 3){var result = 0;switch(args[1]){'+
					'case "+": result = Number(args[0]) + Number(args[2]);break;'+
					'case "-": result = Number(args[0]) - Number(args[2]);break;'+
					'case "*": result = args[0] * args[2];break;'+
					'case "&#x2F;": args[1] = "/";result = args[0] / args[2];break;'+
				'};'+
				'sayMessage(msg.name, args[0]+" "+args[1]+" "+args[2]+" = "+result)};',
				'uinfo': 'var _user = args.toString().replaceAll(","," ");'+
					'var _name = "unknown";var _id = "unknown";'+
					'var _users = ilr.users;'+
					'var _length = _users.length;'+
					'for (var i = 0; i < _length; i++) {'+
						'if(_users[i] == _user){'+
							'sendMessage("ID: "+i+" Name: \'"+_users[i]+"\' lower: \'"+_users[i].toLowerCase()+"\' UPPER: \'"+_users[i].toUpperCase()+"\'");break;'+
						'}'+
					'};',
				'ulist': 'sendMessage(ilr.users.toString());',
				'ulength': 'sendMessage("User Database contains "+ilr.users.length.toString()+" users.");',
				'angi': 'sendMessage("♥ Angi isch kuhl oke ♥");',
				'jessi': 'sendMessage("♥ Jessi is love, Jessi is life! ♥");',
				'contact': 'sendMessage("Steam/Github/Snapchat/KIK: Bluscream | Skype: bluscream[@]outlook[PUNKT]de | Insta: @realbluscream");',
			},
			admincommands: {
				'uid': 'console.info(ilr.getUserByID(Number(args[0])));',
				'mods': 'sendMessage("Moderators: "+ilr.operators.toString())',
				'tboot': 'if(disabled == "true"){'+
					'disabled = false;localStorage.setItem("disabled", "false");sendMessage("Boot enabled by "+msg.name);'+
				'}else{'+
					'disabled = true;localStorage.setItem("disabled", "true");sendMessage("Boot disabled by "+msg.name);'+
				'}',
				'welcomes': 'if(welcome == "true"){'+
					'welcome = false;localStorage.setItem("welcome", "false");sendMessage("Welcomes disabled by "+msg.name);'+
				'}else{'+
					'welcome = true;localStorage.setItem("welcome", "true");sendMessage("Welcomes enabled by "+msg.name);'+
				'}',
				'byes': 'if(bye == "true"){'+
					'bye = false;localStorage.setItem("bye", "false");sendMessage("Byes disabled by "+msg.name);'+
				'}else{'+
					'bye = true;localStorage.setItem("bye", "true");sendMessage("Byes enabled by "+msg.name);'+
				'}',
				'random': 'if(random == "true"){'+
					'random = false;localStorage.setItem("random", "false");sendMessage("Random mode disabled by "+msg.name);'+
				'}else{'+
					'random = true;localStorage.setItem("random", "true");sendMessage("Random mode enabled by "+msg.name);'+
				'}',
				'blist': 'sendMessage("Blacklisted Users: "+ilr.blacklist.toString());',
				'blacklist': 'ilr.blacklist.push(args.toString().replaceAll(","," "));saveSettings("blacklist", ilr.blacklist);sendMessage(args.toString().replaceAll(","," ")+" was blacklisted by "+msg.name+".");',
				'unblacklist': 'ilr.blacklist.splice(ilr.blacklist.indexOf(args.toString().replaceAll(","," ")), 1);saveSettings("blacklist", ilr.blacklist);ilr.blacklist.push(msg.name);sendMessage(args.toString().replaceAll(","," ")+" was un-blacklisted by "+msg.name+".");',
				'repeat': 'if(args.length > 1){var _delay = Number(args[0])*1000;var _args = args; _args.shift();interval = setInterval(function(){sendMessage(_args.toString().replaceAll(","," "));}, _delay)};',
				'srepeat': 'clearInterval(interval);',
				//'eval': 'eval(args.toString().replaceAll(","," "));sendMessage(" Executed: "+args.toString().replaceAll(","," "));',
				'alert': 'sendMessage("@"+ilr.operators.toString()+": "+args.toString().replaceAll(","," "));alert(msg.name+": "+args.toString().replaceAll(","," "));',
				'say': 'sendMessage(msg.name+" says \\""+args.toString().replaceAll(","," ")+"\\".");',
				'relog': 'sendMessage("Boot is reloading...");window.location.reload();',
				'ban': 'sendMessage(args.toString().replaceAll(","," ")+" was banned by "+msg.name+".");',
				'mute': 'sendMessage(args.toString().replaceAll(","," ")+" was muted by "+msg.name+".");',
				'panic': ''+
					'disabled = true;'+
					'welcome = false;'+
					'bye = false;'+
					'sendMessage("Everything disabled by "+msg.name)',
			},
			getUserByName: function(name){
				$.each(ilr.users, function(i,e){
					if(e == name){return {'id': i, 'name': e, 'lower': e.toLowerCase(), 'upper': e.toUpperCase()};}
				}
			);},
			getUserByID: function(id){
				$.each(ilr.users, function(i,e){
					if(i == id){return {'id': i, 'name': e, 'lower': e.toLowerCase(), 'upper': e.toUpperCase()};}
				}
			);}
		};
		if(random == "true"){
			ilr.name = randomString(10);
		}
		ilr.welcome = 'logged in. Use '+ilr.prefix+'coms to get a list of C0mmands.';
	//	'String'.capitalizeFirstLetter();
		String.prototype.capitalizeFirstLetter = function() {
			return this.charAt(0).toUpperCase() + this.slice(1);
		};
	//	'String'.toTitleCase();
		String.prototype.toTitleCase = function() {
		return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
		};
	//	'String'.contains(str);
		String.prototype.contains = function(str) {
			return this.indexOf(str) != -1;
		};
	//	'String'.replaceAll(search, replacement);
		String.prototype.replaceAll = function(search, replacement) {
			return this.split(search).join(replacement);
		};
	//	isEmpty(s);
		var isEmpty = function(s) {
			if( !s || (typeof s === "undefined") || (typeof s === null) || (s == "null") || (s == "undefined") || (s == "empty") || (s == "NaN") || (s == "-1")){
				return true;
			}else{
				return false;
			}
		};
	//	loadSettings(name, default, base64);
		var loadSettings = function(name, settings, base64){
			if(base64){
				if (isEmpty(localStorage.getItem(name))){ localStorage.setItem(name, btoa(JSON.stringify(settings))); }
				name = window.localStorage[name];return JSON.parse(atob(name));
			}else{
				if (isEmpty(localStorage.getItem(name))){ localStorage.setItem(name, JSON.stringify(settings)); }
				return JSON.parse(localStorage.getItem(name));
			}
		};
	//	saveSettings(name, settings, base64);
		var saveSettings = function(name, settings, base64){
			if(base64){
				localStorage.setItem(name, btoa(JSON.stringify(settings)));
			}else{
				localStorage.setItem(name,JSON.stringify(settings));
			}
		};
		ilr.blacklist = loadSettings("blacklist", ilr.blacklist);
		var lastMessage = "";
		setTimeout(function(){
			$('#playstop').click();
			localStorage.removeItem('ilr_uid');
			ilr3.log = function(){};
			$('#ilr_shoutbox .chat .msg').unbind('keyup').bind('keyup', function(e) {
				if (e.keyCode === 13) {
					sendMessage($('#ilr_shoutbox .chat .msg').val());
					$('#ilr_shoutbox .chat .msg').val('');
				}
			});
			ilr3.shoutbox.get = function(msg) {
				console.log(msg);
				msg.name = decodeURI(msg.name);
				msg.text = decodeURI(msg.text);
				var text = msg.text;
				var _text = text.toLowerCase();
				var _users = ilr.users;
				if(msg.name == ilr.name){
					if(typeof msg.verified === 'undefined'){
						msg.verified = true;
					}
				}
				if (('undefined' !== typeof msg.verified)) {
					$('#ilr_shoutbox .chat .textarea').append('<div><span class="name">' + msg.name + ((msg.verified === true) ? '<span class="verified"></span>' : '') + '</span>' + msg.text + '</div>');
				} else {
					$('#ilr_shoutbox .chat .textarea').append('<div><span class="name">' + msg.name + '</span>' + msg.text + '</div>');
				}
				while ($('#ilr_shoutbox .chat .textarea div').length > 50) {
					$('#ilr_shoutbox .chat .textarea div:first').remove();
				}
				if ($('#ilr_shoutbox .chat .textarea').length > 0) {
					$('#ilr_shoutbox .chat .textarea').scrollTop($('#ilr_shoutbox .chat .textarea')[0].scrollHeight);
				}
				if(msg.name != ilr.name){
					//console.info($.inArray( _users, msg.name ));
					if($.inArray( msg.name, _users ) == -1){
						if(msg.name.contains('I')){
							$.each(ilr.users, function(i,e){
								if(e == msg.name.replaceAll('I', 'l') && msg.name != e){
									sendMessage('\''+msg.name.toLowerCase()+'\'s name contains a uppercase "i", he\'s probably faking '+msg.name.replaceAll('I', 'l')+'.');return;
								}
							});
						}else{
							var _length = ilr.welcomes.length;
							for (var i = 0; i < _length; i++) {
								if(_text.contains(ilr.welcomes[i])){
									if(welcome == "true"){sendMessage('Hey '+msg.name+' ♥');}									
								}
							}
					}
						_users.push(msg.name);
					}
					$.each( ilr.byes, function(i,e){
						if(_text.contains(e)){
							if(bye == "true"){sendMessage('Bye '+msg.name+' ♥');}
						}
					});
				}
				if(_text.startsWith(ilr.prefix)){
					if($.inArray(msg.name, ilr.blacklist) != -1){return;}
					if(msg.name.toLowerCase().contains(ilr.name.toLowerCase())){return;}
					var _txt = text.split(ilr.prefix)[1];
					var args = _txt.split(' ') || '';
					var cmd = args.shift().toLowerCase();
					if (disabled == "false"){
						for (var key in ilr.commands) {
							if (!ilr.commands.hasOwnProperty(key)) continue;
							var command = key.toLowerCase();
							var action = ilr.commands[key];
							if(cmd == command){
								console.info('Command \''+cmd+'\' with arguments \''+args+'\' was issued by '+msg.name+'.');
								try{
									if(msg.name == ilr.name){
										setTimeout(function(){eval(action);}, 1000);break;
									}else{
										eval(action);break;
									}
								}catch(e){
									sayMessage(msg.name, '\''+command+'\' '+e);
									console.error('Bot is unable to process command '+command+'\n\n.Error Message: '+e+'\n\nAction:\n\n'+action);break;
								}
							}
						}
					}
					for (var key in ilr.admincommands) {
						if($.inArray(msg.name, ilr.blacklist) != -1){return;}
						if(msg.name.toLowerCase().contains(ilr.name.toLowerCase())){return;}
						if (!ilr.admincommands.hasOwnProperty(key)) continue;
						var command = key.toLowerCase();
						var action = ilr.admincommands[key];
						if(cmd == command){
							console.info('AdminCommand \''+cmd+'\' with arguments \''+args+'\' was issued by '+msg.name+'.');
							if($.inArray( msg.name, ilr.operators ) != -1){
								try{
									if(msg.name == ilr.name){
										setTimeout(function(){eval(action);}, 1000);break;
									}else{
										eval(action);break;
									}
								}catch(e){
									sayMessage(msg.name, '\''+command+'\' '+e);
									console.error('Bot is unable to process command '+command+'\n\n.Error Message: '+e+'\n\nAction:\n\n'+action);break;
								}
							}else{
								if(disabled == "false"){sayMessage(msg.name, 'You don\'t have the required perms to use '+command+'.');break;}
							}
						}
					}
					if(cmd == "eval"){
						if($.inArray( msg.name, ilr.operators ) != -1){
							var _eval = msg.text;
							_eval = _eval.replace('!eval ', '');
							_eval = _eval.replace('!EVAL ', '');
							_eval = _eval.replace('/', '\\');
							_eval = _eval.replaceAll('&quot;', '"');
							try{
								var _e = eval('(' + _eval + ')');sendMessage(_e);
							}catch(e){
								sayMessage(msg.name, '\''+cmd+'\' '+e+' in '+_eval);
							}
						}else{
							if(disabled == "false"){sayMessage(msg.name, 'You don\'t have the required permissions to use '+cmd+'.');}
						}
					}
				}
				lastMessage = msg;
			};
			$('.login').find('input[type="text"]').val(ilr.name);
			$('.usr_submit').click();
			var _t = false;
			$('.message').each( function(i,e){
				if(e.text() == ilr.welcome)
					var _t = true;return;
			});
			if(!_t){sendMessage(ilr.welcome);}
			ilr.users.push(ilr.name);
			for (var key in ilr.commands) {
				if (!ilr.commands.hasOwnProperty(key)) continue;
				console.info('Loaded command: '+key+' with action: '+ilr.commands[key]);
			}
			for (var key in ilr.admincommands) {
				if (!ilr.admincommands.hasOwnProperty(key)) continue;
				console.info('Loaded command: '+key+' with action: '+ilr.admincommands[key]);
			}
			//$('*').not('html,body,head,head *,.channel-headline.big,.single-outer.channelbgcolor,script,.flex-outer-allsize.fixed-outer-single-height,.flex-outer-allsize.fixed-outer-single-height *').remove();
			$('#bg,#menue,#channelpreview,#player,p[class="channel-headline"],.channelcover,#channeltoolbox,.social,div[href*="voting"],div[href*="voicemail"],.white'+
			 '.single-outer.pointer,div[href="the-battle/"],div[href="rooz-radio-ueberdimensionales-radio-mit-rooz-lee/"],.contactbox,#footer').remove();
			$('.playlist').parent().remove();
			$('.big:contains(Playlist)').remove();
			$('.single-outer').hide();
			$('.flex-outer-allsize.fixed-outer-single-height').css('height', '500px');
			$('#ilr_shoutbox .chat .hidden-scrollbar,#ilr_shoutbox .textarea').css('height', '100%');
			$('.channelbgcolor').css('background-color', 'black').find('*').css('color', 'white');
			$('input').css('color', 'black');
			//console.clear();
		},3000);
	})();
}

// @originalURL	https://gist.github.com/d0f3bf4f4e380e528cb60f51aafc28c7#file-iloveradiobot-user-js