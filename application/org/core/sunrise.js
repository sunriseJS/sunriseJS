(function(sr){
	

	

	var _private = sr._private = sr._private || {};
	sr._private.data = {};

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
	}

	init = function(){
		// sr.loadScript("application/org/core/test.js");
		sr.loadScript("application/org/core/canvas.js", sr.sunrise);

	}


	sr._private.data.dom = document.querySelector('div[sunriseJS-app]');
	if(sr._private.data.dom != undefined){
		init();
	}
	else {
		alert('no jsengine-app found');
	}


})(sr = window.sr = window.sr || {});


