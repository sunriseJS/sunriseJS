(function(sr){	
	var _private = sr._private;

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

	
})(window.sr = window.sr || {});