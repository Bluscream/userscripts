// ==UserScript==
// @author         Al_H
// @description    Add URL in tooltip to include more informaton
// @grant          none
// @include        *
// @name           Add URL in tooltip
// @version 0.0.1.20150211175457
// @namespace https://greasyfork.org/users/5117
// ==/UserScript==

for(var i=0;i<document.links.length;i++) {
    if(document.links[i]) document.links[i].title+=((document.links[i].title=='---')?'':'\n')+decodeURI(document.links[i].href);
}