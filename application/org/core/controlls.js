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
(function($sr){	
	var $rootScope = $sr.$rootScope;
	$sr.controlls = {};

	$sr.controlls.key = function(key, callback){

	}

	$sr.handleKeyDown = function(event){
		console.log(event);
	}
	
	$rootScope.on('canvas-fully-loaded', function(){
		$rootScope.canvas.addEventListener('keydown',$sr.handleKeyDown);
	});
	

})($sr = window.$sr = window.$sr || {});