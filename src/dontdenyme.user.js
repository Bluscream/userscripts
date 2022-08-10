// ==UserScript==
// @name            Don't Deny Me!
// @namespace       http://blog.monstuff.com/archives/cat_greasemonkey.html
// @description     Removes bad attributes.
// @include         http://*
// @include         https://*
// ==/UserScript==

function checkforJQuery(){
    if((typeof jQuery != 'undefined') || (typeof $ != 'undefined')){
        execJQuery( document ).ready(function() {
            gogopowerrangers();
        });
    } else {
        var s=document.createElement('script');
        s.setAttribute('src','https://code.jquery.com/jquery-2.2.0.min.js');
        document.getElementsByTagName('body')[0].appendChild(s);
        waitforJQuery();
    }
}
function waitforJQuery(){
    if((typeof jQuery != 'undefined') || (typeof $ != 'undefined')){
        execJQuery( document ).ready(function() {
            gogopowerrangers();
        });
    }else{
        window.jQuery = true;
        window.setTimeout(waitforJQuery,100);
    }
}
function execJQuery(code){
    try {
       JQuery(code);
    } catch(err) {
       $(code);
    }
}
function gogopowerrangers(){
    ats();
    enableForms();
    enableButtons();
    enableInputs();
}
var allowAutoComplete = function(element) {
    var iAttrCount = element.attributes.length;
    for (var i = 0; i < iAttrCount; i++) {
        var oAttr = element.attributes[i];
        if (oAttr.name == 'autocomplete') {
            oAttr.value = 'on';
            break;
        }
    }
};
function ats(){
    var styles='*,p,div{user-select:text !important;-moz-user-select:text !important;-webkit-user-select:text !important;}';
    execJQuery('head').append(execJQuery('<style />').html(styles));
    var allowNormal=function(){ return true; };
    execJQuery('*[onselectstart], *[ondragstart], *[oncontextmenu], #songLyricsDiv').unbind('contextmenu').unbind('selectstart').unbind('dragstart').unbind('mousedown').unbind('mouseup').unbind('click').attr('onselectstart',allowNormal).attr('oncontextmenu',allowNormal).attr('ondragstart',allowNormal);
}
function enableForms() {
    var forms = execJQuery('form');
    for (var i = 0; i < forms.length; i++)
    {
        var form = forms[i];
        var elements = form.elements;

        allowAutoComplete(form);

        for (var j = 0; j < elements.length; j++)
        {
            allowAutoComplete(elements[j]);
        }
    }
}
function enableButtons() {
    var buttons = execJQuery('button');
    for (var i = 0; i < buttons.length; i++)
    {
        buttons[i].removeAttr('disabled');
    }
}
function enableInputs() {
    var inputs = execJQuery('input');
    for (var i = 0; i < inputs.length; i++)
    {
        inputs[i].removeAttr('type');
    }
}
checkforJQuery();

// @originalURL	https://gist.github.com/b89ff22f6e74728a0aa0#file-dontdenyme-user-js