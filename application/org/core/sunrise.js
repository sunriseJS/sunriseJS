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
	
	var _private = sr._private = sr._private || {};
	_private.data = {};

	_seal = sr._seal = sr._seal || function () {
		delete sr._private;
		delete sr._seal;
		delete sr._unseal;
	},
	_unseal = sr._unseal = sr._unseal || function () {
		sr._private = _private;
		sr._seal = _seal;
		sr._unseal = _unseal;
	};

	/**
	 *
	 * Loading a script asynchronous into the application and can run a callback after the files is fully loaded
	 * 
	 * @param  {[type]}   src
	 * @param  {Function} callback
	 * @return {[type]}
	 */
	sr.loadScript = function(src, callback) {
	    var s = document.createElement('script');
	    s.type = 'text/javascript';
	    s.src = src;
	    s.async = false;
	    s.onload = callback;        
	    document.body.appendChild(s);
	}

	sr.sunrise = function(){
		sr._seal();
		sr.initCanvas();
		sr.run();
		game.init(_private.data.game);
	}


	sr.run = function(){
		sr.clearCanvas();
		game.run(_private.data.game);
		_private.data.animationFrame.call(window, sr.run);
	}



	sr.fps = {
		startTime : 0,
		frameNumber : 0,
		getFps : function(){
			this.frameNumber++;
			var d = new Date().getTime(),
				currentTime = ( d - this.startTime ) / 1000,
				result = Math.floor( ( this.frameNumber / currentTime ) );
			if( currentTime > 1 ){
				this.startTime = new Date().getTime();
				this.frameNumber = 0;
			}
			return result;
		}	
	}

	init = function(){
		// sr.loadScript("application/org/core/test.js");
		sr.loadScript('application/org/core/spriteManager.js');
		sr.loadScript('application/org/core/canvas.js', sr.sunrise);


		_private.data.animationFrame = 	window.requestAnimationFrame       ||
					          			window.webkitRequestAnimationFrame ||
					          			window.mozRequestAnimationFrame    ||
					          			function( callback ){
					            			window.setTimeout(callback, 1000 / 60);
					          			};
					          			
		_private.data.game = {};
	}


	_private.data.dom = document.querySelector('div[sunriseJS-app]');
	if(sr._private.data.dom != undefined){
		init();
	}
	else {
		alert('no jsengine-app found');
	}


})(sr = window.sr = window.sr || {});


