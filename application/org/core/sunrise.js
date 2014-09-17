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
 * @param  {[type]} $sr
 * @return {[type]}
 */
(function($sr){
	
	var $rootScope = $sr.$rootScope = $sr.$rootScope || {};

	$rootScope.core = [
		'io', 
		'controls',
		'canvas', 
		'ressourceLoader',
		'util',
		'CoreObject',
		'Sprite',
		'Entity',
		'Stage'
		
	];

	//private functions
	$rootScope.functions = {};

 	_seal = $sr._seal = $sr._seal || function () {
		delete $sr.$rootScope;
		delete $sr._seal;
		delete $sr._unseal;
	},
	_unseal = $sr._unseal = $sr._unseal || function () {
		$sr.$rootScope = $rootScope;
		$sr._seal = _seal;
		$sr._unseal = _unseal;
	};


	/**
	 * To check if a parameter is a function
	 * @param  {[expect: function]}  function to check 
	 * @return {true if parameter is a function}
	 */
	$sr.isFunction = function(functionToCheck) {
	 	var getType = {};
	 	return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
	};

	$sr.sunrise = function(){
		$sr._seal();
		$sr.initCanvas();
		$sr.loadImages(game.config.images, function(){
			game.init($rootScope.$scope);
			$sr.run();	
		});
	};


	$sr.run = function(){
		$rootScope.clearCanvas();
		game.run($rootScope.$scope);
		$rootScope.drawStage();
		$rootScope.animationFrame.call(window, $sr.run);
	};

	$sr.fps = {
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
	};

		
	var init = function(){
		$rootScope.animationFrame = 	window.requestAnimationFrame       ||
					          			window.webkitRequestAnimationFrame ||
					          			window.mozRequestAnimationFrame    ||
					          			function( callback ){
					            			window.setTimeout(callback, 1000 / 60);
					          			};
		$rootScope.$scope = {};
	}


	$rootScope.dom = document.querySelector('div[sunriseJS-app]');
	if($rootScope.dom != undefined){
		init();
	}
	else {
		alert('no jsengine-app found');
	}


})($sr = window.$sr = window.$sr || {});



