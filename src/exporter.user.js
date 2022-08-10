// ==UserScript==
// @name Cookie/LocalStorage Export/Import
// @namespace github.com/bluscream
// @version 1
// @description No Description Yet
// @author Bluscream
// @encoding utf-8
// @license GNU GPL v3
// @include http://*
// @include https://*
// @grant none
// @locale en
// @run-at document-start
// @require https://code.jquery.com/jquery-latest.min.js
// @downloadURL https://gist.githubusercontent.com/Bluscream/d6012847585326895f3660f82dff3c7a/raw
// @updateURL https://gist.githubusercontent.com/Bluscream/d6012847585326895f3660f82dff3c7a/raw
// ==/UserScript==
//"use strict";
var functions = "    window.export_cookies = function() {"+
"        var cookieData = document.cookie.split(';').map(function (c) {"+
"            var i = c.indexOf('=');"+
"            return [c.substring(0, i), c.substring(i + 1)];"+
"        });"+
"        cookieData = JSON.stringify(JSON.stringify(cookieData));"+
"        console.log(cookieData);"+
"        //copy(cookieData);"+
"    };"+
"    window.import_cookies = function(json_string) {"+
"        var cookieData = JSON.parse(json_string);"+
"        cookieData.forEach(function (arr) {"+
"            document.cookie = arr[0] + '=' + arr[1];"+
"        });"+
"    };"+
"    window.export_localstorage = function() {"+
"        var localstorage = JSON.stringify(JSON.stringify(localStorage));"+
"        console.log(localstorage);"+
"        //copy(localstorage);"+
"    };"+
"    window.import_localstorage = function(json_string) {"+
"        var data = JSON.parse(json_string);"+
"        Object.keys(data).forEach(function (k) {"+
"            localStorage.setItem(k, data[k]);"+
"        });"+
"    };";
$(document).ready(function () {
    var scriptElem = document.createElement('script');
    scriptElem.setAttribute("type", "text/javascript");
    scriptElem.innerHTML = functions;
    document.head.appendChild(scriptElem);
});

// @originalURL	https://gist.github.com/d6012847585326895f3660f82dff3c7a#file-exporter-user-js