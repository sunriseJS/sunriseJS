/**
 * @license sunriseJS Game Engine
 * @copyright (C) 2014 - 2014 Jonas Gerdes, Jonathan Wiemers
 * http://www.sunrisejs.net
 *
 * sunriseJS is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license.php
 *
 *
 * 
 * @param  {[type]} sr
 * @return {[type]}
 */
(function(sr){	
	var _private = sr._private;

	/**
	 * Initialising the canvas as a child of the sunriseJS-app element 
	 * with the data the user specified in the config area.
	 * @return {[type]}
	 */
	sr.initCanvas = function(){
		screenWidth = game.config.screenWidth;
		screenHeight = game.config.screenHeight;
		var canvas = document.createElement('canvas');
		canvas.id     = "sunriseJS-screen";
		canvas.width  = game.config.screenWidth;;
		canvas.height = game.config.screenHeight;
		_private.data.dom.appendChild(canvas);
		_private.data.canvas = canvas;
		_private.data.canvas.context = canvas.getContext("2d");
	}


	sr.strokeRect = function(x,y,width,height){
		_private.data.canvas.context.strokeRect(x, y, width, height);
	}
	
})(window.sr = window.sr || {});