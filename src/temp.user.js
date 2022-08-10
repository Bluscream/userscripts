// ==UserScript==
// @name        Activescrolling
// @namespace   bluscream
// @description None
// @match       *://truckersmp.com/*
// @version     1.9
// @grant       none
// ==/UserScript==
(function() {
	"use strict";
	function KeyPress(e) {
	  var evtobj = window.event? event : e
	  if (evtobj.keyCode == 90) {
		window.scrollBy(0, 100) 
	  }
	  if (evtobj.keyCode == 65) {
		window.scrollBy(0, -100) 
	  }
	}
	document.onkeydown = KeyPress;
	document.body.style.overflow = "visible !important";
	for (div=0; div < document.querySelectorAll('div').length; div++) {
    document.querySelectorAll('div')[div].style.overflow = "auto";
	};
	window.onmousewheel = document.onmousewheel = null
	window.ontouchmove = null 
	window.onwheel = null 
}());
