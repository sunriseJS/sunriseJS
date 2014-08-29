(function(sr){
	
	var data = {};
	data.test = "fuuuuuuuuuooooooobar";
	var _private = sr._private = sr._private || {},

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

	sr._private.returnPrivateData = function(){
		console.log(data);
		return data;
	}

	sr.checkData = function(){
		return data;
	}

	init = function(){
		
		sr.loadScript("application/org/core/test.js", sr._seal);
	}


	var appName = document.querySelector('div[sunriseJS-app]');
	if(appName != undefined){
		init();
		
		
	}
	else {
		alert('no jsengine-app found');
	}


})(window.sr = window.sr || {});


