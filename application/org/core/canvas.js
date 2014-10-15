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
 *
 * global game:false
 */

/**
 * Initialising the canvas as a child of the sunriseJS-app element 
 * with the data the user specified in the config area.
 */
$rootScope.fn.initCanvas 		= function(){
	var screenWidth 	= game.config.screenWidth,
		screenHeight 	= game.config.screenHeight,
		canvas 		= document.createElement('canvas');
	canvas.id     	= 'sunriseJS-screen';
	canvas.width  	= screenWidth;
	canvas.height 	= screenHeight;

	canvas.tabIndex ='1';
	$rootScope.dom.appendChild(canvas);
	$rootScope.canvas = canvas;
	$rootScope.canvas.context = canvas.getContext('2d');
	canvas.focus();
	$rootScope.canvas.addEventListener('blur', function(){
		rootfn.focusChanged(false);
	});
	$rootScope.canvas.addEventListener('focus', function(){
		rootfn.focusChanged(true);
	});
	rootfn.emit('canvas-fully-loaded');
};

$rootScope.fn.clearCanvas = function(){
	// Store the current transformation matrix
	$rootScope.canvas.context.save();
	// Use the identity matrix while clearing the canvas
	$rootScope.canvas.context.setTransform(1, 0, 0, 1, 0, 0);
	$rootScope.canvas.context.clearRect(0, 0, game.config.screenWidth, game.config.screenHeight);
	// Restore the transform
	$rootScope.canvas.context.restore();
};
