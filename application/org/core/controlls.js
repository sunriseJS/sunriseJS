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
	$rootScope.controlls = {};
	$rootScope.controlls.keycallbacks = {};
	$rootScope.controlls.keyspressed = {};

	$sr.controlls.key = function(key, callback){
		$rootScope.controlls.keycallbacks[key] = callback;
	}

	$sr.handleKeyDown = function(event){
		// var charCode = String.fromCharCode((typeof event.which == "undefined") ? event.keyCode : event.which);
		// console.log("Keycode: ", event.keyCode, "keypressed: ", charCode);

		$rootScope.controlls.keyspressed[event.keyCode] = true;
		console.log("keydown");
	}

	$sr.handleKeyUp = function(event){
		// var charCode = String.fromCharCode((typeof event.which == "undefined") ? event.keyCode : event.which);
		// console.log("Keycode: ", event.keyCode, "keypressed: ", charCode);

		$rootScope.controlls.keyspressed[event.keyCode] = false;
	}
	
	$rootScope.on('canvas-fully-loaded', function(){
		$rootScope.canvas.addEventListener('keydown',$sr.handleKeyDown);
		$rootScope.canvas.addEventListener('keyup',$sr.handleKeyUp);
		console.log('canvas load');
	});


	$sr.isKeyPressed = function(code){
		return $rootScope.controlls.keyspressed[code] ? true : false;
	}


	// $rootScope.emit = function(event, data){
	// 	if($rootScope.events[event] != undefined){
	// 		$rootScope.events[event].forEach(function(entry) {
 //   				entry(data);
	// 		});
	// 	} else {
	// 		console.error('there is no event named: '+event);
	// 	}
	// }

	// $rootScope.on = function(event, callback){
	// 	if($rootScope.events[event] != undefined){
	// 		$rootScope.events[event].push(callback); 
	// 	} else {
	// 		$rootScope.events[event] = [];
	// 		$rootScope.events[event].push(callback);
	// 	}
		
	// }
	

})($sr = window.$sr = window.$sr || {});