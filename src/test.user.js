// ==UserScript==
// @name       lol
// @namespace  http://www.facebook.com/
// @version    0.1
// @description  enter something useful
// @match    http://orteil.dashnet.org/experiments/cookie/*
// @copyright  2012+, You
// ==/UserScript==

function createJazBuyable() {
	//console.log(typeof Buyable === "undefined")
	if (typeof Buyable === "undefined") {
		setTimeout(function(){ createJazBuyable(); }, 500);
		
	} else {
		new Buyable('Jarrod','Poops out cookies at an alarming rate','https://fbcdn-sphotos-e-a.akamaihd.net/hphotos-ak-ash4/309380_515131125175551_507684944_n.jpg',1500000/**/,function(buy)
		{
			if (buy) Jarrods++;
			//if (buy && Jarrods==1) Buyables['Grandma'].func();
			var str='';
			for (var i=0;i<Jarrods;i++)
			{
				var x=Math.floor(Math.random()*20+(i%10)*24);
				var y=Math.floor(Math.random()*20+Math.floor(i/10)*24);
				str+='<div class="jarrod" style="right:'+x+'px;top:'+y+'px;"></div>';
			}
			l('jarrods').innerHTML=str;
			if (Jarrods >= 5) {
				l('jarrods').innerHTML+='<canvas id="demJar" class="demonjarrod" width="200" height="200" style="right:0px;top:0px;"></canvas>'
				
				var context = l('demJar').getContext('2d');
				context.beginPath();
				context.arc(96, 94, 3, 0, 2 * Math.PI, false);
				context.fillStyle = 'red';
				context.fill();
				context.beginPath();
				context.arc(59, 97, 3, 0, 2 * Math.PI, false);
				context.fillStyle = 'red';
				context.fill();
				context.font='28px Arial';
				context.fillText("I EAT ALL",40,160)
				context.fillText("YOUR COOKIE",0,190)
				
				AddCookie=function(howmany,el)
				{
					Cookies-=howmany;
					if (el && Pops.length<250 && NumbersOn) new Pop(el,'-'+howmany);
				}
			}
		});
		
		Jarrods = 0;
		var jazdiv = document.createElement('div'); 
		jazdiv.id = 'jarrods';
		l('middle').appendChild(jazdiv);
		
		var oldMain = Main;
		Main = function(){
			//if(T%150==0) console.log('5secs');
			oldMain();
			
			if (Jarrods && T%Math.ceil(150/Jarrods)==0) AddCookie(9999,'jarrods');
			var cps=parseFloat(l('cps').innerHTML.split(': ')[1].replace(',','')) + Jarrods*9999/5;
			if(Jarrods >= 5) cps = -cps;
			var floater=Math.round(cps*10-Math.floor(cps)*10)
			var cpsneg = cps < 0 ? true : false;
			cps=(cpsneg?'-':'')+Beautify(cpsneg?(-cps):cps)+(floater?('.'+floater):'');
			l('cps').innerHTML='cookies/second : '+ cps
			
			if(CookiesDisplay<0) {
				l('money').innerHTML='-'+Beautify(Math.round(-CookiesDisplay));
			}
		}
		
		var oldRebuildStore = RebuildStore;
		RebuildStore = function() {
			oldRebuildStore();
			
			if (Jarrods > 0) {
				var jazAmt = document.createElement('div')
				jazAmt.className = "amount"
				jazAmt.appendChild(document.createTextNode(Jarrods))
				l('buyJarrod').appendChild(jazAmt)
			}
		}
		
		var oldMakeSaveString = MakeSaveString;
		MakeSaveString = function() {
			var str = ''
			str = oldMakeSaveString();
			
			str += '|j' + parseInt(Jarrods) + '|j' + parseInt(Buyables['Jarrod'].price);
			
			return str;
		}
		
		var oldLoadResponse = LoadResponse;
		LoadResponse = function(response) {
			var r=response.split('|');
			if (response!='0' && response) {
				if(r[r.length-2].slice(0,1)=='j')
					Jarrods=Math.min(1000,parseInt(r[r.length-2].slice(1)));
				if(r[r.length-1].slice(0,1)=='j')
					Buyables['Jarrod'].price=parseInt(r[r.length-1].slice(1));
				
				Buyables['Jarrod'].func(0);
			}
			oldLoadResponse(response);
		}
		Load();
		
		var oldImportResponse = ImportResponse;
		ImportResponse = function(response) {
			var r=response.split('|');
			if (response!='0' && response) {
				if(r[r.length-2].slice(0,1)=='j')
					Jarrods=Math.min(1000,parseInt(r[r.length-2].slice(1)));
				if(r[r.length-1].slice(0,1)=='j')
					Buyables['Jarrod'].price=parseInt(r[r.length-1].slice(1));
				
				Buyables['Jarrod'].func(0);
			}
			oldImportResponse(response);
		}
	}
}

