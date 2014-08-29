(function(sl){
	

	init = function(){
		console.log("init");
		var data = {};
		data.test = "fuuuuuuuuuooooooobar";
		var _private = sl._private = sl._private || {},

		_seal = sl._seal = sl._seal || function () {
			delete sl._private;
			delete sl._seal;
			delete sl._unseal;
		},
		_unseal = sl._unseal = sl._unseal || function () {
			sl._private = _private;
			sl._seal = _seal;
			sl._unseal = _unseal;
		};

		sl.loadScript = function(src, callback) {
		    var s = document.createElement('script');
		    s.type = 'text/javascript';
		    s.src = src;
		    s.async = false;
		    s.onload = callback;        
		    document.body.appendChild(s);
		}

		sl._private.returnPrivateData = function(){
			console.log(data);
			return data;
		}

		sl.checkData = function(){
			return data;
		}
	}


	var appName = document.querySelector('div[jsengine-app]');
	if(appName != undefined){
		init();
		sl.loadScript("application/org/core/test.js", sl._seal);
		
	}
	else {
		alert('no jsengine-app found');
	}


})(window.sl = window.sl || {});


