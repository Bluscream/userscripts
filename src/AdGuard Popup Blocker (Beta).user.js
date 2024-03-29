// ==UserScript==
// @name AdGuard Popup Blocker (Beta)
// @name:ar مانع النوافذ المنبثقة AdGuard (Beta)
// @name:be Блакавальнік усплывальнай рэкламы ад AdGuard (Beta)
// @name:cs AdGuard blokátor vyskakovacích oken (Beta)
// @name:da AdGuard Popup Blocker (Beta)
// @name:de AdGuard Pop-up-Blocker (Beta)
// @name:es AdGuard Popup Blocker (Beta)
// @name:fa مسدودساز پاپ-آپ AdGuard (Beta)
// @name:fi AdGuardin Ponnahdusikkunan estäjä (Beta)
// @name:fr Bloqueur de fenêtres pop-up de AdGuard (Beta)
// @name:id Pemblokir Popup AdGuard (Beta)
// @name:it Blocco Pop-Up di AdGuard (Beta)
// @name:ja AdGuard ポップアップブロッカー (Beta)
// @name:ko AdGuard 팝업 차단기 (Beta)
// @name:lt AdGuard iššokančiųjų langų blokatorius (Beta)
// @name:ms AdGuard Penyekat Pop Timbul (Beta)
// @name:no AdGuards popup-blokkerer (Beta)
// @name:pl Bloker wyskakujących okienek przez AdGuard (Beta)
// @name:pt AdGuard Bloqueador de Pop-ups (Beta)
// @name:pt-PT Bloqueador de Popup AdGuard (Beta)
// @name:ru Блокировщик всплывающей рекламы от AdGuard (Beta)
// @name:sl AdGuard Zaviralec pojavnih oken (Beta)
// @name:tr AdGuard Popup Blocker eklentisi (Beta)
// @name:uk Блокувальник спливаючої реклами AdGuard (Beta)
// @name:vi AdGuard Popup Blocker (Beta)
// @name:zh AdGuard 弹窗拦截器 (Beta)
// @name:zh-TW AdGuard 彈出式視窗封鎖器 (Beta)
// @namespace adguard
// @description Blocks popup ads on web pages
// @description:ar لحظر الإعلانات المنبثقة على صفحات الويب
// @description:be Блакуе ўсплывальную рэкламу на старонках
// @description:cs Blokuje vyskakovací reklamy na webových stránkách
// @description:da Blokerer pop-up reklamer på websider
// @description:de Blockiert Anzeige-Pop-ups auf Webseiten
// @description:es Bloquea anuncios emergentes en sitios web
// @description:fa مسدودسازی تبلیغات پاپ آپ در صفحات وب.
// @description:fi Estää ponnahdusikkunamainokset verkkosivustoilla
// @description:fr Bloque les fenêtres pop-up avec publicités intrusives sur les pages web
// @description:id Blokir iklan popup di halaman web
// @description:it Blocca gli annunci di popup nelle pagine internet
// @description:ja Webページでポップアップ広告をブロックします。
// @description:ko 웹 페이지에서 팝업 광고를 차단
// @description:lt Blokuoja iššokančius skelbimus tinklalapiuose
// @description:ms Sekat pop timbul pada laman web
// @description:no Blokker popup-annonser på nettsider
// @description:pl Blokuje wyskakujące okienka na stronach internetowych
// @description:pt Bloqueia anúncios pop-ups dentro dos sites
// @description:pt-PT Bloqueia anúncios popup em páginas da web.
// @description:ru Блокирует всплывающую рекламу на страницах
// @description:sl Blokira pojavne oglase na spletnih straneh
// @description:tr Web sayfalarında açılan pencere reklamları engeller
// @description:uk Блокує спливаючу рекламу на веб-сторінках
// @description:vi Chặn quảng cáo bật lên trên các trang web
// @description:zh 拦截网页弹窗广告
// @description:zh-TW 封鎖於網頁上之彈出式視窗廣告
// @version 2.5.71
// @license LGPL-3.0; https://github.com/AdguardTeam/PopupBlocker/blob/master/LICENSE
// @downloadURL https://userscripts.adtidy.org/beta/popup-blocker/2.5/popupblocker.user.js
// @updateURL https://userscripts.adtidy.org/beta/popup-blocker/2.5/popupblocker.meta.js
// @supportURL https://github.com/AdguardTeam/PopupBlocker/issues
// @homepageURL https://popupblocker.adguard.com/
// @match http://*/*
// @match https://*/*
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_deleteValue
// @grant GM_listValues
// @grant GM_getResourceURL
// @grant unsafeWindow
// @icon https://userscripts.adtidy.org/beta/popup-blocker/2.5/assets/128.png
// @resource ./assets/fonts/bold/OpenSans-Bold.woff https://userscripts.adtidy.org/beta/popup-blocker/2.5/assets/fonts/bold/OpenSans-Bold.woff
// @resource ./assets/fonts/bold/OpenSans-Bold.woff2 https://userscripts.adtidy.org/beta/popup-blocker/2.5/assets/fonts/bold/OpenSans-Bold.woff2
// @resource ./assets/fonts/regular/OpenSans-Regular.woff https://userscripts.adtidy.org/beta/popup-blocker/2.5/assets/fonts/regular/OpenSans-Regular.woff
// @resource ./assets/fonts/regular/OpenSans-Regular.woff2 https://userscripts.adtidy.org/beta/popup-blocker/2.5/assets/fonts/regular/OpenSans-Regular.woff2
// @resource ./assets/fonts/semibold/OpenSans-Semibold.woff https://userscripts.adtidy.org/beta/popup-blocker/2.5/assets/fonts/semibold/OpenSans-Semibold.woff
// @resource ./assets/fonts/semibold/OpenSans-Semibold.woff2 https://userscripts.adtidy.org/beta/popup-blocker/2.5/assets/fonts/semibold/OpenSans-Semibold.woff2
// @run-at document-start
// @exclude https://www.linkedin.com/*
// @exclude https://*.facebook.com/*
// @exclude https://*.google.com/*
// @exclude https://*.google.ad/*
// @exclude https://*.google.ae/*
// @exclude https://*.google.com.af/*
// @exclude https://*.google.com.ag/*
// @exclude https://*.google.com.ai/*
// @exclude https://*.google.al/*
// @exclude https://*.google.am/*
// @exclude https://*.google.co.ao/*
// @exclude https://*.google.com.ar/*
// @exclude https://*.google.as/*
// @exclude https://*.google.at/*
// @exclude https://*.google.com.au/*
// @exclude https://*.google.az/*
// @exclude https://*.google.ba/*
// @exclude https://*.google.com.bd/*
// @exclude https://*.google.be/*
// @exclude https://*.google.bf/*
// @exclude https://*.google.bg/*
// @exclude https://*.google.com.bh/*
// @exclude https://*.google.bi/*
// @exclude https://*.google.bj/*
// @exclude https://*.google.com.bn/*
// @exclude https://*.google.com.bo/*
// @exclude https://*.google.com.br/*
// @exclude https://*.google.bs/*
// @exclude https://*.google.bt/*
// @exclude https://*.google.co.bw/*
// @exclude https://*.google.by/*
// @exclude https://*.google.com.bz/*
// @exclude https://*.google.ca/*
// @exclude https://*.google.cd/*
// @exclude https://*.google.cf/*
// @exclude https://*.google.cg/*
// @exclude https://*.google.ch/*
// @exclude https://*.google.ci/*
// @exclude https://*.google.co.ck/*
// @exclude https://*.google.cl/*
// @exclude https://*.google.cm/*
// @exclude https://*.google.cn/*
// @exclude https://*.google.com.co/*
// @exclude https://*.google.co.cr/*
// @exclude https://*.google.com.cu/*
// @exclude https://*.google.cv/*
// @exclude https://*.google.com.cy/*
// @exclude https://*.google.cz/*
// @exclude https://*.google.de/*
// @exclude https://*.google.dj/*
// @exclude https://*.google.dk/*
// @exclude https://*.google.dm/*
// @exclude https://*.google.com.do/*
// @exclude https://*.google.dz/*
// @exclude https://*.google.com.ec/*
// @exclude https://*.google.ee/*
// @exclude https://*.google.com.eg/*
// @exclude https://*.google.es/*
// @exclude https://*.google.com.et/*
// @exclude https://*.google.fi/*
// @exclude https://*.google.com.fj/*
// @exclude https://*.google.fm/*
// @exclude https://*.google.fr/*
// @exclude https://*.google.ga/*
// @exclude https://*.google.ge/*
// @exclude https://*.google.gg/*
// @exclude https://*.google.com.gh/*
// @exclude https://*.google.com.gi/*
// @exclude https://*.google.gl/*
// @exclude https://*.google.gm/*
// @exclude https://*.google.gp/*
// @exclude https://*.google.gr/*
// @exclude https://*.google.com.gt/*
// @exclude https://*.google.gy/*
// @exclude https://*.google.com.hk/*
// @exclude https://*.google.hn/*
// @exclude https://*.google.hr/*
// @exclude https://*.google.ht/*
// @exclude https://*.google.hu/*
// @exclude https://*.google.co.id/*
// @exclude https://*.google.ie/*
// @exclude https://*.google.co.il/*
// @exclude https://*.google.im/*
// @exclude https://*.google.co.in/*
// @exclude https://*.google.iq/*
// @exclude https://*.google.is/*
// @exclude https://*.google.it/*
// @exclude https://*.google.je/*
// @exclude https://*.google.com.jm/*
// @exclude https://*.google.jo/*
// @exclude https://*.google.co.jp/*
// @exclude https://*.google.co.ke/*
// @exclude https://*.google.com.kh/*
// @exclude https://*.google.ki/*
// @exclude https://*.google.kg/*
// @exclude https://*.google.co.kr/*
// @exclude https://*.google.com.kw/*
// @exclude https://*.google.kz/*
// @exclude https://*.google.la/*
// @exclude https://*.google.com.lb/*
// @exclude https://*.google.li/*
// @exclude https://*.google.lk/*
// @exclude https://*.google.co.ls/*
// @exclude https://*.google.lt/*
// @exclude https://*.google.lu/*
// @exclude https://*.google.lv/*
// @exclude https://*.google.com.ly/*
// @exclude https://*.google.co.ma/*
// @exclude https://*.google.md/*
// @exclude https://*.google.me/*
// @exclude https://*.google.mg/*
// @exclude https://*.google.mk/*
// @exclude https://*.google.ml/*
// @exclude https://*.google.com.mm/*
// @exclude https://*.google.mn/*
// @exclude https://*.google.ms/*
// @exclude https://*.google.com.mt/*
// @exclude https://*.google.mu/*
// @exclude https://*.google.mv/*
// @exclude https://*.google.mw/*
// @exclude https://*.google.com.mx/*
// @exclude https://*.google.com.my/*
// @exclude https://*.google.co.mz/*
// @exclude https://*.google.com.na/*
// @exclude https://*.google.com.nf/*
// @exclude https://*.google.com.ng/*
// @exclude https://*.google.com.ni/*
// @exclude https://*.google.ne/*
// @exclude https://*.google.nl/*
// @exclude https://*.google.no/*
// @exclude https://*.google.com.np/*
// @exclude https://*.google.nr/*
// @exclude https://*.google.nu/*
// @exclude https://*.google.co.nz/*
// @exclude https://*.google.com.om/*
// @exclude https://*.google.com.pa/*
// @exclude https://*.google.com.pe/*
// @exclude https://*.google.com.pg/*
// @exclude https://*.google.com.ph/*
// @exclude https://*.google.com.pk/*
// @exclude https://*.google.pl/*
// @exclude https://*.google.pn/*
// @exclude https://*.google.com.pr/*
// @exclude https://*.google.ps/*
// @exclude https://*.google.pt/*
// @exclude https://*.google.com.py/*
// @exclude https://*.google.com.qa/*
// @exclude https://*.google.ro/*
// @exclude https://*.google.ru/*
// @exclude https://*.google.rw/*
// @exclude https://*.google.com.sa/*
// @exclude https://*.google.com.sb/*
// @exclude https://*.google.sc/*
// @exclude https://*.google.se/*
// @exclude https://*.google.com.sg/*
// @exclude https://*.google.sh/*
// @exclude https://*.google.si/*
// @exclude https://*.google.sk/*
// @exclude https://*.google.com.sl/*
// @exclude https://*.google.sn/*
// @exclude https://*.google.so/*
// @exclude https://*.google.sm/*
// @exclude https://*.google.sr/*
// @exclude https://*.google.st/*
// @exclude https://*.google.com.sv/*
// @exclude https://*.google.td/*
// @exclude https://*.google.tg/*
// @exclude https://*.google.co.th/*
// @exclude https://*.google.com.tj/*
// @exclude https://*.google.tk/*
// @exclude https://*.google.tl/*
// @exclude https://*.google.tm/*
// @exclude https://*.google.tn/*
// @exclude https://*.google.to/*
// @exclude https://*.google.com.tr/*
// @exclude https://*.google.tt/*
// @exclude https://*.google.com.tw/*
// @exclude https://*.google.co.tz/*
// @exclude https://*.google.com.ua/*
// @exclude https://*.google.co.ug/*
// @exclude https://*.google.co.uk/*
// @exclude https://*.google.com.uy/*
// @exclude https://*.google.co.uz/*
// @exclude https://*.google.com.vc/*
// @exclude https://*.google.co.ve/*
// @exclude https://*.google.vg/*
// @exclude https://*.google.co.vi/*
// @exclude https://*.google.com.vn/*
// @exclude https://*.google.vu/*
// @exclude https://*.google.ws/*
// @exclude https://*.google.rs/*
// @exclude https://*.google.co.za/*
// @exclude https://*.google.co.zm/*
// @exclude https://*.google.co.zw/*
// @exclude https://*.google.cat/*
// @exclude https://*.youtube.com/*
// @exclude *://disqus.com/embed/*
// @exclude https://vk.com/*
// @exclude https://*.vk.com/*
// @exclude https://vimeo.com/*
// @exclude https://*.vimeo.com/*
// @exclude *://*.coub.com/*
// @exclude *://coub.com/*
// @exclude *://*.googlesyndication.com/*
// @exclude *://*.naver.com/*
// @exclude https://gstatic.com/*
// @exclude https://*.gstatic.com/*
// @exclude https://yandex.ru/*
// @exclude https://*.yandex.ru/*
// @exclude https://yandex.ua/*
// @exclude https://*.yandex.ua/*
// @exclude https://yandex.by/*
// @exclude https://*.yandex.by/*
// @exclude https://yandex.com/*
// @exclude https://*.yandex.com/*
// @exclude https://yandex.com.tr/*
// @exclude https://*.yandex.com.tr/*
// @exclude https://yandex.kz/*
// @exclude https://*.yandex.kz/*
// @exclude https://yandex.fr/*
// @exclude https://*.yandex.fr/*
// @exclude https://*.twitch.tv/*
// @exclude https://tinder.com/*
// @exclude *://*.yahoo.com/*
// @exclude *://chatovod.ru/*
// @exclude *://*.chatovod.ru/*
// @exclude *://vc.ru/*
// @exclude *://tjournal.ru/*
// @exclude *://amanice.ru/*
// @exclude *://ka-union.ru/*
// @exclude *://gameforge.com/*
// @exclude *://*.gameforge.com/*
// @exclude *://*.ssgdfm.com/*
// @exclude *://*.brainpop.com/*
// @exclude *://*.taobao.com/*
// @exclude *://*.ksl.com/*
// @exclude *://*.t-online.de/*
// @exclude *://boards.4channel.org/*
// @exclude *://*.washingtonpost.com/*
// @exclude *://*.kakao.com/*
// @exclude *://*.discounttire.com/*
// @exclude *://mail.ukr.net/*
// @exclude *://*.mail.ukr.net/*
// @exclude *://*.sahadan.com/*
// @exclude *://*.groupon.*/*
// @exclude *://*.amoma.com/*
// @exclude *://*.jccsmart.com/*
// @exclude *://wp.pl/*
// @exclude *://*.wp.pl/*
// @exclude *://money.pl/*
// @exclude *://*.money.pl/*
// @exclude *://o2.pl/*
// @exclude *://*.o2.pl/*
// @exclude *://pudelek.pl/*
// @exclude *://*.pudelek.pl/*
// @exclude *://komorkomania.pl/*
// @exclude *://*.komorkomania.pl/*
// @exclude *://gadzetomania.pl/*
// @exclude *://*.gadzetomania.pl/*
// @exclude *://fotoblogia.pl/*
// @exclude *://*.fotoblogia.pl/*
// @exclude *://autokult.pl/*
// @exclude *://*.autokult.pl/*
// @exclude *://abczdrowie.pl/*
// @exclude *://*.abczdrowie.pl/*
// @exclude *://parenting.pl/*
// @exclude *://*.parenting.pl/*
// @exclude *://dobreprogramy.pl/*
// @exclude *://*.dobreprogramy.pl/*
// @exclude *://polygamia.pl/*
// @exclude *://*.polygamia.pl/*
// @exclude *://vietjetair.com/*
// @exclude *://*.vietjetair.com/*
// @exclude https://web.skype.com/*
// @exclude *://karelia.press/*
// @exclude *://*.karelia.press/*
// @exclude *://microsoft.com/*
// @exclude *://*.microsoft.com/*
// @exclude *://bancoctt.pt/*
// @exclude *://*.bancoctt.pt/*
// @exclude *://print24.com/*
// @exclude *://*.print24.com/*
// @exclude *://shellfcu.org/*
// @exclude *://*.shellfcu.org/*
// @exclude *://yesfile.com/*
// @exclude *://*.yesfile.com/*
// @exclude *://sunrise.ch/*
// @exclude *://*.sunrise.ch/*
// @exclude *://cetesdirecto.com/*
// @exclude *://*.cetesdirecto.com/*
// @exclude *://ubi.com/*
// @exclude *://*.ubi.com/*
// @exclude *://*.sistic.com.sg/*
// @exclude *://*.ilfattoquotidiano.it/*
// @exclude *://*.vanis.io/*
// @exclude *://*.senpa.io/*
// @exclude *://wielkopolskiebilety.pl/*
// @exclude *://*.wielkopolskiebilety.pl/*
// @exclude *://*.astrogo.astro.com.my/*
// @exclude *://*.chaturbate.com/*
// @exclude *://play.pl/*
// @exclude *://*.play.pl/*
// @exclude *://web.de/*
// @exclude *://*.web.de/*
// @exclude *://gmx.net/*
// @exclude *://*.gmx.net/*
// @exclude *://clashofclans.com/*
// @exclude *://*.clashofclans.com/*
// @exclude *://online.bfgruppe.de/*
// @exclude *://*.online.bfgruppe.de/*
// @exclude *://portalpasazera.pl/*
// @exclude *://*.portalpasazera.pl/*
// @exclude *://jeanne-laffitte.com/*
// @exclude *://*.jeanne-laffitte.com/*
// @exclude *://epicgames.com/*
// @exclude *://*.epicgames.com/*
// @exclude *://freizeithugl.de/*
// @exclude *://*.freizeithugl.de/*
// @exclude *://koleje-wielkopolskie.com.pl/*
// @exclude *://*.koleje-wielkopolskie.com.pl/*
// @exclude *://ygosu.com/*
// @exclude *://*.ygosu.com/*
// @exclude *://ppss.kr/*
// @exclude *://*.ppss.kr/*
// @exclude *://nordea.com/*
// @exclude *://*.nordea.com/*
// @exclude *://*.gov/*
// @exclude *://austintestingandtherapy.com/*
// @exclude *://*.austintestingandtherapy.com/*
// @exclude *://learn-anything.xyz/*
// @exclude *://*.learn-anything.xyz/*
// @exclude *://egybest.*/*
// @exclude *://*.egybest.*/*
// @exclude *://ancestry.com/*
// @exclude *://*.ancestry.com/*
// @exclude *://login.mts.ru/*
// @exclude *://*.login.mts.ru/*
// @exclude *://ebay.com/*
// @exclude *://*.ebay.com/*
// @exclude *://outlook.live.*/*
// @exclude *://*.outlook.live.*/*
// ==/UserScript==
var n,aa="function"==typeof Object.create?Object.create:function(a){function b(){}b.prototype=a;return new b},ba;if("function"==typeof Object.setPrototypeOf)ba=Object.setPrototypeOf;else{var ca;a:{var da={na:!0},ea={};try{ea.__proto__=da;ca=ea.na;break a}catch(a){}ca=!1}ba=ca?function(a,b){a.__proto__=b;if(a.__proto__!==b)throw new TypeError(a+" is not extensible");return a}:null}var fa=ba;var ha=Element.prototype.matches||Element.prototype.msMatchesSelector,ia="closest"in Element.prototype?function(a,b){return a.closest(b)}:function(a,b){for(;a;){if(ha.call(a,b))return a;a=a.parentElement}return null},ja=(Object.getOwnPropertyDescriptor(window,"frameElement")||Object.getOwnPropertyDescriptor(Window.prototype,"frameElement")).get,ka="attachShadow"in Element.prototype;var la=Object.prototype.toString;function p(a){return"undefined"===typeof a};var q=Object.defineProperty,r=Object.getOwnPropertyDescriptor,ma=Object.create,na=Object.keys,oa=Object.prototype.hasOwnProperty,pa=Function.prototype.apply,qa=Function.prototype.call,t=Function.prototype.bind,ra=Function.prototype.toString,sa=window.Proxy;if(sa)var ta=Reflect.apply;
var ua=window.MutationObserver||window.WebKitMutationObserver,va=window.MessageChannel,wa=window.setTimeout.bind(window),xa=r(HTMLIFrameElement.prototype,"contentWindow").get,ya=r(HTMLIFrameElement.prototype,"contentDocument").get,za=r(MessageEvent.prototype,"source").get,Aa=Error.captureStackTrace;
function wc(a,b){a.prototype=aa(b.prototype);a.prototype.constructor=a;if(fa)fa(a,b);else for(var c in b)if("prototype"!=c)if(Object.defineProperties){var d=Object.getOwnPropertyDescriptor(b,c);d&&Object.defineProperty(a,c,d)}else a[c]=b[c];a.wa=b.prototype}
function xc(a,b){function c(){}c.prototype=b.prototype;a.wa=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.za=function(a,c,f){for(var d=Array(arguments.length-2),e=2;e<arguments.length;e++)d[e-2]=arguments[e];return b.prototype[c].apply(a,d)}};function M(a,b){a=yc.B(a);b&&(a=a.replace(/\{\$([^}]+)}/g,function(a,d){return null!=b&&d in b?b[d]:a}));return a};function N(a,b){return function(c){if(!c||c.isTrusted)a.call(b,c),c&&c.preventDefault()}}function O(a,b){b=void 0===b?document:b;return b.getElementsByClassName(a)}function zc(a,b){for(var c="",d=0,e=a.length;d<e;d++)c+=a[d]+":"+a[++d],b&&(c+="!important"),c+=";";return c}var Ac;function Bc(){p(Ac)&&(Ac=document.implementation.createHTMLDocument(""));return Ac};function P(a){this.H=a;this.J=[]}P.prototype.addListener=function(a){this.J.push(a)};P.prototype.removeListener=function(a){a=this.J.indexOf(a);-1!==a&&this.J.splice(a,1)};P.prototype.handleEvent=function(a){if(a.isTrusted){a=this.J;for(var b=0,c=a.length;b<c;b++){var d=a[b];try{d()}catch(e){}}}};function Q(){P.call(this,"load");this.b=!1;var a=this.s=Bc().createElement("iframe");a.setAttribute("allowTransparency","true");11>document.documentMode&&(a.src="javascript:document.write('<script>document.domain=\""+document.domain+"\";\x3c/script>');document.close();");a.addEventListener(this.H,this);R.push(this)}var Cc;wc(Q,P);Q.prototype.handleEvent=function(a){if(!this.b&&a.isTrusted){this.b=!0;a=this.J;for(var b=0,c=a.length;b<c;b++)(0,a[b])()}};
Q.prototype.a=function(){if(ka){var a=Cc;if(p(a)){var b=Bc().createElement("div");a=Cc=b.attachShadow({mode:"closed"});var c=Bc().createElement("style");c.textContent=":host{"+zc(Dc,!0)+"}";a.appendChild(c);document.documentElement.appendChild(b)}a.appendChild(this.s)}else document.documentElement.appendChild(this.s)};
Q.prototype.i=function(){var a=R.indexOf(this);if(-1!==a){R.splice(a,1);a=this.s;var b=a.parentNode;b&&b.removeChild(a);a.removeEventListener("load",this);this.s=void 0;ka&&0===R.length&&(a=Cc.host,(b=a.parentNode)&&b.removeChild(a),Cc=void 0)}};var Dc="display block position relative width 0 height 0 margin 0 padding 0 overflow hidden z-index 2147483647".split(" "),R=[];var Ec={Aa:!0};function S(){throw Error("Do not instantiate directly");}S.prototype.P=null;S.prototype.getContent=function(){return this.content};S.prototype.toString=function(){return this.content};function Fc(a){if(null!=a)switch(a.P){case 1:return 1;case -1:return-1;case 0:return 0}return null}function Gc(){S.call(this)}xc(Gc,S);Gc.prototype.ca=Ec;function U(a){return null!=a&&a.ca===Ec?a:Hc(String(String(a)).replace(Ic,Jc),Fc(a))}function Kc(){S.call(this)}xc(Kc,S);Kc.prototype.ca={}.ya;function Lc(a){function b(){}b.prototype=a.prototype;return function(a,d){var c=new b;c.content=String(a);void 0!==d&&(c.P=d);return c}}var Hc=Lc(Gc);Lc(Kc);
(function(a){function b(){}b.prototype=a.prototype;return function(a,d){if(!String(a))return"";var c=new b;c.content=String(a);void 0!==d&&(c.P=d);return c}})(Gc);var Mc={"\x00":"&#0;",'"':"&quot;","&":"&amp;","'":"&#39;","<":"&lt;",">":"&gt;","\t":"&#9;","\n":"&#10;","\x0B":"&#11;","\f":"&#12;","\r":"&#13;"," ":"&#32;","-":"&#45;","/":"&#47;","=":"&#61;","`":"&#96;","":"&#133;"," ":"&#160;","\u2028":"&#8232;","\u2029":"&#8233;"};function Jc(a){return Mc[a]}var Ic=/[\x00\x22\x26\x27\x3c\x3e]/g;function Nc(a){var b=a.cssText,c='<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge">';a=a.ma;for(var d=a.length,e=0;e<d;e++)c+='<link rel="preload" href="'+U(a[e])+'" as="font" crossorigin="anonymous">';return c+="<style>"+U(b)+"</style></head></html>"};function V(a,b){this.A=a;this.a=b;this.V=N(this.a.V,this.a);this.Y=N(this.a.Y,this.a);this.W=N(this.a.W,this.a);this.X=N(this.a.X,this.a);this.M=N(this.a.M,this.a);this.N=N(this.a.N,this.a);this.O=N(this.a.O,this.a);this.l=t.call(this.l,this);a=this.c=new Q;a.addListener(this.l);b=a.s;b.style.cssText=zc(Oc,!1);this.u=0;b.style.width=b.style.height="0px";a.a()}
function Pc(a,b,c,d,e){a.g&&"complete"===a.g.readyState?(Sc(a,b,c,d),e()):a.c.addListener(function(){Sc(a,b,c,d);e();requestAnimationFrame(function(){Tc(a)})})}
V.prototype.l=function(){var a=this.g=this.c.s.contentDocument,b=Hc(Uc(this.A)+'*{box-sizing:border-box}html{font-size:10px;height:100%}body{height:100%;margin:0;font-size:1.3rem;line-height:1.428571429;color:#282828;font-family:"Open Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Ubuntu,"Helvetica Neue",Arial,sans-serif;font-weight:400}body.a-b-c{overflow:hidden}ul{list-style:none}input{outline:0}button{font-size:inherit;color:inherit;border:0;outline:0;background-color:transparent}select::-ms-expand{display:none}.d{display:none}.d-e{padding-left:30px;position:relative}.d-e:after{content:\'\';cursor:pointer;position:absolute;left:0;top:0;width:18px;height:18px;border-radius:100%;box-shadow:0 0 0 1px #ccc;transition:.3s ease box-shadow}.d-e:hover:after{box-shadow:0 0 0 1px #66b574}.d:checked+.d-e:before{content:\'\';position:absolute;top:4px;left:4px;width:10px;height:10px;border-radius:100%;background-color:#66b574}.d:disabled+.d-e:after{background-color:#f1f1f1;cursor:default}.d:disabled+.d-e:hover:after{box-shadow:0 0 0 1px #ccc}.f{display:none}.f-e{padding-left:30px;position:relative}.f-e:after{content:\'\';cursor:pointer;position:absolute;left:0;top:-1px;width:19px;height:19px;border-radius:3px;box-shadow:0 0 0 1px #ccc;transition:.3s ease box-shadow,.3s ease background-color}.f-e:hover:after{box-shadow:0 0 0 1px #66b574}.f:checked+.f-e:after{background-color:#66b574;box-shadow:0 0 0 1px #66b574}.f:checked+.f-e:before{content:\'\';cursor:pointer;position:absolute;z-index:1;top:5px;left:4px;width:11px;height:9px;background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg width=\\00002711\\000027  height=\\0000279\\000027  viewBox=\\0000270 0 11 9\\000027  xmlns=\\000027http://www.w3.org/2000/svg\\000027%3E%3Ctitle%3ELine 5%3C/title%3E%3Cpath d=\\000027M.91 4.059l3.41 3.408L9.684.597\\000027  stroke=\\000027%23FFF\\000027  stroke-width=\\0000271.2\\000027  fill=\\000027none\\000027  fill-rule=\\000027evenodd\\000027  stroke-linecap=\\000027round\\000027/%3E%3C/svg%3E")}.f:checked+.f-e:hover:after{background-color:#66b574}.f:disabled+.f-e:after{background-color:#f1f1f1;cursor:default}.f:disabled+.f-e:hover:after{box-shadow:0 0 0 1px #ccc}.g-h-i{background-color:#e6e6e6}.g-h-i .j{-ms-flex-pack:center;justify-content:center}.k{display:none;position:fixed;top:8px;right:48px;width:390px;background-color:#fff;padding:45px 20px 20px;box-shadow:0 0 10px 3px rgba(162,161,161,.3)}.k:after{content:"\\0025b2";position:absolute;right:-9px;top:7px;transform:rotate(90deg) scaleY(.7);color:#fff}.k-b-l{display:block}.m{display:block;position:absolute;background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg viewBox=\\0000270 0 16 16\\000027  xmlns=\\000027http://www.w3.org/2000/svg\\000027%3E%3Ctitle%3EGroup 2%3C/title%3E%3Cg stroke=\\000027%23979797\\000027  stroke-width=\\0000271.5\\000027  fill=\\000027none\\000027  fill-rule=\\000027evenodd\\000027  opacity=\\000027.661\\000027  stroke-linecap=\\000027square\\000027%3E%3Cpath d=\\000027M1.473 1.273l13 13M1.473 14.273l13-13\\000027/%3E%3C/g%3E%3C/svg%3E");cursor:pointer;top:20px;right:20px;width:15px;height:15px}.n{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;margin-bottom:35px}.o{margin-right:20px}.o-b-p{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg viewBox=\\0000270 0 49 41\\000027  xmlns=\\000027http://www.w3.org/2000/svg\\000027%3E%3Ctitle%3EGroup 3%3C/title%3E%3Cg fill=\\000027none\\000027  fill-rule=\\000027evenodd\\000027%3E%3Cpath d=\\000027M2.374.715h44.4a1.8 1.8 0 0 1 1.8 1.8v36.4a1.8 1.8 0 0 1-1.8 1.8h-44.4a1.8 1.8 0 0 1-1.8-1.8v-36.4a1.8 1.8 0 0 1 1.8-1.8z\\000027  fill=\\000027%23F5A623\\000027/%3E%3Cpath d=\\000027M5.204 10.117h38.74a1.8 1.8 0 0 1 1.8 1.8v23.596a1.8 1.8 0 0 1-1.8 1.8H5.204a1.8 1.8 0 0 1-1.8-1.8V11.917a1.8 1.8 0 0 1 1.8-1.8z\\000027  fill=\\000027%23FFF\\000027  opacity=\\000027.149\\000027/%3E%3Cg stroke=\\000027%23FFF\\000027  stroke-linecap=\\000027round\\000027  stroke-width=\\0000271.5\\000027%3E%3Cpath d=\\000027M19.149 19.004L29.816 29.67M19.149 29.671l10.667-10.667\\000027/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");width:49px;height:41px;margin-right:20px}.o-b-q{width:31px;height:40px;background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg viewBox=\\0000270 0 31 40\\000027  xmlns=\\000027http://www.w3.org/2000/svg\\000027%3E%3Ctitle%3EGroup 2%3C/title%3E%3Cg fill=\\000027%2366B574\\000027  fill-rule=\\000027nonzero\\000027%3E%3Cpath d=\\000027M21.115 25.65c-.491 1.018-1.06 2-1.701 2.94a11.367 11.367 0 0 0 2.726 4.356 11.393 11.393 0 0 0 3.726 2.49 14.968 14.968 0 0 0 1.579-1.86c-3.449-1.101-6.013-4.198-6.33-7.926z\\000027/%3E%3Cpath d=\\000027M25.65 24.87v-9.137c0-5.668-4.612-10.279-10.28-10.279-5.667 0-10.278 4.611-10.278 10.279A4.573 4.573 0 0 1 .524 20.3v2.284a6.86 6.86 0 0 0 6.852-6.852c0-4.408 3.587-7.995 7.995-7.995 4.408 0 7.994 3.587 7.994 7.995v9.136c0 3.246 2.268 5.971 5.302 6.676.345-.691.637-1.412.872-2.158a4.575 4.575 0 0 1-3.89-4.518zM20.525 34.562a13.785 13.785 0 0 1-2-2.532l-.76-1.238-1.087 1.095a22.72 22.72 0 0 1-9.214 5.619 14.804 14.804 0 0 0 2.828 1.391 25.004 25.004 0 0 0 7.072-4.51 16.126 16.126 0 0 0 4.303 4.002c.8-.376 1.561-.821 2.275-1.328a13.727 13.727 0 0 1-3.417-2.5z\\000027/%3E%3Cpath d=\\000027M15.37.886C7.185.886.525 7.546.525 15.733v2.284a2.287 2.287 0 0 0 2.284-2.284c0-6.927 5.636-12.563 12.563-12.563 6.927 0 12.562 5.636 12.562 12.563v9.136c0 1.205.938 2.194 2.121 2.278.107-.719.163-1.454.163-2.202v-9.212c0-8.187-6.66-14.847-14.846-14.847z\\000027/%3E%3Cpath d=\\000027M15.37 10.022a5.717 5.717 0 0 0-5.71 5.71c0 5.039-4.098 9.137-9.136 9.137v.076c0 .75.056 1.486.164 2.206a11.343 11.343 0 0 0 7.913-3.34 11.347 11.347 0 0 0 3.343-8.078 3.43 3.43 0 0 1 3.427-3.426 3.43 3.43 0 0 1 3.426 3.426c0 9.083-6.662 16.638-15.357 18.039.53.713 1.12 1.377 1.766 1.985a20.41 20.41 0 0 0 9.857-5.485 20.425 20.425 0 0 0 6.018-14.54 5.717 5.717 0 0 0-5.71-5.71zM17.295 37.792l-.207-.21a27.22 27.22 0 0 1-3.26 2.13 14.952 14.952 0 0 0 5.216-.38 18.558 18.558 0 0 1-1.75-1.54z\\000027/%3E%3Cpath d=\\000027M15.37 14.59c-.63 0-1.141.512-1.141 1.143 0 7.325-5.778 13.327-13.015 13.687.243.77.548 1.513.909 2.223a15.866 15.866 0 0 0 9.71-4.602 15.886 15.886 0 0 0 4.68-11.308c0-.631-.512-1.142-1.142-1.142z\\000027/%3E%3C/g%3E%3C/svg%3E")}.r{width:258px}.s{display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between}.t{width:170px;background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg viewBox=\\0000270 0 11 8\\000027  xmlns=\\000027http://www.w3.org/2000/svg\\000027%3E%3Ctitle%3ETriangle%3C/title%3E%3Cpath stroke=\\000027%231D1D1D\\000027  stroke-width=\\0000271.5\\000027  d=\\000027M9.63.914L5.147 5.945.665.914\\000027  fill=\\000027none\\000027  fill-rule=\\000027evenodd\\000027  opacity=\\000027.337\\000027/%3E%3C/svg%3E");background-size:10px 8px;background-position:153px 17px;background-repeat:no-repeat;text-align-last:center;border-radius:0;-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:0;font-size:inherit;border:0;cursor:pointer;text-align:center;box-shadow:0 0 0 1px rgba(197,197,197,.47);padding:0 20px;height:40px;line-height:40px;background-color:#fff;transition:.3s ease background-color;font-family:"Open Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Ubuntu,"Helvetica Neue",Arial,sans-serif;font-weight:700}.t:hover{background-color:rgba(104,188,113,.2)}.u{display:block;width:170px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;cursor:pointer;text-align:center;box-shadow:0 0 0 1px rgba(197,197,197,.47);padding:0 20px;height:40px;line-height:40px;background-color:#fff;transition:.3s ease background-color;font-family:"Open Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Ubuntu,"Helvetica Neue",Arial,sans-serif;font-weight:700}.u:hover{background-color:rgba(104,188,113,.2)}.u:active{background-color:#66b574;color:#fff}.v{display:none;width:30px;height:30px;position:fixed;right:8px;cursor:pointer;border-radius:100%;box-shadow:0 0 10px 3px rgba(162,161,161,.3);background-color:#fff;background-repeat:no-repeat;background-position:50%;transition:.3s ease background-color;padding:0}.v:hover{background-color:rgba(104,188,113,.2)}.v-b-l{display:block}.v-b-w{width:60px;height:60px;background-size:30px;background-position:50% 17px;background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\\000027http://www.w3.org/2000/svg\\000027  viewBox=\\0000270 0 25.3 25.9\\000027%3E%3Cpath fill=\\000027%2368bc71\\000027  d=\\000027M12.7 0C8.7 0 3.9.9 0 3c0 4.4-.1 15.4 12.7 23C25.4 18.4 25.3 7.4 25.3 3 21.4.9 16.6 0 12.7 0z\\000027/%3E%3Cpath fill=\\000027%2367b279\\000027  d=\\000027M12.6 25.9C-.1 18.4 0 7.4 0 3c3.9-2 8.7-3 12.6-3v25.9z\\000027/%3E%3Cpath fill=\\000027%23fff\\000027  d=\\000027M12.2 17.3L19.8 7a.99.99 0 0 0-1.3.1l-6.4 6.6-2.4-2.9c-1.1-1.3-2.7-.3-3.1 0l5.6 6.5\\000027/%3E%3C/svg%3E")}.v-b-x-y{background-size:16px 13px;background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg viewBox=\\0000270 0 49 41\\000027  xmlns=\\000027http://www.w3.org/2000/svg\\000027%3E%3Ctitle%3EGroup 3%3C/title%3E%3Cg fill=\\000027none\\000027  fill-rule=\\000027evenodd\\000027%3E%3Cpath d=\\000027M2.374.715h44.4a1.8 1.8 0 0 1 1.8 1.8v36.4a1.8 1.8 0 0 1-1.8 1.8h-44.4a1.8 1.8 0 0 1-1.8-1.8v-36.4a1.8 1.8 0 0 1 1.8-1.8z\\000027  fill=\\000027%23F5A623\\000027/%3E%3Cpath d=\\000027M5.204 10.117h38.74a1.8 1.8 0 0 1 1.8 1.8v23.596a1.8 1.8 0 0 1-1.8 1.8H5.204a1.8 1.8 0 0 1-1.8-1.8V11.917a1.8 1.8 0 0 1 1.8-1.8z\\000027  fill=\\000027%23FFF\\000027  opacity=\\000027.149\\000027/%3E%3Cg stroke=\\000027%23FFF\\000027  stroke-linecap=\\000027round\\000027  stroke-width=\\0000271.5\\000027%3E%3Cpath d=\\000027M19.149 19.004L29.816 29.67M19.149 29.671l10.667-10.667\\000027/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")}.v-b-q{background-size:13px 16px;background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg viewBox=\\0000270 0 31 40\\000027  xmlns=\\000027http://www.w3.org/2000/svg\\000027%3E%3Ctitle%3EGroup 2%3C/title%3E%3Cg fill=\\000027%2366B574\\000027  fill-rule=\\000027nonzero\\000027%3E%3Cpath d=\\000027M21.115 25.65c-.491 1.018-1.06 2-1.701 2.94a11.367 11.367 0 0 0 2.726 4.356 11.393 11.393 0 0 0 3.726 2.49 14.968 14.968 0 0 0 1.579-1.86c-3.449-1.101-6.013-4.198-6.33-7.926z\\000027/%3E%3Cpath d=\\000027M25.65 24.87v-9.137c0-5.668-4.612-10.279-10.28-10.279-5.667 0-10.278 4.611-10.278 10.279A4.573 4.573 0 0 1 .524 20.3v2.284a6.86 6.86 0 0 0 6.852-6.852c0-4.408 3.587-7.995 7.995-7.995 4.408 0 7.994 3.587 7.994 7.995v9.136c0 3.246 2.268 5.971 5.302 6.676.345-.691.637-1.412.872-2.158a4.575 4.575 0 0 1-3.89-4.518zM20.525 34.562a13.785 13.785 0 0 1-2-2.532l-.76-1.238-1.087 1.095a22.72 22.72 0 0 1-9.214 5.619 14.804 14.804 0 0 0 2.828 1.391 25.004 25.004 0 0 0 7.072-4.51 16.126 16.126 0 0 0 4.303 4.002c.8-.376 1.561-.821 2.275-1.328a13.727 13.727 0 0 1-3.417-2.5z\\000027/%3E%3Cpath d=\\000027M15.37.886C7.185.886.525 7.546.525 15.733v2.284a2.287 2.287 0 0 0 2.284-2.284c0-6.927 5.636-12.563 12.563-12.563 6.927 0 12.562 5.636 12.562 12.563v9.136c0 1.205.938 2.194 2.121 2.278.107-.719.163-1.454.163-2.202v-9.212c0-8.187-6.66-14.847-14.846-14.847z\\000027/%3E%3Cpath d=\\000027M15.37 10.022a5.717 5.717 0 0 0-5.71 5.71c0 5.039-4.098 9.137-9.136 9.137v.076c0 .75.056 1.486.164 2.206a11.343 11.343 0 0 0 7.913-3.34 11.347 11.347 0 0 0 3.343-8.078 3.43 3.43 0 0 1 3.427-3.426 3.43 3.43 0 0 1 3.426 3.426c0 9.083-6.662 16.638-15.357 18.039.53.713 1.12 1.377 1.766 1.985a20.41 20.41 0 0 0 9.857-5.485 20.425 20.425 0 0 0 6.018-14.54 5.717 5.717 0 0 0-5.71-5.71zM17.295 37.792l-.207-.21a27.22 27.22 0 0 1-3.26 2.13 14.952 14.952 0 0 0 5.216-.38 18.558 18.558 0 0 1-1.75-1.54z\\000027/%3E%3Cpath d=\\000027M15.37 14.59c-.63 0-1.141.512-1.141 1.143 0 7.325-5.778 13.327-13.015 13.687.243.77.548 1.513.909 2.223a15.866 15.866 0 0 0 9.71-4.602 15.886 15.886 0 0 0 4.68-11.308c0-.631-.512-1.142-1.142-1.142z\\000027/%3E%3C/g%3E%3C/svg%3E")}');var c=
Vc(this.A);c=[c[1],c[5]].filter(Wc);b=Nc({cssText:b,ma:c});a.documentElement.innerHTML=b;a.addEventListener("click",this.O,!0);a.addEventListener("touchstart",this.O,!0)};
function Sc(a,b,c,d){var e=a.g;b=M("popup_text",{numPopup:U(b)});var f=M("options"),g=M("allow_from",{origDomain:U(c)});c=M("silence_noti",{origDomain:U(c)});var k=M("manage_pref");d=M("show_popup",{destUrl:U(d)});var h=M("continue_blocking");e.body.innerHTML='<div class="k"><button class="m"></button><div class="n"><div class="o o-b-p"></div><div class="r">'+b+'</div></div><div class="s"><select class="t" name="options"><option value="0" disabled selected>'+f+'</option><option value="1">'+g+'</option><option value="2">'+
c+'</option><option value="3">'+k+'</option><option value="4">'+d+'</option></select><button class="u">'+h+'</button></div></div><button class="v v-b-x-y v-b-l"></button>';e=a.g;a.b=O("k",e)[0];a.f=O("v",e)[0];b=a.f;f=O("u",e)[0];g=O("t",e)[0];O("m",e)[0].addEventListener("click",a.V);b.addEventListener("click",a.Y);f.addEventListener("click",a.W);g.addEventListener("change",a.X);a.b.addEventListener("mouseenter",a.M);a.b.addEventListener("mouseleave",a.N);b.addEventListener("mouseenter",a.M);b.addEventListener("mouseleave",
a.N);a.j||a.b.classList.add("k-b-l");a.f.style.top="8px";Tc(a)}V.prototype.F=function(){this.b.classList.add("k-b-l");this.j=!1;this.f.style.top="8px";Tc(this)};V.prototype.m=function(){this.b.classList.remove("k-b-l");this.j=!0;this.f.style.top="8px";Tc(this)};function Tc(a){var b=a.c.s.style,c=a.j?a.f:a.b,d=c.offsetTop,e=c.offsetHeight;b.width=(a.u-=c.offsetLeft-8)+"px";b.height=d+e+8+"px";b.right="-3px";b.top="-3px"}V.prototype.i=function(){this.c.i();this.c=null};var Oc="position fixed right 0px top 0px border none z-index 2147483647".split(" ");function Xc(a){return'<div class="z"><div class="B">'+U(a.message)+"</div></div>"};function Yc(a){P.call(this,"scroll");this.a=a;var b=this.a.ownerDocument;a=this.c=b.createElement("div");var c=b.createElement("div"),d=this.b=b.createElement("div"),e=b.createElement("div");a.style.cssText="left:9999px;positiion:absolute;overflow:hidden";c.style.cssText="position:relative;white-space:nowrap;font-family:serif";d.style.cssText="position:absolute;width:100%;height:100%;overflow:hidden";b=b.createTextNode(Zc());c.appendChild(b);a.appendChild(c).appendChild(d).appendChild(e);this.a.appendChild(a);
b=c.offsetHeight;var f=a.style,g=e.style;f.width=g.width=c.offsetWidth-1+"px";f.height=g.height=b-1+"px";$c(a);$c(e);a.addEventListener(this.H,this);d.addEventListener(this.H,this)}wc(Yc,P);function Zc(){for(var a=[],b=33;122>=b;b++)a.push(b);return String.fromCharCode.apply(null,a)}function $c(a){var b=a.scrollHeight,c=a.clientHeight;a.scrollLeft=a.scrollWidth-a.clientWidth;a.scrollTop=b-c}Yc.prototype.i=function(){this.c.removeEventListener(this.H,this);this.b.removeEventListener(this.H,this)};function ad(a){var b=bd;this.l=a;this.U=b;this.j=0;this.f=t.call(this.f,this);this.g=t.call(this.g,this)}
function cd(a){var b=yc.B("settings_saved");a.A=a.U;var c=a.j;dd(a);var d=Nc({cssText:Hc(Uc(a.l)+'.z{width:100%;position:absolute;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;bottom:0;left:0;opacity:0;visibility:hidden;transition:.3s ease opacity,.3s ease visibility;font-size:14px;font-family:"Open Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Ubuntu,"Helvetica Neue",Arial,sans-serif;font-weight:400}.z-b-A{opacity:1;visibility:visible}.B{padding:15px 30px;max-width:190px;color:#fff;border-radius:5px;text-align:center;white-space:nowrap;background-color:rgba(0,0,0,.7)}'),ma:[Vc(a.l)[1]].filter(Wc)});
Xc({message:b});var e=a.c=new Q;e.s.style.cssText=zc(ed,!1);e.addListener(function(){if(!p(a.c)){var c=Xc({message:b}),e=a.c.s.contentDocument;e.documentElement.innerHTML=d;e.body.innerHTML=c;a.b=e.body.firstElementChild}});e.addListener(a.g);e.addListener(function(){fd(a,2===c||3===c?2:1)});e.a()}ad.prototype.g=function(){this.f();(this.u=new Yc(this.b)).addListener(this.f)};
ad.prototype.f=function(){var a=this.b.firstElementChild,b=a.offsetWidth;a=a.offsetHeight;var c=this.c.s.style;c.left="calc(50% - "+b/2+"px)";c.width=b+"px";c.height=a+"px"};function dd(a){var b=a.c;p(b)||(b.i(),clearTimeout(a.a),b=a.u,p(b)||(b.i(),a.c=a.b=a.a=a.u=void 0))}
function fd(a,b){clearTimeout(a.a);switch(b){case 1:requestAnimationFrame(function(){a.b.classList.add("z-b-A")});a.a=setTimeout(function(){fd(a,2)},gd);break;case 2:a.b.classList.add("z-b-A");a.a=setTimeout(function(){fd(a,3)},a.A);break;case 3:a.b.classList.remove("z-b-A");a.a=setTimeout(function(){fd(a,0)},gd);break;case 0:dd(a),a.a=void 0}a.j=b}var ed="position fixed bottom 15px width 0px height 0px border none z-index 2147483647".split(" "),gd=300;function hd(a){var b=id;this.j=new jd;this.l=b;this.U=a;this.va=ma(null);this.b=0;this.F=t.call(this.F,this);this.m=t.call(this.m,this);this.i=t.call(this.i,this);this.L=t.call(this.L,this);this.xa=new ad(this.j)}function W(a,b,c){clearTimeout(a.f);b?(a.f=wa(b,c),a.A=Date.now(),a.u=c):a.f=a.A=a.u=null}n=hd.prototype;n.F=function(){this.a.F();this.b=1;W(this,this.m,kd);this.c=null};n.m=function(){this.a.m();this.b=2;W(this,this.i,kd);this.c=null};
n.i=function(){this.a&&(this.a.i(),this.a=null);this.b=0;W(this);this.c=null};function ld(a,b,c){var d=a.va;d=p(d[b])?d[b]=1:++d[b];a.a||(a.a=new V(a.j,a));var e={ka:b,oa:c};Pc(a.a,d,b,c,function(){a.g=e});switch(a.b){case 0:a.b=1;W(a,a.m,kd);break;case 1:W(a,a.m,kd)}}n.M=function(){"number"===typeof this.f&&(this.c=this.u-(Date.now()-this.A),W(this))};n.N=function(){if("number"===typeof this.c){var a=this.c,b=md;W(this,1===this.b?this.m:this.i,a>b?a:b);this.c=null}};n.V=function(){this.m()};
n.Y=function(){switch(this.b){case 2:this.F();break;case 1:this.m()}};n.W=function(){this.i()};n.X=function(a){switch(a.target.value){case "1":var b=this.l,c=this.g.ka,d=this.L,e=nd();-1===e.indexOf(c)?(e.push(c),GM_setValue(od,e.join(",")),pd(),p(d)||d(),qd(b)):p(d)||d();break;case "2":b=this.l;c=this.L;GM_setValue(this.g.ka,1);pd();p(c)||c();qd(b);break;case "3":this.U();this.i();break;case "4":window.open(this.g.oa,"_blank"),this.i()}a.preventDefault()};n.O=function(){W(this)};
n.L=function(){var a=this.xa;a&&cd(a);this.i()};var kd=1E4,md=2E3,bd=2E3;var rd=window.crypto||window.msCrypto,sd=rd?function(){var a=new Uint8Array(24);rd.getRandomValues(a);return btoa(String.fromCharCode.apply(null,a))}:function(){var a=Date.now()%1E9;return function(){return""+(1E9*Math.random()>>>0)+a++}}();var td=window.XMLHttpRequest;function ud(){this.a=[]}function nd(){var a=GM_getValue(od);return p(a)||0===a.length?[]:a.split(",")}function qd(a){a=a.a;var b=[];var c=[];vd(new wd(b,c));b=[b,c];c=0;for(var d=a.length;c<d;c++)a[c](b)}ud.prototype.S=function(){var a=GM_getValue(xd);p(a)&&(a=sd(),GM_setValue(xd,a),pd());return a};
function pd(){var a=new td;a.open("GET",window.location.href,!0);a.setRequestHeader("Pragma","no-cache");a.setRequestHeader("Expires","-1");a.setRequestHeader("Cache-Control","no-cache");a.send()}var od="whitelist",xd="#id";function vd(a){for(var b=GM_listValues(),c=0,d=b.length;c<d;c++){var e=b[c],f=GM_getValue(e);a.a(e,f)}}function yd(){this.whitelist=zd}
yd.prototype.a=function(a,b){if("string"===typeof b)if(a===Ad)Array.prototype.push.apply(this.whitelist,b.split(","));else try{!0===JSON.parse(b).whitelisted&&-1===this.whitelist.indexOf(a)&&this.whitelist.push(a)}catch(c){}GM_deleteValue(a)};var Ad="whitelist";function wd(a,b){this.c=a;this.b=b}wd.prototype.a=function(a,b){a===od?0<b.length&&Array.prototype.push.apply(this.c,b.split(",")):"ver"!==a&&0!==(b&1)&&this.b.push(a)};function X(){var a=Bd,b=Cd;this.c=id;this.b=a;this.B=b;this.domain=location.hostname;this.a="undefined"!==typeof InstallTrigger&&document.currentScript}X.prototype.v=function(a){a=void 0===a?this.domain:a;return-1!==nd().indexOf(a)};X.prototype.Z=function(){return 0!==(GM_getValue(this.domain,0)&1)};X.prototype.aa=function(a,b){var c=this;setTimeout(function(){ld(c.b,a,b)})};X.prototype.S=function(){return this.c.S()};var Dd={en:{userscript_name:"AdGuard Popup Blocker",on_navigation_by_popunder:"This transition to the new page is likely to be caused by a pop-under. Do you wish to continue?",aborted_popunder_execution:"Popup Blocker aborted a script execution to prevent background redirect",settings_saved:"Settings saved",show_popup:"Show {$destUrl}",continue_blocking:"Continue blocking",allow_from:"Allow pop-ups on {$origDomain}",manage_pref:"Manage preferences...",popup_text:"AdGuard prevented this website from opening {$numPopup} pop-up windows",
options:"Options",silence_noti:"Don't show this message on {$origDomain}"},ar:{userscript_name:"مانع النوافذ المنبثقة AdGuard",on_navigation_by_popunder:"من المحتمل ان يكون هذا الانتقال إلى الصفحة الجديدة ناتجا عن الإطار المنبثق. هل ترغب في المتابعة ؟",aborted_popunder_execution:"مانع النوافذ المنبثقة احبط تنفيذ script لمنع أعاده توجيه الخلفية",settings_saved:"الإعدادات المحفوظة",show_popup:"{$destUrl}اظهار",continue_blocking:"متابعة الحظر",allow_from:"{$origDomain}السماح بالنوافذ المنبثقة على",manage_pref:"...أداره التفضيلات",
popup_text:"النوافذالمنبثقة{$numPopup} منع ادجارد موقع الويب هذا من فتح",options:"الخيارات",silence_noti:"{$origDomain}عدم إظهار هذه الرسالة على"},be:{userscript_name:"Блакавальнік усплывальнай рэкламы ад AdGuard",on_navigation_by_popunder:"Гэты пераход на новую старонку найхутчэй выкліканы поп-андэрам. Усё адно працягнуць?",aborted_popunder_execution:"Блакавальнік усплывальнай рэкламы перапыніў выкананне скрыпту, каб перадухіліць фонавае пераадрасаванне",settings_saved:"Налады захаваны",show_popup:"Паказаць {$destUrl}",
continue_blocking:"Працягнуць блакаванне",allow_from:"Дазволіць усплывальныя вокны на {$origDomain}",manage_pref:"Кіраваць наладамі...",popup_text:"AdGuard запабег паказ {$numPopup} усплывальных вокнаў на гэтым сайце",options:"Опцыі",silence_noti:"Не паказваць гэта паведамленне на {$origDomain}"},cs:{userscript_name:"AdGuard blokátor vyskakovacích oken",on_navigation_by_popunder:"Tento přechod na novou stránku bude pravděpodobně způsoben pop-under. Chcete pokračovat?",aborted_popunder_execution:"Blokátor vyskakovacích oken zrušil spuštění skriptu, aby zabránil přesměrování na pozadí",
settings_saved:"Nastavení uložena",show_popup:"Zobrazit {$destUrl}",continue_blocking:"Pokračovat v blokování",allow_from:"Povolit vyskakovací okna na {$origDomain}",manage_pref:"Spravovat předvolby",popup_text:"AdGuard zabránil tomu, aby tato webová stránka otevřela vyskakovací okna: {$numPopup}",options:"Možnosti",silence_noti:"Tuto zprávu nezobrazovat na {$origDomain}"},da:{userscript_name:"AdGuard Popup Blocker",on_navigation_by_popunder:"Denne overgang til den nye side vil sandsynligvis medføre et pop under-vindue. Ønsker du at fortsætte?",
aborted_popunder_execution:"Popup Blocker afbrød en script eksekvering for at forhindre baggrundsomdirigering",settings_saved:"Indstillingerne er gemt",show_popup:"Vis {$destUrl}",continue_blocking:"Fortsæt blokering",allow_from:"Tillad pop-ups på {$origDomain}",manage_pref:"Administrer præferencer...",popup_text:"AdGuard forhindrede denne hjemmeside i at åbne {$numPopup} pop op-vinduer",options:"Valgmuligheder",silence_noti:"Vis ikke denne meddelelse på {$origDomain}"},de:{userscript_name:"AdGuard Pop-up-Blocker",
on_navigation_by_popunder:"Diese Seiten-Navigation wird wahrscheinlich durch ein Pop-under verursacht. Möchten Sie fortfahren?",aborted_popunder_execution:"Pop-up-Blocker hat eine Skript-Ausführung abgebrochen, um eine Hintergrundumleitung zu verhindern",settings_saved:"Einstellungen gespeichert",show_popup:"{$destUrl} anzeigen",continue_blocking:"Blockieren fortsetzen",allow_from:"Pop-ups auf {$origDomain} zulassen",manage_pref:"Einstellungen verwalten...",popup_text:"AdGuard hat auf dieser Webseite {$numPopup} Pop-up-Fenster verhindert",
options:"Optionen",silence_noti:"Diese Nachricht auf {$origDomain} nicht anzeigen"},es:{userscript_name:"AdGuard Popup Blocker",on_navigation_by_popunder:"Parece que la transición a nueva página sea causada por un pop-under (elemento emergente). ¿Quiere continuar?",aborted_popunder_execution:"Popup Blocker canceló la ejecución de un script para evitar la redirección en segundo plano",settings_saved:"Ajustes guardados",show_popup:"Mostrar {$destUrl}",continue_blocking:"Continuar bloqueando",allow_from:"Permitir ventanas emergentes en {$origDomain}",
manage_pref:"Administrar preferencias...",popup_text:"AdGuard impidió que este sitio web abriera {$numPopup} ventanas emergentes",options:"Opciones",silence_noti:"No mostrar este mensaje en {$origDomain}"},fa:{userscript_name:"مسدودساز پاپ-آپ AdGuard",on_navigation_by_popunder:"انتقال به این صفحه جدید احتمالا بخاطر یه پاپ-آندر انجام شده است. میخواهید ادامه دهید؟",aborted_popunder_execution:"مسدودساز پاپ-آپ اجرای کد را لغو کرده تا از ریدایرکت جبلوگیری شود",settings_saved:"تنظيمات ذخیره شد",show_popup:"نمایش {$destUrl}",
continue_blocking:"ادامه مسدودسازی",allow_from:"اجازه پاپ آپ ها در {$origDomain}",manage_pref:"مدیریت اولویت ها...",popup_text:"AdGuard این وبسایت را از بازکردن {$numPopup} پنجره پاپ آپ جلوگیری کرد",options:"گزینه ها",silence_noti:"این پیام را نشان نده در {$origDomain}"},fi:{userscript_name:"AdGuardin Ponnahdusikkunan estäjä",aborted_popunder_execution:"Ponnahdusikkunoiden estäjä keskeytti komentosarjan suorituksen estääksesi taustan uudelleenohjauksen",settings_saved:"Asetukset tallennettiin",show_popup:"Näytä {$destUrl}",
continue_blocking:"Jatka estämistä",allow_from:"Salli ponnahdusikkunat sivustolle {$origDomain}",manage_pref:"Hallitse asetuksia...",popup_text:"AdGuard esti tätä verkkosivustoa avaamasta {$numPopup} ponnahdusikkunaa",options:"Vaihtoehdot",silence_noti:"Älä näytä tätä viestiä sivustolle {$origDomain}"},fr:{userscript_name:"Bloqueur de fenêtres pop-up de AdGuard",on_navigation_by_popunder:"Cette transition vers la nouvelle page est susceptible d'être causée par un pop-under. Désirez-vous continuer?",
aborted_popunder_execution:"Le bloqueur de pop-ups a interrompu l'exécution d'un script pour empêcher une redirection en arrière-plan",settings_saved:"Paramètres sauvegardés",show_popup:"Afficher {$destUrl}",continue_blocking:"Continuer le blocage",allow_from:"Autoriser fenêtres pop-up pour {$origDomain}",manage_pref:"Administrer les préférences...",popup_text:"AdGuard a empêché ce site web d'afficher {$numPopup} fenêtres pop-up",options:"Options",silence_noti:"Ne pas afficher ce message sur {$origDomain}"},
id:{userscript_name:"Pemblokir Popup AdGuard",on_navigation_by_popunder:"Transisi ke laman baru ini kemungkinan disebabkan oleh sebuah pop-up. Apakah Anda ingin melanjutkan?",aborted_popunder_execution:"Popup Blocker menghentikan eksekusi skrip untuk mencegah perubahan laman di latar belakang",settings_saved:"Pengaturan disimpan",show_popup:"Tampilkan {$destUrl}",continue_blocking:"Lanjutkan pemblokiran",allow_from:"Izinkan popup di {$origDomain}",manage_pref:"Kelola pengaturan...",popup_text:"AdGuard mencegah situs web ini membuka {$numPopup} jendela popup",
options:"Opsi",silence_noti:"Jangan tampilkan pesan ini di {$origDomain}"},it:{userscript_name:"Blocco Pop-Up di AdGuard",on_navigation_by_popunder:"Questo passaggio alla nuova pagina è probabilmente causato da un pop-under. Vuoi continuare?",aborted_popunder_execution:"PopupBlocker ha interrotto l'esecuzione di uno script per impedire il reindirizzamento in background",settings_saved:"Impostazioni salvate",show_popup:"Mostra {$destUrl}",continue_blocking:"Continua a bloccare",allow_from:"Permetti popup per {$origDomain}",
manage_pref:"Gestisci opzioni",popup_text:"AdGuard ha impedito a questo sito web di aprire {$numPopup} finestre di popup",options:"Impostazioni",silence_noti:"Non mostrare questo messaggio in  {$origDomain}"},ja:{userscript_name:"AdGuard ポップアップブロッカー",on_navigation_by_popunder:"新しいページへの移動はポップアンダーによって生じた可能性があります。続行しますか？",aborted_popunder_execution:"ポップアップブロッカーはバックグラウンドリダイレクトを防ぐためにスクリプトの実行を中止しました",settings_saved:"設定保存完了",show_popup:"{$destUrl}を表示する",continue_blocking:"ブロッキングを続ける",allow_from:"{$origDomain}のポップアップを許可する",
manage_pref:"設定を管理…",popup_text:"AdGuardはこのウェブサイトが{$numPopup}のポップアップウィンドウを開くのを防ぎました",options:"オプション",silence_noti:"{$origDomain}にこのメッセージを表示しない"},ko:{userscript_name:"AdGuard 팝업 차단기",on_navigation_by_popunder:"이 새 페이지로의 이동은 팝언더 광고에 의한 것일 수 있습니다. 계속 하시겠습니까?",aborted_popunder_execution:"팝업 차단기가 백그라운드 리디렉션을 방지하기 위해 스크립트 실행을 중단하였습니다",settings_saved:"설정 저장됨",show_popup:"{$destUrl} 표시",continue_blocking:"계속 차단하기",allow_from:"{$origDomain}의 팝업 허용하기",manage_pref:"환경 설정 관리...",popup_text:"AdGuard가 이 웹사이트에서 {$numPopup}개의 팝업 창을 차단하였습니다",
options:"옵션",silence_noti:"{$origDomain}에서 이 메세지 표시하지 않기"},lt:{userscript_name:"AdGuard iššokančiųjų langų blokatorius",on_navigation_by_popunder:"Šis perėjimas į naują puslapį greičiausiai buvo įtakotas pop-under. Ar norite tęsti?",aborted_popunder_execution:"Iškylančių langų blokatorius nutraukė skripto vykdymą, kad būtų išvengta foninio peradresavimo",settings_saved:"Nustatymai išsaugoti",show_popup:"Rodyti {$destUrl}",continue_blocking:"Tęsti blokavimą",allow_from:"Leisti iššokančius langus {$origDomain}",
manage_pref:"Tvarkyti nuostatas...",popup_text:"„AdGuard“ neleido šiai svetainei atidaryti {$numPopup} iššokančius langus",options:"Parinktys",silence_noti:"Nerodyti šio pranešimo {$origDomain}"},ms:{userscript_name:"AdGuard Penyekat Pop Timbul",on_navigation_by_popunder:"Peralihan ke laman baru ini kemungkinan disebabkan oleh pop-bawah. Anda ingin meneruskan?",aborted_popunder_execution:"Penyekat Pop Timbul menggugurkan pelaksanaan skrip bagi mengelakkan arah semula latar belakang",settings_saved:"Tetapan disimpan",
show_popup:"Tunjukkan {$destUrl}",continue_blocking:"Terus menyekat",allow_from:"Benarkan pop-timbul untuk {$origDomain}",manage_pref:"Urus keutamaan...",popup_text:"AdGuard menghalang laman web ini daripada membuka {$numPopup} tetingkap pop-timbul",options:"Pilihan",silence_noti:"Jangan tunjuk mesej ini pada {$origDomain}"},no:{userscript_name:"AdGuards popup-blokkerer",on_navigation_by_popunder:"Omdirigeringen til den nye nettsiden er sannsynligvis forårsaket av en pop-under. Ønsker du å fortsette?",
aborted_popunder_execution:"Popup Blocker avbrøt en skrift fra å kjøre for å hindre bakgrunnsomdirigering",settings_saved:"Innstillinger lagret",show_popup:"Vis {$destUrl}",continue_blocking:"Fortsett blokkering",allow_from:"Tillat popup-vinduer for {$origDomain}",manage_pref:"Administrer preferanser…",popup_text:"AdGuard forhindret denne nettsiden i å åpne popup-vinduer for {$numPopup}",options:"Alternativer",silence_noti:"Ikke vis denne meldingen for {$origDomain}"},pl:{userscript_name:"Bloker wyskakujących okienek przez AdGuard",
on_navigation_by_popunder:"To przejście na nową stronę może być spowodowane przez pop-under. Czy chcesz kontynuować?",aborted_popunder_execution:"Bloker wyskakujących okienek przerwał wykonywanie skryptu, aby zapobiec przekierowaniu w tle",settings_saved:"Ustawienia zapisane",show_popup:"Pokaż {$destUrl}",continue_blocking:"Kontynuuj blokowanie",allow_from:"Zezwalaj na wyskakujące okienka dla {$origDomain}",manage_pref:"Zarządzaj preferencjami...",popup_text:"AdGuard zapobiegł na tej stronie otwarcie  {$numPopup} wyskakujacego okienka.",
options:"Opcje",silence_noti:"Nie pokazuj tej wiadomości w {$origDomain}"},pt:{userscript_name:"AdGuard Bloqueador de Pop-ups",on_navigation_by_popunder:"Essa transição para a nova página provavelmente será causada por um pop-under. Você deseja continuar?",aborted_popunder_execution:"O bloqueador de pop-ups interrompeu uma execução de script para evitar um redirecionamento em segundo plano",settings_saved:"Configurações salvas",show_popup:"Mostrar {$destUrl}",continue_blocking:"Continuar bloqueando",
allow_from:"Permitir pop-ups em {$origDomain}",manage_pref:"Gerenciar preferências...",popup_text:"O AdGuard impediu este site de abrir {$numPopup} pop-ups",options:"Opções",silence_noti:"Não mostrar essa mensagem no {$origDomain}"},"pt-PT":{userscript_name:"Bloqueador de Popup AdGuard",on_navigation_by_popunder:"Esta transição para a nova página  será  provavelmente causada por um popunder. Deseja continuar?",aborted_popunder_execution:"PopupBlocker abortou uma execução de script para evitar o redireccionamento em segundo plano",
settings_saved:"As definições foram guardadas",show_popup:"Mostrar {$destUrl}",continue_blocking:"Continuar a bloquear",allow_from:"Permitir popups em {$origDomain}",manage_pref:"Gerir preferências...",popup_text:"O AdGuard impediu que este site abrisse janelas popup de {$numPopup}",options:"Opções",silence_noti:"Não mostrar esta mensagem em {$origDomain}"},ru:{userscript_name:"Блокировщик всплывающей рекламы от AdGuard",on_navigation_by_popunder:"Этот переход на новую страницу скорее всего вызван поп-андером. Всё равно продолжить?",
aborted_popunder_execution:"Блокировщик всплывающей рекламы прервал исполнение скрипта, чтобы предотвратить фоновую переадресацию",settings_saved:"Настройки сохранены",show_popup:"Показать {$destUrl}",continue_blocking:"Продолжить блокировку",allow_from:"Разрешить всплывающие окна на {$origDomain}",manage_pref:"Управлять настройками...",popup_text:"AdGuard предотвратил показ {$numPopup} всплывающих окон на этом сайте",options:"Опции",silence_noti:"Не показывать это сообщение на {$origDomain}"},sl:{userscript_name:"AdGuard Zaviralec pojavnih oken",
on_navigation_by_popunder:"Ta prehod na novo stran je verjetno posledica pojavnega okna. Ali želite nadaljevati?",aborted_popunder_execution:"Zaviralec pojavnih oken je prekinil izvajanje skripta, da bi preprečil preusmerjanje v ozadju",settings_saved:"Nastavitve so shranjene",show_popup:" Prikaži {$destUrl}",continue_blocking:"Nadaljuj z zaviranjem",allow_from:"Dovoli pojavna okna na {$origDomain}",manage_pref:"Upravljaj nastavitve...",popup_text:"AdGuard je tej spletni strani preprečil odpiranje {$numPopup} pojavnih oken",
options:"Možnosti",silence_noti:"Ne prikazuj tega sporočila na {$origDomain}"},tr:{userscript_name:"AdGuard Popup Blocker eklentisi",on_navigation_by_popunder:"Yeni sayfaya geçiş, bir gizli pencere nedeniyle meydana gelmiş olabilir. Devam etmek istiyor musunuz?",aborted_popunder_execution:"Arka plan yönlendirmesini önlemek için Açılır Pencere Engelleyicisi bir komut dosyasının çalışmasını engelledi",settings_saved:"Ayarlar kaydedildi",show_popup:"{$destUrl} Göster",continue_blocking:"Engellemeye devam et",
allow_from:"{$origDomain} için açılır pencerelere izin ver",manage_pref:"Tercihleri yönet...",popup_text:"AdGuard bu sitenin {$numPopup} açılır pencere açmasını önledi",options:"Ayarlar",silence_noti:"Bu mesajı {$origDomain} alan adı üzerinde gösterme"},uk:{userscript_name:"Блокувальник спливаючої реклами AdGuard",on_navigation_by_popunder:"Цей перехід на нову сторінку, ймовірно, міг бути викликаний поп-андером. Бажаєте продовжити?",aborted_popunder_execution:"PopupBlocker перервав виконання скрипта, щоб запобігти фоновому перенаправленню",
settings_saved:"Налаштування збережені",show_popup:"Показати {$destUrl}",continue_blocking:"Продовжити блокування",allow_from:"Дозволити спливаючі вікна {$origDomain}",manage_pref:"Керувати налаштуваннями...",popup_text:"AdGuard запобіг показу {$numPopup} спливаючих вікон на цьому сайті",options:"Опції",silence_noti:"Не показувати це повідомлення на {$origDomain}"},vi:{userscript_name:"AdGuard Popup Blocker",on_navigation_by_popunder:"Việc chuyển đổi sang trang mới này có thể được gây ra bởi một cửa sổ bật xuống. Bạn có muốn tiếp tục?",
aborted_popunder_execution:"Trình chặn Popup đã hủy bỏ việc thực thi tập lệnh để ngăn chuyển hướng nền",settings_saved:"Đã lưu cài đặt",show_popup:"Hiện {$destUrl}",continue_blocking:"Tiếp tục chặn",allow_from:"Cho phép cửa sổ bật lên cho {$origDomain}",manage_pref:"Quản lý tùy chọn...",popup_text:"AdGuard đã ngăn trang web này mở {$numPopup} cửa sổ bật lên",options:"Tuỳ chọn",silence_noti:"Đừng hiển thị thông báo này trên {$origDomain}"},zh:{userscript_name:"AdGuard 弹窗拦截器",on_navigation_by_popunder:"此网页导航可能导致弹窗。您要继续？",
aborted_popunder_execution:"PopupBlocker 已中止脚本执行以防止后台重新定向",settings_saved:"设置已保存",show_popup:"显示 {$destUrl}",continue_blocking:"继续拦截",allow_from:"允许 {$origDomain} 弹窗",manage_pref:"管理首选项...",popup_text:"AdGuard 已防止此网站打开的 {$numPopup} 个弹窗",options:"选项",silence_noti:"在 {$origDomain} 上不再显示此讯息"},"zh-TW":{userscript_name:"AdGuard 彈出式視窗封鎖器",on_navigation_by_popunder:"此至新的頁面之轉換很可能是由一個背彈式視窗引起。您想要繼續嗎？",aborted_popunder_execution:"彈出式視窗封鎖器已中止腳本執行以防止背景重新導向",settings_saved:"設定被儲存",show_popup:"顯示 {$destUrl}",continue_blocking:"繼續封鎖",
allow_from:"允許在 {$origDomain} 的彈出式視窗",manage_pref:"管理偏好設定…",popup_text:"AdGuard 已防止該網站開啟 {$numPopup} 彈出式視窗",options:"選項",silence_noti:"不要於 {$origDomain} 上顯示該訊息"}},Ed=Object.keys(Dd).map(function(a){return a.replace("_","-")}),Fd=null;function Gd(a){return-1!==Ed.indexOf(a)?(Fd=a,!0):!1}if("undefined"===typeof AdguardSettings||!Gd(AdguardSettings.locale.replace("_","-"))){var Y=navigator.language.replace("_","-");if(!Gd(Y)){var Hd=Y.indexOf("-");-1!==Hd&&(Y=Y.slice(0,Hd));Gd(Y)||(Fd="en")}}
function Cd(a){var b=Dd[Fd][a];b||(b=Dd.en[a]);return b};function jd(){this.a=GM_getResourceURL}function Vc(a){if(p(a.b)){var b=Id+"regular/OpenSans-Regular.woff",c=Id+"semibold/OpenSans-Semibold.woff",d=Id+"bold/OpenSans-Bold.woff",e=b+2,f=c+2,g=d+2;a.b=[a.a(b),a.a(e),a.a(c),a.a(f),a.a(d),a.a(g)]}return a.b}function Wc(a){return!Jd.test(a)}
function Uc(a){a=Vc(a);return'@font-face{font-family:"Open Sans";src:url('+a[1]+') format("woff2"),url('+a[0]+') format("woff");font-weight:400;font-style:normal}@font-face{font-family:"Open Sans";src:url('+a[3]+') format("woff2"),url('+a[2]+') format("woff");font-weight:600;font-style:normal}@font-face{font-family:"Open Sans";src:url('+a[5]+') format("woff2"),url('+a[4]+') format("woff");font-weight:700;font-style:normal}'}var Id="./assets/fonts/",Jd=/^data:/;var yc=new function(){this.B=Cd},id=new ud,Bd=new hd(function(){window.open("https://popupblocker.adguard.com/options.html","__popupBlocker_options_page__")}),Z=new X;if(2>parseFloat(GM_getValue("ver","1"))){var zd=[];vd(new yd);GM_setValue(od,zd.join(","));GM_setValue("ver","2")}function popupBlocker(window,CONTENT_SCRIPT_KEY){var n,aa="function"==typeof Object.create?Object.create:function(a){function b(){}b.prototype=a;return new b},ba;if("function"==typeof Object.setPrototypeOf)ba=Object.setPrototypeOf;else{var ca;a:{var da={na:!0},ea={};try{ea.__proto__=da;ca=ea.na;break a}catch(a){}ca=!1}ba=ca?function(a,b){a.__proto__=b;if(a.__proto__!==b)throw new TypeError(a+" is not extensible");return a}:null}var fa=ba;var ha=Element.prototype.matches||Element.prototype.msMatchesSelector,ia="closest"in Element.prototype?function(a,b){return a.closest(b)}:function(a,b){for(;a;){if(ha.call(a,b))return a;a=a.parentElement}return null},ja=(Object.getOwnPropertyDescriptor(window,"frameElement")||Object.getOwnPropertyDescriptor(Window.prototype,"frameElement")).get,ka="attachShadow"in Element.prototype;var la=Object.prototype.toString;function p(a){return"undefined"===typeof a};var q=Object.defineProperty,r=Object.getOwnPropertyDescriptor,ma=Object.create,na=Object.keys,oa=Object.prototype.hasOwnProperty,pa=Function.prototype.apply,qa=Function.prototype.call,t=Function.prototype.bind,ra=Function.prototype.toString,sa=window.Proxy;if(sa)var ta=Reflect.apply;
var ua=window.MutationObserver||window.WebKitMutationObserver,va=window.MessageChannel,wa=window.setTimeout.bind(window),xa=r(HTMLIFrameElement.prototype,"contentWindow").get,ya=r(HTMLIFrameElement.prototype,"contentDocument").get,za=r(MessageEvent.prototype,"source").get,Aa=Error.captureStackTrace;
function Ba(a,b){3===a.nodeType&&(a=a.parentNode);return a===b}var Ca=/^about:/;function u(a){return"nodeName"in a}function Da(a){return"[object Window]"===la.call(a)}function Ea(a){a=a.type;return"click"===a||"mousedown"===a||"mouseup"===a};var v;for(var Fa,w=window;w&&Ca.test(w.location.href);){var Ga=ja.call(w);w=Ga?Ga.ownerDocument.defaultView:null}Fa=w?w:null;var x=Fa.MutationObserver||Fa.WebKitMutationObserver;function Ha(a){return Da(a)||u(a)&&(a=a.nodeName.toUpperCase(),"#DOCUMENT"===a||"HTML"===a||"BODY"===a)?!0:!1}function Ia(a){var b=a.textContent;return b&&b.trim().length?!1:0===a.getElementsByTagName("img").length}function Ja(a){if(!("style"in a))return!1;var b=a.ownerDocument.defaultView,c=b.innerWidth;b=b.innerHeight;a.getBoundingClientRect();if(Ka(a.getBoundingClientRect(),c,b)){do if(La(a))return!0;while(a=a.parentElement)}return!1}
function La(a){a=getComputedStyle(a);var b=a.zIndex,c=a.opacity;return("static"!==a.position&&"auto"!==b||1>parseFloat(c))&&1E3<parseInt(b)?!0:!1}function Ka(a,b,c){var d=a.right,e=a.top,f=a.bottom;return 0===(a.left/(b>>4)|0)&&0===((d-b)/(b>>4)|0)&&0===(e/(c>>4)|0)&&0===((f-c)/(c>>4)|0)};function Ma(a){var b=y.B("on_navigation_by_popunder");return a.returnValue=b}function Na(){window===window.top&&(window.addEventListener("beforeunload",Ma),setTimeout(function(){window.removeEventListener("beforeunload",Ma)},1E3))};var Oa=Date.now()%1E9,Pa=Object.defineProperty;function z(){this.o="__st"+(1E9*Math.random()>>>0)+(Oa++ +"__")}z.prototype.set=function(a,b){var c=a[this.o];c&&c[0]===a?c[1]=b:Pa(a,this.o,{value:[a,b],writable:!0});return this};z.prototype.get=function(a){var b;return(b=a[this.o])&&b[0]===a?b[1]:void 0};z.prototype.delete=function(a){var b=a[this.o];if(!b)return!1;a=b[0]===a;b[0]=b[1]=void 0;return a};z.prototype.has=function(a){var b=a[this.o];return b?b[0]===a:!1};var Qa="function"===typeof WeakMap;
Qa&&function(){if("function"!==typeof DOMPoint)return!1;var a=new DOMPoint,b=new WeakMap;try{return b.set(a,void 0),!1}catch(c){return!0}}();var A=Qa?WeakMap:z;var Ra=sa?ta:function(){do var a=Math.random();while(a in pa);q(pa,a,{value:qa});return function(b,c,d){return pa[a](b,c,d)}}();ra.call(oa);var Sa=new A,Ta=new A;function Ua(a,b,c){var d=Sa.get(b);"undefined"==typeof d&&(d=b);return a.apply(d,c)}function Va(a,b){var c;if(c=Ta.get(a))return c;c=function(){return b(a,this,arguments)};Wa(a,c,"name");Wa(a,c,"length");Sa.set(c,a);Ta.set(a,c);return c}function Wa(a,b,c){var d=r(a,c);d&&d.configurable&&(d.value=a[c],q(b,c,d))}function B(a){this.la=a}
function Xa(a,b,c){this.f=a;this.a=b;this.c=c;this.b=!1;this.h=Ra(t,this.h,[this])}Xa.prototype.h=function(a,b){b=void 0===b?this.a:b;if(this.b)throw 1;this.b=!0;try{return Ra(this.f,b,a)}catch(c){if(Aa)try{Aa(c,this.c)}catch(d){}throw new B(c);}};function Ya(a,b){return a.h(b)}function Za(a,b){b=void 0===b?Ya:b;var c;return c=Va(a,function(a,e,f){a=new Xa(a,e,c);try{return b(a,f)}catch(g){if(g instanceof B)throw g.la;if(!a.b)try{return a.h(f)}catch(k){if(k instanceof B)throw k.la;}}})}
function $a(a,b,c){a.hasOwnProperty(b)&&(a[b]=Za(a[b],c))};var ab;function bb(){ab=Math.random().toString(36).substr(7);console.warn(y.B("aborted_popunder_execution"));throw new B(ab);};var cb=document.elementsFromPoint||document.msElementsFromPoint,C,db=Event.prototype,eb=r(db,"path");C=eb?eb.get:db.composedPath;function fb(a){for(var b,c=!1,d,e=0,f=a.length;e<f;e++){var g=a[e];if(!("id"in g))break;d&&d.T||(d=gb(g));!c&&La(g)&&(c=!0,Ia(a[0])&&(b=g))}d.D=b;return d}function hb(a){for(var b,c=!1,d,e=a;a&&"id"in a;)d&&d.T||(d=gb(a)),!c&&La(a)&&(c=!0,Ia(e)&&(b=a)),a=a.parentElement;d.D=b;return d}
function gb(a){var b=!1,c=null;if(a=ia(a,"iframe,input,a,area,button,[onclick],[onmousedown],[onmouseup]")){b=!0;var d=a.nodeName.toUpperCase();if("A"===d||"AREA"===d)c=a.href}return{T:b,R:c}}function ib(a){"style"in a&&(a.style.setProperty("display","none",jb),a.style.setProperty("pointer-events","none",jb))}
var jb="important",nb=cb?function(a,b,c){if(a.isTrusted){if("clientX"in a){var d=a.target;var e=a.clientX;var f=a.clientY}else if("touches"in a){d=a.target;var g=a.changedTouches[0];if(!g)return;e=g.clientX;f=g.clientY}if(d&&"id"in d&&(g=a.view.document,e=cb.call(g,e,f))){var k=[],h=d;f=function(){if(l.T){if(!l.D)return!0;ib(h)}else if(l.D)k.push({D:l.D,ra:h});else return Na(),!1};a:{if(C){h=d;var l=fb(C.call(a));var m=f();if(!0===m)break a;else if(!1===m)return}m=C&&e[0]===d?1:0;for(d=e.length;m<
d;m++){h=e[m];l=hb(h);var T=f();if(!0===T)break a;else if(!1===T)return}}if(d=l.R)c&&(c.R=d),b===d&&bb();b=!0;a:if(0===k.length)b=!1;else for(d=g.defaultView,c=d.innerWidth,g=d.innerHeight,e=h.getBoundingClientRect(),h,f=0,d=k.length;f<d;f++){if(!Ia(k[f].ra)){b=!1;break a}m=h.getBoundingClientRect();T=m.left;var Qc=m.right,Rc=m.bottom;if(!(0===(e.top-m.top|0)&&0===(e.left-T|0)&&0===(e.bottom-Rc|0)&&0===(e.right-Qc|0)||Ka(e,c,g))){b=!1;break a}}if(b){b=0;for(d=k.length;b<d;b++)ib(k[b].D);d=kb.map(function(b){return a[b]});
lb(mb,d,h)}}}}:function(){},mb;function ob(a){var b=new pb(a);qb(a,1,b);a===v&&(mb=b)}function pb(a){this.b=a;this.a=!1}pb.prototype.K=function(a){var b=this.b.I.document.elementFromPoint(a[7],a[8]);lb(this,a,b)};function lb(a,b,c){if("IFRAME"===c.nodeName.toUpperCase()){var d=c.getBoundingClientRect();b[7]-=d.left;b[8]-=d.top;b[3]=null;rb(a.b,1,b,xa.call(c))}else sb(a,c)}function sb(a,b){a.a||(a.a=!0,setTimeout(function(){a.a=!1},100),b.click())}var kb="type canBubble cancelable view detail screenX screenY clientX clientY ctrlKey altKey shiftKey metaKey button relatedTarget".split(" ");var D="now"in performance?function(){return performance.timing.navigationStart+performance.now()}:Date.now;function tb(){var a=this;this.c=0;this.a=-1;this.f=function(){a.c=D();a.a=-1;var b=document.elementFromPoint(window.innerWidth>>1,window.innerHeight>>1);b&&"A"===b.nodeName.toUpperCase()&&Ja(b)&&ib(b)};this.b=!1;this.l=function(){if(a.b){var b=D()-a.c;-1===a.a&&(b>ub?a.f():a.a=setTimeout(function(){a.f()},ub-b))}};window.addEventListener("mousedown",function(b){b.isTrusted&&(a.b=!0,clearTimeout(a.g),a.g=setTimeout(function(){a.b=!1},vb))},!0);x&&(this.j=new x(this.l),this.j.observe(document.documentElement,
wb))}var ub=50,wb={childList:!0,subtree:!0},vb=200;window.addEventListener("DOMContentLoaded",function(){new tb});function xb(a,b,c){this.C=a;this.o=b;this.w=c;this.G=D()};function yb(a){this.a=E;this.ga=a}function zb(a,b,c,d,e,f){e=void 0===e?Ya:e;return Za(b,function(g,k){var h={},l=g.a;if("undefined"==typeof f||f(b,l,k))var m={ba:l,arguments:k,ea:h};g=e(g,k,h);m&&a.a.a(new xb(c,d,m),a.ga);return g})}function F(a,b,c,d,e){b.hasOwnProperty(c)&&(b[c]=zb(a,b[c],1,c,d,e))}
function G(a,b,c,d){var e=r(b,c);if(e&&e.get&&e.configurable){d=zb(a,e.get,2,c,d,void 0);var f;e.set&&(f=zb(a,e.set,3,c,void 0,void 0));q(b,c,{get:d,set:f,configurable:!0,enumerable:e.enumerable})}};var Ab=/^http/;function Bb(a){a=Cb(a);var b=Db(a);var c=b.protocol;if(Ab.test(c))c=b.href.slice(c.length+2),a=b.hostname;else{c=a;var d=a.indexOf(",");a=-1===d?a:a.slice(0,d)}return[c,a,b.href]}function Cb(a){"string"!==typeof a&&(a=a instanceof Object?String(a):"");return a}function Db(a){var b=document.createElement("a");b.href=a;""==b.host&&(b.href=b.href);return b};var Eb=[function(a,b){a=b[a][0];return 0==a.C&&200>D()-a.G&&(a=a.w.ba,null!==a.frameElement&&(b=a.performance.timing,a=b.fetchStart,b=b.responseEnd,0===a||a===b))?!1:!0},function(a,b){var c=b[a][b[a].length-1];a=c.G;if(1===c.C&&"open"===c.o&&Ca.test(Cb(c.w.arguments[0])))for(c=b.length;0<c--;)for(var d=b[c],e=d.length;0<e--;){var f=d[e];if(200<a-f.G)break;if("open"===f.o&&1===f.C&&f.w.ea.ia)return!1}return!0}],Fb=[function(a,b,c){var d=c.C,e=c.o;if(("assign"===e||"replace"===e)&&1===d||("location"===
e||"href"===e)&&3===d)for(e=c.w,d=String(e.arguments[0]),e=e.ba,d!==location.href||("location"!==c.o||Da(e))&&"[object Location]"===la.call(e)||bb(),a=b[a],b=a.length;b--;){e=a[b];if(200<c.G-e.G)break;(e=e.w.ea)&&e.ia&&e.R===d&&bb()}return!0}];function H(){this.events=[]}H.prototype.a=function(a,b){for(var c=Fb.length;c--;)Fb[c](b,this.events,a);var d=this.events[b];d.push(a);setTimeout(function(){d.splice(d.indexOf(a),1)},5E3)};
H.prototype.b=function(a){for(var b=Eb.length;b--;)if(!Eb[b](a,this.events))return!1;return!0};H.prototype.c=function(a){var b=this.events.push([])-1;this.a(new xb(0,void 0,{ba:a}),b);return b};var E=new H;;function Gb(){function a(a,b){return a?b?b.timeStamp-a.timeStamp:-1:1}function b(a){for(var b=a.length,c;!c||!c.currentTarget;){if(0===b)return;c=a[--b]}return c}function c(a){return function(b){a.push(b);setTimeout(d.bind(null,a,b))}}function d(a,b){b=a.indexOf(b);-1!=b&&a.splice(b,1)}var e=[],f=[],g=[];window.addEventListener("mousedown",c(e),!0);window.addEventListener("mouseup",c(f),!0);window.addEventListener("click",c(g),!0);this.a=function(){return[b(g),b(e),b(f)].sort(a)[0]}};function Hb(a){var b=this;this.c=a;this.a=new A;this.b=[];this.f=function(a,d){b.b.push(d[0]);try{return a.h(d)}finally{b.b.pop()}};this.g=function(a,d){var c=d[0];a=a.h(d);c&&"object"===typeof c&&!c[b.c.expando]&&("clientX"in c&&Ea(c)||"touches"in c)&&b.a.set(c,a);return a}}function Ib(){var a=window.jQuery||window.$;a="function"===typeof a&&"noConflict"in a&&"_data"in a?a:void 0;p(a)||-1!==I.indexOf(a)||(new A,I.push(a),Jb.set(a,Kb(new Hb(a))))}function Lb(a,b){var c=b[0];a.h(b);!0===c&&Ib()}
function Kb(a){var b=a.c;$a(b.event,"dispatch",a.f);$a(b.event,"fix",a.g);$a(b,"noConflict",Lb);return a}var I=[],Jb=new A;window.addEventListener("mousedown",Ib,!0);window.addEventListener("touchstart",Ib,!0);var Mb=!1;
if(!oa.call(window,"__REACT_DEVTOOLS_GLOBAL_HOOK__")){var Nb=0,Ob={renderers:new Map,supportsFiber:!0,inject:function(){return Nb++},onScheduleFiberRoot:function(){},onCommitFiberRoot:function(){},onCommitFiberUnmount:function(){}};q(Ob,"isDisabled",{get:function(){return Mb=!0},set:function(){}});q(window,"__REACT_DEVTOOLS_GLOBAL_HOOK__",{get:function(){var a=document.head?!1:(a=document.currentScript)?-1!==a.textContent.indexOf("^_^")?!0:!1:!1;if(!a)return Ob},set:function(){},configurable:!0})}
function Pb(){if(document.querySelector("[data-reactroot]")||document.querySelector("[data-reactid]")||Mb)return!0;var a=window.__REACT_DEVTOOLS_GLOBAL_HOOK__;if("object"!==typeof a)return!1;a=a._renderers;return"object"!==typeof a||null===a||0===na(a).length?!1:!0}var Qb=/^gtm_autoEvent/,Rb=/[\?&]l=([^&]*)(?:&|$)/;
function Sb(a,b){if(!Qb.test(b)||3!==a.eventPhase)return!1;a=document.querySelectorAll('script[src*="googletagmanager.com/gtm.js"]');b=a.length;if(0===b)return!1;for(;b--;){var c="dataLayer",d=Rb.exec(a[b].src);d&&(c=d[1]);if((c=window[c])&&(c=c[c.length-1])&&"gtm.linkClick"==c.event)return!0}return!1};var Tb="event"in window&&(!("documentMode"in document)||11===document.documentMode),Ub;Tb||(Ub=(new Gb).a);function Vb(){var a=window,b;if(Tb)for(b=a.event;!b;){var c=a.parent;if(c===a)break;a=c;try{b=a.event}catch(f){break}}else b=Ub();if(!b)try{for(var d=arguments.callee,e=new A;d.caller;){d=d.caller;if(e.has(d))throw null;e.set(d,!0)}d.arguments&&d.arguments[0]&&"target"in d.arguments[0]&&(b=d.arguments[0])}catch(f){}return b}
function Wb(a){if(a){if(!("clientX"in a&&Ea(a)||"touches"in a))return!0;var b=a.currentTarget;if(b)if(Ha(b)){var c=a.eventPhase;a:{var d=a.target;if("id"in d){var e=a.type;if((d=ia(d,'[jsaction*="'+e+':"]'))&&d.hasOwnProperty("__jsaction")&&d.__jsaction.hasOwnProperty(e)){e=d;break a}}e=void 0}if(e)return Ha(e)?!1:!0;if(1===c||2===c)return!1;a:{c=0;for(e=I.length;c<e;c++)if(d=Jb.get(I[c]),!p(d)){b:{var f=a,g=d.b;if(0!==g.length){var k=d.a.get(f);if(-1!==g.indexOf(f)||-1!==g.indexOf(k)){f=k;k=1;for(var h=
g.length;k<h;k++){var l=g[k],m=l.target;if(u(m))if(Ba(f.target,m))f=l&&"object"===typeof l&&!l[d.c.expando]?d.a.get(l):l;else break;else{if(Da(m)){d=m;break b}d=void 0;break b}}d=f.currentTarget;break b}}d=void 0}if(d){a=d;break a}}a=void 0}if(a){if(Ha(a)||"id"in a&&Ja(a))return!1}else if(!Pb()||u(b)&&"#DOCUMENT"!==b.nodeName.toUpperCase())return!1}else if("id"in b&&Ja(b))return!1}return!0};function J(a,b){b=b||{};for(var c in a){var d=r(a,c);if(d)switch(typeof d.value){case "undefined":break;case "object":b[c]={};break;case "function":b[c]=function(){return!0};break;default:b[c]=a[c]}}return b}var Xb=r(HTMLAnchorElement.prototype,"href");
function Yb(a,b,c){var d=J(window);J(Window.prototype,d);var e=J(document);J(Document.prototype,e);d.opener=window;d.closed=!1;d.name=b;d.document=e;e.open=function(){return this};e.write=function(){};e.writeln=function(){};e.close=function(){};var f=Zb(a,c);a={get:function(){return f},set:function(){},configurable:!0};q(d,K,a);q(e,K,a);G(c,d,K);G(c,e,K);return d}function Zb(a,b){a=Db(a);a[$b]=a[ac]=Xb.set;q(a,bc,Xb);F(b,a,$b);F(b,a,ac);G(b,a,bc);return a}
var K="location",$b="assign",ac="replace",bc="href";function cc(){this.a=0;this.c=function(a){for(var b=a.length;b--;){var c=a[b].addedNodes;if(c)for(var d=c.length;0<d--;){var e=c[d];if("id"in e&&(e=e.querySelectorAll(dc)))for(var f=e.length;0<f--;)e[f].removeAttribute("data")}}};x&&(this.b=new x(this.c))}function ec(){var a=fc;a.b&&0===a.a&&(a.b.observe(document.documentElement,gc),D(),a.a=D());setTimeout(function(){D();a.stop()},hc)}cc.prototype.stop=function(){this.b&&0!==this.a&&(this.b.disconnect(),this.a=0)};
var hc=500,dc='object[data^="data:application/pdf"]',gc={childList:!0,subtree:!0},fc=new cc;function ic(a,b,c){y.Z()||rb(v,0,{ta:y.domain,ua:a},v.parent);ec();b&&nb(b,a,c)}function jc(a){qb(a,0,a.pa?{K:function(a){y.aa(a.ta,a.ua)}}:new kc(a))}function kc(a){this.ha=a}kc.prototype.K=function(a){rb(this.ha,0,a,this.ha.parent)};function lc(a,b){function c(a,c,f){if(y.v())return a.h(c);var d=Bb(c[0]);if(y.v(d[1]))return a.h(c);var e=Vb();if((Wb(e)||Sb(e,c[1]))&&E.b(b.ga))return a=a.h(c);f.ia=!0;ic(d[2],e,f);return a=Yb(c[0],c[1],b)}F(b,a,"open",c);F(b,a.Window.prototype,"open",c)};function mc(a,b){var c=a.a;if("A"===c.nodeName.toUpperCase()){if(y.v())return a.h(b);c=Bb(c.href);if(y.v(c[1]))return a.h(b);var d=Vb();if(!Wb(d)){ic(c[2],d);return}}return a.h(b)};function nc(a,b){var c=a.a,d=b[0];if("clientX"in d&&Ea(d)&&u(c)&&"A"===c.nodeName.toUpperCase()&&!d.isTrusted){if(y.v())return a.h(b);d=Bb(c.href);if(y.v(d[1]))return a.h(b);var e=Vb();if(!Wb(e)){var f=e.target;if(!u(f)||!u(c)||!Ba(f,c))return ic(d[2],e),!1}}return a.h(b)}function oc(a,b,c){return"view"in c[0]};function pc(a,b,c){this.g=a;this.l=c;this.c=[];this.f=t.call(this.f,this);this.b=t.call(this.b,this);c=a.HTMLIFrameElement.prototype;this.a=new A;G(b,c,"contentWindow",this.b);G(b,c,"contentDocument",this.b);qc(this,a)}
function qc(a,b){ua&&(a.j||(a.j=new ua(function(b){for(var c=0,e=b.length;c<e;c++)for(var f=b[c].addedNodes,g=0,k=f.length;g<k;g++){var h=f[g];if("IFRAME"===h.nodeName.toUpperCase())rc(a,h);else if("id"in h){h=h.getElementsByTagName("IFRAME");for(var l=0,m=h.length;l<m;l++)rc(a,h[l])}}})),a.j.observe(b.document.documentElement,{childList:!0,subtree:!0}))}
function rc(a,b){var c=a.a.get(b);if(p(c)){b.addEventListener("load",a.f);try{var d=xa.call(b);if("about:"===d.location.protocol){a.a.set(b,d.document);sc(a,d);var e=b.src,f;if(f=e&&a.l){var g=a.g.location,k=a.g.document.domain,h=Db(e);f="javascript:"===h.protocol||"about:blank"===h.href?!0:"data:"===h.protocol?!1:h.hostname===k&&h.port===g.port&&h.protocol===g.protocol}f&&q(d,a.l,{value:void 0,configurable:!0})}}catch(l){a.a.set(b,null)}}}pc.prototype.b=function(a,b){rc(this,a.a);return a.h(b)};
function sc(a,b){a=a.c;for(var c=0,d=a.length;c<d;c++)a[c](b)}pc.prototype.f=function(a){a=a.target;try{var b=ya.call(a);"about:"===b.location.protocol&&this.a.get(a)!==b&&(this.a.set(a,b),sc(this,b.defaultView))}catch(c){this.a.set(a,null)}};function tc(a,b){var c=this;this.b=[];this.I=a;var d=this.c=Qa,e=this.parent=a.parent,f=this.pa=a.top===a;d&&(this.a=new WeakMap,a.addEventListener("message",function(a){if(a.data===uc){var b=za.call(a);p(b)||c.a.has(b)&&c.a.get(b).qa===b.location||L(c,b,a.ports[0]);a.stopImmediatePropagation();a.preventDefault()}}),b&&(d=new va,L(b,a,d.port1),L(this,b.I,d.port2)),f||b&&b.I===e||(a=new va,e.postMessage(uc,"*",[a.port1]),L(this,e,a.port2)))}
function L(a,b,c){c.onmessage=function(b){a.onMessage(b)};a.a.set(b,{sa:c,qa:b.location})}tc.prototype.onMessage=function(a){var b=a.data;a=za.call(a);var c=this.b[b.C];c&&c.K(b.w,a)};function qb(a,b,c){if(!p(a.b[b]))throw 2;a.b[b]=c}function rb(a,b,c,d){if(d===a.I){var e=a.b[b];e&&e.K(c,a.I)}a.c&&(a=a.a.get(d))&&a.sa.postMessage({C:b,w:c},void 0)}var uc="pb_handshake";var y=window[CONTENT_SCRIPT_KEY],vc=y.S();
(function(a,b){if(a.hasOwnProperty(b))delete a[b];else{var c=function(a){var e=a.Function.prototype;e.hasOwnProperty("toString")&&(e.toString=Va(e.toString,Ua));e.hasOwnProperty("toSource")&&(e.toSource=Va(e.toSource,Ua));e=E.c(a);e=new yb(e);lc(a,e);F(e,a.HTMLElement.prototype,"click",mc);F(e,(a.EventTarget||a.Node).prototype,"dispatchEvent",nc,oc);a=new pc(a,e,b);a.c.push(c);a.c.push(d)},d=function(a){a=new tc(a,v);jc(a);ob(a)};c(a);v=new tc(a);jc(v);ob(v)}})(window,vc);
};var Kd="__PB"+(1E9*Math.random()>>>0)+"__";Z.a?(Z.v=Z.v.bind(Z),Z.Z=Z.Z.bind(Z),Z.aa=Z.aa.bind(Z),unsafeWindow[Kd]=cloneInto(Z,unsafeWindow,{cloneFunctions:!0})):unsafeWindow[Kd]=Z;
var Ld="undefined"!==typeof unsafeWindow?unsafeWindow.window:window;if(Z.a){var Md=document.createElement("script");Md.textContent="("+popupBlocker.toString()+")(this,'"+Kd+"')";var Nd=document.body||document.head||document.documentElement;Nd.appendChild(Md);Nd.removeChild(Md)}else popupBlocker(Ld,Kd);var Od=location.href;
if("https://adguardteam.github.io/PopupBlocker/options.html"===Od||"https://popupblocker.adguard.com/options.html"===Od||"http://localhost:8000/options.html"===Od)document.title=yc.B("userscript_name")||"Adguard Popup Blocker",Ld.GM_getValue=exportFunction(GM_getValue,unsafeWindow),Ld.GM_setValue=exportFunction(GM_setValue,unsafeWindow),Ld.GM_listValues=exportFunction(GM_listValues,unsafeWindow),unsafeWindow.AdguardSettings=AdguardSettings;
