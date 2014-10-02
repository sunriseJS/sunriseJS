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

var $rootScope = root = $sr.$rootScope = $sr.$rootScope || {};
rootfn = root.fn = {};
root.$scope = {};

srfn = root.$scope.fn = {};

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
	$rootScope.fn.initCanvas();
	$sr.loadImages(game.config.images, function(){
		//todo: make this better :D
		$sr.loadLevels(game.config.levels, function(){
			game.init($rootScope.$scope);
			$rootScope.run();	
		});
	});
};


rootfn.run = function(){
	$rootScope.clearCanvas();
	$rootScope.updateStage();
	$rootScope.checkCollisions();
	game.run($rootScope.$scope);
	$rootScope.drawStage();
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


root.dom = document.querySelector('div[sunriseJS-app]');
if(root.dom != undefined){
	rootfn.init();
}
else {
	alert('no jsengine-app found');
}




