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
		var charCode = String.fromCharCode((typeof event.which == "undefined") ? event.keyCode : event.which);
		console.log("Keycode: ", event.keyCode, "keypressed: ", charCode);
	}
	
	$rootScope.on('canvas-fully-loaded', function(){
		$rootScope.canvas.addEventListener('keypress',$sr.handleKeyDown);
	});
	

})($sr = window.$sr = window.$sr || {});