injectScript(createJazBuyable);	
injectStyle(' \
#store>div \
{ background-size: 64px; } \
#jarrods { \
	position: absolute; \
	left: -40px; \
	width: 240px; \
	top: 300px; \
} \
.jarrod \
{ \
	position:absolute; \
	background:url("https://fbcdn-sphotos-e-a.akamaihd.net/hphotos-ak-ash4/309380_515131125175551_507684944_n.jpg"); \
	width:48px; \
	height:48px; \
	background-size:48px \
} \
.demonjarrod \
{ \
	position:absolute; \
	background:url("https://fbcdn-sphotos-e-a.akamaihd.net/hphotos-ak-ash4/309380_515131125175551_507684944_n.jpg"); \
	background-size:200px \
} \
');

	
	
function injectStyle(source)
{
    var elem = document.createElement("style");
    elem.type = "text/css";
    elem.innerHTML = source;
    return document.head.appendChild(elem);
}
////////////////////////////////////////////////////////////////////////////////////////////
// Copyright(C) 2010 Abdullah Ali, voodooattack@hotmail.com//
////////////////////////////////////////////////////////////////////////////////////////////
// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php      
////////////////////////////////////////////////////////////////////////////////////////////
 
// Injects a script into the DOM, the new script gets executed in the original page's
// context instead of the active content-script context.
//
//    Parameters:
//            source: [string/function]
//            (2..n): Function arguments if a function was passed as the first parameter.
 
 
function injectScript(source)
{
     
    // Utilities
    var isFunction = function (arg) { 
        return (Object.prototype.toString.call(arg) == "[object Function]"); 
    };
     
    var jsEscape = function (str) { 
        // Replaces quotes with numerical escape sequences to
        // avoid single-quote-double-quote-hell, also helps by escaping HTML special chars.
        if (!str || !str.length) return str;
        // use \W in the square brackets if you have trouble with any values.
        var r = /['"<>\/]/g, result = "", l = 0, c; 
        do{    c = r.exec(str);
            result += (c ? (str.substring(l, r.lastIndex-1) + "\\x" + 
                c[0].charCodeAt(0).toString(16)) : (str.substring(l)));
        } while (c && ((l = r.lastIndex) > 0))
        return (result.length ? result : str);
    };
 
    var bFunction = isFunction(source);
    var elem = document.createElement("script");    // create the new script element.
    var script, ret, id = "";
 
    if (bFunction)
    {
        // We're dealing with a function, prepare the arguments.
        var args = [];
 
        for (var i = 1; i < arguments.length; i++)
        {
            var raw = arguments[i];
            var arg;
 
            if (isFunction(raw))    // argument is a function.
                arg = "eval(\"" + jsEscape("(" + raw.toString() + ")") + "\")";
            else if (Object.prototype.toString.call(raw) == '[object Date]') // Date
                arg = "(new Date(" + raw.getTime().toString() + "))";
            else if (Object.prototype.toString.call(raw) == '[object RegExp]') // RegExp
                arg = "(new RegExp(" + raw.toString() + "))";
            else if (typeof raw === 'string' || typeof raw === 'object') // String or another object
                arg = "JSON.parse(\"" + jsEscape(JSON.stringify(raw)) + "\")";
            else
                arg = raw.toString(); // Anything else number/boolean
 
            args.push(arg);    // push the new argument on the list
        }
 
        // generate a random id string for the script block
        while (id.length < 16) id += String.fromCharCode(((!id.length || Math.random() > 0.5) ?
            0x61 + Math.floor(Math.random() * 0x19) : 0x30 + Math.floor(Math.random() * 0x9 )));
 
        // build the final script string, wrapping the original in a boot-strapper/proxy:
        script = "(function(){var value={callResult: null, throwValue: false};try{value.callResult=(("+
            source.toString()+")("+args.join()+"));}catch(e){value.throwValue=true;value.callResult=e;};"+
            "document.getElementById('"+id+"').innerText=JSON.stringify(value);})();";
 
        elem.id = id;
    }
    else // plain string, just copy it over.
    {
        script = source;
    }
 
    elem.type = "text/javascript";
    elem.innerHTML = script;
 
    // insert the element into the DOM (it starts to execute instantly)
    document.head.appendChild(elem);
 
    if (bFunction)
    {
        // get the return value from our function:
        ret = JSON.parse(elem.innerText);
 
        // remove the now-useless clutter.
        elem.parentNode.removeChild(elem);
 
        // make sure the garbage collector picks it instantly. (and hope it does)
        delete (elem);
 
        // see if our returned value was thrown or not
        if (ret.throwValue)
            throw (ret.callResult);
        else
            return (ret.callResult);
    }
    else // plain text insertion, return the new script element.
        return (elem);
}