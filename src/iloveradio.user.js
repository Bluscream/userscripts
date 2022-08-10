// ==UserScript==
// @name         ILoveRadio
// @namespace    Bluscream
// @version      1.0
// @description  Makes the chat on ILoveradio.de less cancer ;P
// @author       Bluscream
// @downloadurl  https://gist.githubusercontent.com/Bluscream/d0f3bf4f4e380e528cb60f51aafc28c7/raw/iloveradio.user.js
// @updateurl    https://gist.githubusercontent.com/Bluscream/d0f3bf4f4e380e528cb60f51aafc28c7/raw/iloveradio.user.js
// @match        http://www.iloveradio.de/*
// @exclude      http://www.iloveradio.de/iloveradio/?popup
// @grant        none
// ==/UserScript==
(function() {
    'use strict';
    var interval;
    if(window.location.href == "http://www.iloveradio.de/iloveradio/?popup"){return;};
        $('#ilr_shoutbox .input').attr('id', 'login');
        $('<style type="text/css">'+
          '.bot{display: inline-block !important;'+
          'background: url("//emojipedia-us.s3.amazonaws.com/cache/11/31/113120e019e50e467e21ae08660fc41f.png") no-repeat 0 0px;'+
          'background-size: contain;'+
          'width: 19px;'+
          'height: 19px;}'+
          '.own{text-decoration: underline;}'+
          '.channelprev{display:none};'+
          '</style>').appendTo("head");
        var sendMessage = function(msg){ ilr3.shoutbox.send(msg);};
        var sayMessage = function(name, msg){ sendMessage(name+': '+msg);};
        var ilr = {
            name: 'Kevin',
            mentions: ['Blu', 'Bluscream'],
            bots: ['James'],
            verified: ['Angi', 'Janine', 'Lost', 'Jessi'],
            blocked: [],
            replace: {
                '[PUNKT]': '.',
                '[DOT]': '.',
                '[SCHRÄGSTRICH]': '/',
                '[SLASH]': '/',
                '[ÄT]': '@'
            },
        };
        ilr.welcome = 'logged in.';
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
        //	'String'.isURL();
        String.prototype.isURL = function() {
            var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
                                     '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
                                     '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
                                     '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
                                     '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
                                     '(\\#[-a-z\\d_]*)?$','i'); // fragment locater
            if(!pattern.test(this)) {
                return false;
            } else {
                return true;
            }
        };
        Array.prototype.remove = function() {
			var what, a = arguments, L = a.length, ax;
			while (L && this.length) {
				what = a[--L];
				while ((ax = this.indexOf(what)) !== -1) {
	           		this.splice(ax, 1);
	        	}
	    	}
	    	return this;
		};
        var isScrolledToBottom = function(el) {
            var $el = $(el);
            return el.scrollHeight - $el.scrollTop() - $el.outerHeight() < 1;
        };
        jQuery.fn.swapWith = function(to) {
            return this.each(function() {
                var copy_to = $(to).clone(true);
                $(to).replaceWith(this);
                $(this).replaceWith(copy_to);
            });
        };
        var lastMessage = "";
        setTimeout(function(){
            //$('#playstop').click();
            localStorage.removeItem('ilr_uid');
            ilr3.log = function(){};
            var uid = 0;
            ilr3.shoutbox.get = function(msg) {
            	uid++;
                msg.name = decodeURI(msg.name);
                msg.text = decodeURI(msg.text);
                var text = msg.text;
                var _text = text.toLowerCase();
                var _flags = '<div uid="'+uid+'">';var _msg = '<span class="message"';
                if(msg.name == ilr.name){
                    _flags += '<span class="name own">'+msg.name;
                }else{
                    _flags += '<span class="name">'+msg.name;
                }
                if (((typeof msg.verified !== 'undefined') && (msg.verified === true)) || ($.inArray(msg.name, ilr.verified) != -1)) {
                    _flags += ' <span class="verified"></span>';
                }
                if($.inArray(msg.name, ilr.bots) != -1){
                    _flags += ' <span class="bot"></span>';
                }
                if(_text.contains(ilr.name.toLowerCase())){
                    _msg += ' style="border-bottom: 1px dotted #000;">';
                }else{
                    _msg += '>';
                }
                for(var key in ilr.replace){
                    if (!ilr.replace.hasOwnProperty(key)) continue;
                    text = text.replaceAll(key, ilr.replace[key]);
                }
                var __text = text.split(' ');
                var _length = __text.length;
                for (var i = 0; i < _length; i++) {
                    var ___text = __text[i];
                    if(__text[i].isURL()){
                        ___text = decodeURI(___text);
                        if(!__text[i].contains('http://') && (!__text[i].contains('https://'))){
                            text = text.replaceAll(__text[i], '<a target="_blank" href="//'+__text[i]+'" style="text-decoration: underline;">'+__text[i]+'</a>');
                        }else{
                            text = text.replaceAll(__text[i], '<a href="'+__text[i]+'" style="text-decoration: underline;">'+__text[i]+'</a>');
                        }
                    }
                }
                var _ignore = false;
                var _length = ilr.blocked.length;
                for (var i = 0; i < _length; i++) {
                	if(msg.name == ilr.blocked[i]){
                		_ignore = true;
                	}
                }
                if(!_ignore){
                	$('#ilr_shoutbox .chat .textarea').append(_flags + '</span>'+ _msg + text + '</span></div>');
                	if(msg.name != ilr.name){
                		$('div[uid="'+uid+'"]').prepend('<span class="block">[B]</span> ')
	                	$('div[uid="'+uid+'"]').find('.block').click(function(){
		                	if($.inArray( msg.name, ilr.blocked ) == -1){
		                		var r = confirm("Block "+msg.name+"?");
								if (r == true) {
								    ilr.blocked.push(msg.name);
								}
		                	}else{
		                		var r = confirm("Unblock "+msg.name+"?");
								if (r == true) {
		                		ilr.blocked.remove(msg.name);
								}
		                	};
	                	});
                	};
                };
                _ignore = false;
                // while ($('#ilr_shoutbox .chat .textarea div').length > 50) {
                // $('#ilr_shoutbox .chat .textarea div:first').remove();
                // }
                var e = $('#ilr_shoutbox .chat .textarea');
                if ($(e).length > 0) {
                    if($(e).is(':hover')){
                        $(e).parent().css('background-color', $(e).parent().css('background-color').replace('rgb', 'rgba').replace(')', ', .9'));
                    }else{
                        $(e).parent().css('background-color', $(e).parent().css('background-color').replace('rgb', 'rgba').replace(')', ', 1)'));
                        $('#ilr_shoutbox .chat .textarea').scrollTop($('#ilr_shoutbox .chat .textarea')[0].scrollHeight);
                    }
                }
                var _users = ilr.users;
            };
            $('.login').find('input[type="text"]').val(ilr.name);
            $('.usr_submit').click();
            $('.flex-outer-allsize.fixed-outer-single-height,#login').css('height', '500px');
            $('#ilr_shoutbox .chat .hidden-scrollbar,#ilr_shoutbox .textarea').css('height', '100%');
            $('#ilr_shoutbox .textarea').css('width', '101%');
            var styles='*,p,div{user-select:text !important;-moz-user-select:text !important;-webkit-user-select:text !important;}';
            $('head').append($('<style />').html(styles));
            var allowNormal=function(){ return true; };
            $('*[onselectstart], *[ondragstart], *[oncontextmenu], #songLyricsDiv').unbind('contextmenu').unbind('selectstart').unbind('dragstart').unbind('mousedown').unbind('mouseup').unbind('click').attr('onselectstart',allowNormal).attr('oncontextmenu',allowNormal).attr('ondragstart',allowNormal);
            $('input.msg').replaceWith($('<textarea type="text" class="msg" lines="5" maxlength="140" placeholder="Deine Message" style="height:400px"></textarea>'));
            var _t = false;
            $('.message').each( function(i,e){
                if(e.text() == ilr.welcome)
                    var _t = true;return;
            });
            //if(!_t){ilr3.shoutbox.send(ilr.welcome);}
            $('#ilr_shoutbox>.chat .msg').unbind('keyup').bind('keyup', function(e) {
                if (e.keyCode === 13) {
                    var _val = $('#ilr_shoutbox .chat .msg').val();
                    for(var key in ilr.replace){
                        if (!ilr.replace.hasOwnProperty(key)) continue;
                        _val = _val.replaceAll(ilr.replace[key], key);
                    }
                    console.log(_val);
                    ilr3.shoutbox.send(_val);
                    //$('#ilr_shoutbox .chat .msg').val('');
                }
            });
        },3000);
})();

// @originalURL	https://gist.github.com/d0f3bf4f4e380e528cb60f51aafc28c7#file-iloveradio-user-js