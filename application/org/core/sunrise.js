/**
 * @license sunriseJS Game Engine
 * @copyright (C) 2014 - 2014 Jonas Gerdes, Jonathan Wiemers
 * http://www.sunrisejs.net
 *
 * sunriseJS is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license.php
 *
 *
 */




//private functions

var $rootScope = $sr.$rootScope = $sr.$rootScope || {};
var rootfn = $rootScope.fn = {};
$rootScope.$scope = {};

$rootScope.emitDigit = [];
$rootScope.gameRunning = true;



var srfn = $rootScope.$scope.fn = {};

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

rootfn.focusChanged = function(canvas){ 
	if(canvas){
		rootfn.emitEverywhere('reganedFocus');
	}else {
		rootfn.emitEverywhere('lostFocus');
	} 
}

rootfn.tabFocusChanged = function(){ 
	if(!utilfn.vis()){
		$rootScope.canvas.blur();
	}
}





rootfn.sunrise = function(){
	rootfn.onEverywhere('paus', function(){
		window.cancelAnimationFrame($rootScope.animationFrame);
		$rootScope.gameRunning = false;
		$rootScope.time.wasPaused = true;
		rootfn.controls.resetKeyPressed();
	});
	rootfn.onEverywhere('unPaus', function(){
		$rootScope.gameRunning = true;
		$rootScope.animationFrame.call(window, rootfn.run);	
	});
	
	$sr._seal();

	rootfn.initCanvas();
	srfn.loadImages(game.config.images, function(){
		//todo: make this better :D
		srfn.loadSounds(game.config.sounds, function(){
			game.createComponents($rootScope.$scope);
			srfn.loadLevels(game.config.levels, function(){
				srfn.loadUis(game.config.uis, function(){
					
					console.log($rootScope.ressources);
					game.init($rootScope.$scope);
					rootfn.initUi();
					rootfn.run();	
				});
			});
		});
	});
};

	


rootfn.run = function(){
	if($rootScope.gameRunning){ 
		rootfn.processTime();
		rootfn.clearCanvas();
		rootfn.stage.update();
		var i,k;
		i = k = $rootScope.keyCallbackFunctions.length
		for(; i--;){
			$rootScope.keyCallbackFunctions[i]();
		}
		$rootScope.keyCallbackFunctions.splice(0,k);
		rootfn.checkCollisions();
		i = k = $rootScope.emitDigit.length;
		for(; i--;){
			$rootScope.emitDigit[i]();
		}
		$rootScope.emitDigit.splice(0,k);
		game.run($rootScope.$scope);
		rootfn.stage.draw();
		$rootScope.animationFrame.call(window, rootfn.run);	
	}
};

srfn.fps = {
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

	
rootfn.init = function(callback){
	window.frme = $rootScope.animationFrame = 	window.requestAnimationFrame       ||
				          			window.webkitRequestAnimationFrame ||
				          			window.mozRequestAnimationFrame    ||
				          			function( callback ){
				            			window.setTimeout(callback, 1000 / 60);
				          			};

}


$rootScope.dom = document.querySelector('div[sunriseJS-app]');
if($rootScope.dom != undefined){
	rootfn.init(rootfn.run);
}
else {
	alert('no jsengine-app found');
}




