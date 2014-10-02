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
rootfn = $rootScope.fn = {};
$rootScope.$scope = {};

srfn = $rootScope.$scope.fn = {};

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



rootfn.sunrise = function(){
	$sr._seal();
	rootfn.initCanvas();
	srfn.loadImages(game.config.images, function(){
		//todo: make this better :D
		srfn.loadLevels(game.config.levels, function(){
			game.init($rootScope.$scope);
			rootfn.run();	
		});
	});
};


rootfn.run = function(){
	rootfn.clearCanvas();
	rootfn.stage.update();
	rootfn.checkCollisions();
	game.run($rootScope.$scope);
	rootfn.stage.draw();
	$rootScope.animationFrame.call(window, rootfn.run);
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

	
rootfn.init = function(){
	$rootScope.animationFrame = 	window.requestAnimationFrame       ||
				          			window.webkitRequestAnimationFrame ||
				          			window.mozRequestAnimationFrame    ||
				          			function( callback ){
				            			window.setTimeout(callback, 1000 / 60);
				          			};
}


$rootScope.dom = document.querySelector('div[sunriseJS-app]');
if($rootScope.dom != undefined){
	rootfn.init();
}
else {
	alert('no jsengine-app found');
}




