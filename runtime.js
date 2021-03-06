﻿// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

/*
//cranberrygame start: structure
cr.plugins_.AdsIndy = function(runtime)
{
	this.runtime = runtime;
	Type
		onCreate
	Instance
		onCreate
		draw
		drawGL		
	cnds
		//MyCondition
		//TriggerCondition
	acts
		//MyAction
		//TriggerAction
	exps
		//MyExpression
};		
//cranberrygame end: structure
*/

/////////////////////////////////////
// Plugin class
// *** CHANGE THE PLUGIN ID HERE *** - must match the "id" property in edittime.js
//          vvvvvvvv
cr.plugins_.AdsIndy = function(runtime)
{
	this.runtime = runtime;
};

(function ()
{
	/////////////////////////////////////
	// *** CHANGE THE PLUGIN ID HERE *** - must match the "id" property in edittime.js
	//                            vvvvvvvv
	var pluginProto = cr.plugins_.AdsIndy.prototype;
		
	/////////////////////////////////////
	// Object type class
	pluginProto.Type = function(plugin)
	{
		this.plugin = plugin;
		this.runtime = plugin.runtime;
	};

	var typeProto = pluginProto.Type.prototype;

/*
	//for example
	var fbAppID = "";
	var fbAppSecret = "";
*/
//cranberrygame start
//cranberrygame end
	
	// called on startup for each object type
	typeProto.onCreate = function()
	{
		
/*			
		//cranberrygame
		var newScriptTag=document.createElement('script');
		newScriptTag.setAttribute("type","text/javascript");
		newScriptTag.setAttribute("src", "mylib.js");
		document.getElementsByTagName("head")[0].appendChild(newScriptTag);
		//cranberrygame
		var scripts=document.getElementsByTagName("script");
		var scriptExist=false;
		for(var i=0;i<scripts.length;i++){
			//alert(scripts[i].src);//http://localhost:50000/jquery-2.0.0.min.js
			if(scripts[i].src.indexOf("cordova.js")!=-1||scripts[i].src.indexOf("phonegap.js")!=-1){
				scriptExist=true;
				break;
			}
		}
		if(!scriptExist){
			var newScriptTag=document.createElement("script");
			newScriptTag.setAttribute("type","text/javascript");
			newScriptTag.setAttribute("src", "cordova.js");
			document.getElementsByTagName("head")[0].appendChild(newScriptTag);
		}
*/		
//cranberrygame start
		if(this.runtime.isBlackberry10 || this.runtime.isWindows8App || this.runtime.isWindowsPhone8 || this.runtime.isWindowsPhone81){
			var scripts=document.getElementsByTagName("script");
			var scriptExist=false;
			for(var i=0;i<scripts.length;i++){
				//alert(scripts[i].src);//http://localhost:50000/jquery-2.0.0.min.js
				if(scripts[i].src.indexOf("cordova.js")!=-1||scripts[i].src.indexOf("phonegap.js")!=-1){
					scriptExist=true;
					break;
				}
			}
			if(!scriptExist){
				var newScriptTag=document.createElement("script");
				newScriptTag.setAttribute("type","text/javascript");
				newScriptTag.setAttribute("src", "cordova.js");
				document.getElementsByTagName("head")[0].appendChild(newScriptTag);
			}
		}
//cranberrygame end		
	};

	/////////////////////////////////////
	// Instance class
	pluginProto.Instance = function(type)
	{
		this.type = type;
		this.runtime = type.runtime;
		
		// any other properties you need, e.g...
		// this.myValue = 0;
	};
	
	var instanceProto = pluginProto.Instance.prototype;

	// called whenever an instance is created
	instanceProto.onCreate = function()
	{
		// note the object is sealed after this call; ensure any properties you'll ever need are set on the object
		// e.g...
		// this.myValue = 0;
		
/*
		var self=this;
		window.addEventListener("resize", function () {//cranberrygame
			self.runtime.trigger(cr.plugins_.AdsIndy.prototype.cnds.TriggerCondition, self);
		});
*/
//cranberrygame start
		if (!(this.runtime.isAndroid || this.runtime.isiOS || this.runtime.isWindowsPhone8 || this.runtime.isWindowsPhone81))
			return;
			
		this.adUnit = "";		
		this.adUnitFullScreen = "";		
		if (this.runtime.isAndroid){
			this.adUnit = this.properties[0];
			this.adUnitFullScreen = this.properties[1];
		}
		else if (this.runtime.isiOS){
			this.adUnit = this.properties[2];
			this.adUnitFullScreen = this.properties[3];
		}
		else if (this.runtime.isWindowsPhone8 || this.runtime.isWindowsPhone81){		
			this.adUnit = this.properties[4];
			this.adUnitFullScreen = this.properties[5];
		}
		this.isOverlap = this.properties[6]==0?false:true;
		this.isTest = this.properties[7]==0?false:true;
				
		var self = this;		

		if (typeof window["admob"] != 'undefined') {
			window["admob"]["setUp"](self.adUnit, self.adUnitFullScreen, self.isOverlap, self.isTest);
			
			//
			window['admob']['onFullScreenAdLoaded'] = function() {
				self.runtime.trigger(cr.plugins_.AdsIndy.prototype.cnds.OnFullScreenAdLoaded, self);
			};
			window['admob']['onFullScreenAdPreloaded'] = function() {
				self.runtime.trigger(cr.plugins_.AdsIndy.prototype.cnds.OnFullScreenAdPreloaded, self);
			};			
			window['admob']['onFullScreenAdShown'] = function() {
				self.runtime.trigger(cr.plugins_.AdsIndy.prototype.cnds.OnFullScreenAdShown, self);
			};			
			window['admob']['onFullScreenAdHidden'] = function() {
				self.runtime.trigger(cr.plugins_.AdsIndy.prototype.cnds.OnFullScreenAdHidden, self);
			};
			//			
			window['admob']['onBannerAdLoaded'] = function() {
				self.runtime.trigger(cr.plugins_.AdsIndy.prototype.cnds.OnBannerAdLoaded, self);
			};			
			window['admob']['onBannerAdPreloaded'] = function() {
				self.runtime.trigger(cr.plugins_.AdsIndy.prototype.cnds.OnBannerAdPreloaded, self);
			};			
		}
		//for wp8: On start of layout
		else {
			setTimeout(function(){
				if (typeof window["admob"] == 'undefined')//
					return;
			
				window["admob"]["setUp"](self.adUnit, self.adUnitFullScreen, self.isOverlap, self.isTest);
				
				//
				window['admob']['onFullScreenAdLoaded'] = function() {
					self.runtime.trigger(cr.plugins_.AdsIndy.prototype.cnds.OnFullScreenAdLoaded, self);
				};
				window['admob']['onFullScreenAdPreloaded'] = function() {
					self.runtime.trigger(cr.plugins_.AdsIndy.prototype.cnds.OnFullScreenAdPreloaded, self);
				};			
				window['admob']['onFullScreenAdShown'] = function() {
					self.runtime.trigger(cr.plugins_.AdsIndy.prototype.cnds.OnFullScreenAdShown, self);
				};			
				window['admob']['onFullScreenAdHidden'] = function() {
					self.runtime.trigger(cr.plugins_.AdsIndy.prototype.cnds.OnFullScreenAdHidden, self);
				};
				//			
				window['admob']['onBannerAdLoaded'] = function() {
					self.runtime.trigger(cr.plugins_.AdsIndy.prototype.cnds.OnBannerAdLoaded, self);
				};			
				window['admob']['onBannerAdPreloaded'] = function() {
					self.runtime.trigger(cr.plugins_.AdsIndy.prototype.cnds.OnBannerAdPreloaded, self);
				};
			},600);				
		}
//cranberrygame end			
	};
	
	// only called if a layout object - draw to a canvas 2D context
	instanceProto.draw = function(ctx)
	{
	};
	
	// only called if a layout object in WebGL mode - draw to the WebGL context
	// 'glw' is not a WebGL context, it's a wrapper - you can find its methods in GLWrap.js in the install
	// directory or just copy what other plugins do.
	instanceProto.drawGL = function (glw)
	{
	};

/*
	instanceProto.at = function (x)
	{
		return this.arr[x];
	};
	
	instanceProto.set = function (x, val)
	{
		this.arr[x] = val;
	};
*/	
//cranberrygame start
//cranberrygame end	
	
	//////////////////////////////////////
	// Conditions
	function Cnds() {};

/*
	// the example condition
	Cnds.prototype.MyCondition = function (myparam)
	{
		// return true if number is positive
		return myparam >= 0;
	};

	//cranberrygame
	Cnds.prototype.TriggerCondition = function ()
	{
		return true;
	};
*/
	
//cranberrygame start
	Cnds.prototype.OnFullScreenAdLoaded = function ()
	{
		return true;
	};
	Cnds.prototype.OnFullScreenAdPreloaded = function ()
	{
		return true;
	};
	Cnds.prototype.OnFullScreenAdShown = function ()
	{
		return true;
	};
	Cnds.prototype.OnFullScreenAdHidden = function ()
	{
		return true;
	};
	Cnds.prototype.OnBannerAdLoaded = function ()
	{
		return true;
	};
	Cnds.prototype.OnBannerAdPreloaded = function ()
	{
		return true;
	};
//cranberrygame end
	
	// ... other conditions here ...
	
	pluginProto.cnds = new Cnds();
	
	//////////////////////////////////////
	// Actions
	function Acts() {};

/*
	// the example action
	Acts.prototype.MyAction = function (myparam)
	{
		// alert the message
		alert(myparam);
	};
	
	//cranberrygame
	Acts.prototype.TriggerAction = function ()
	{
		var self=this;		
		self.runtime.trigger(cr.plugins_.AdsIndy.prototype.cnds.TriggerCondition, self);		
	};	
*/
	
//cranberrygame start
	Acts.prototype.PreloadBannerAd = function ()
	{
		if (!(this.runtime.isAndroid || this.runtime.isiOS || this.runtime.isWindowsPhone8 || this.runtime.isWindowsPhone81))
			return;
        if (typeof window["admob"] == 'undefined')
            return;
			
		window["admob"]["preloadBannerAd"]();	
	}
	Acts.prototype.ShowBannerAd = function (position, size)
	{
		if (!(this.runtime.isAndroid || this.runtime.isiOS || this.runtime.isWindowsPhone8 || this.runtime.isWindowsPhone81))
			return;
        if (typeof window["admob"] == 'undefined')
            return;
			
		var positionStr = "top-center";
		if (position==0)
			positionStr = "top-left";
		else if (position==1)
			positionStr = "top-center";
		else if (position==2)
			positionStr = "top-right";
		else if (position==3)
			positionStr = "left";
		else if (position==4)
			positionStr = "center";
		else if (position==5)
			positionStr = "right";
		else if (position==6)
			positionStr = "bottom-left";
		else if (position==7)
			positionStr = "bottom-center";
		else if (position==8)
			positionStr = "bottom-right";
	
		var sizeStr = "BANNER";
		if (size==0)
			sizeStr = "BANNER";
		else if (size==1)
			sizeStr = "LARGE_BANNER";
		else if (size==2)
			sizeStr = "MEDIUM_RECTANGLE";
		else if (size==3)
			sizeStr = "FULL_BANNER";
		else if (size==4)
			sizeStr = "LEADERBOARD";
		else if (size==5)
			sizeStr = "SKYSCRAPER";
		else if (size==6)
			sizeStr = "SMART_BANNER";
					
		window["admob"]["showBannerAd"](positionStr, sizeStr);		
	};
	Acts.prototype.HideBannerAd = function ()
	{
		if (!(this.runtime.isAndroid || this.runtime.isiOS || this.runtime.isWindowsPhone8 || this.runtime.isWindowsPhone81))
			return;
        if (typeof window["admob"] == 'undefined')
            return;
			
		window["admob"]["hideBannerAd"]();		
	};	
	Acts.prototype.ReloadBannerAd = function ()
	{
		if (!(this.runtime.isAndroid || this.runtime.isiOS || this.runtime.isWindowsPhone8 || this.runtime.isWindowsPhone81))
			return;
        if (typeof window["admob"] == 'undefined')
            return;
			
		window["admob"]["reloadBannerAd"]();		
	}
	Acts.prototype.PreloadFullScreenAd = function ()
	{
		if (!(this.runtime.isAndroid || this.runtime.isiOS || this.runtime.isWindowsPhone8 || this.runtime.isWindowsPhone81))
			return;
        if (typeof window["admob"] == 'undefined')
            return;
			
		window["admob"]["preloadFullScreenAd"]();		
	}
	Acts.prototype.ShowFullScreenAd = function ()
	{
		if (!(this.runtime.isAndroid || this.runtime.isiOS || this.runtime.isWindowsPhone8 || this.runtime.isWindowsPhone81))
			return;
        if (typeof window["admob"] == 'undefined')
            return;
			
		window["admob"]["showFullScreenAd"]();		
	};
	Acts.prototype.ReloadFullScreenAd = function ()
	{
		if (!(this.runtime.isAndroid || this.runtime.isiOS || this.runtime.isWindowsPhone8 || this.runtime.isWindowsPhone81))
			return;
        if (typeof window["admob"] == 'undefined')
            return;
			
		window["admob"]["reloadFullScreenAd"]();	
	}
//cranberrygame end
	
	// ... other actions here ...
	
	pluginProto.acts = new Acts();
	
	//////////////////////////////////////
	// Expressions
	function Exps() {};
	
/*	
	// the example expression
	Exps.prototype.MyExpression = function (ret)	// 'ret' must always be the first parameter - always return the expression's result through it!
	{
		ret.set_int(1337);				// return our value
		// ret.set_float(0.5);			// for returning floats
		// ret.set_string("Hello");		// for ef_return_string
		// ret.set_any("woo");			// for ef_return_any, accepts either a number or string
	};
	
	Exps.prototype.Text = function (ret, param) //cranberrygame
	{     
		ret.set_string("Hello");		// for ef_return_string
		//ret.set_int(1337);				// return our value
		// ret.set_float(0.5);			// for returning floats
		// ret.set_string("Hello");		// for ef_return_string
		// ret.set_any("woo");			// for ef_return_any, accepts either a number or string		
	};			
*/
	
//cranberrygame start
//cranberrygame end
	
	// ... other expressions here ...
	
	pluginProto.exps = new Exps();

}());