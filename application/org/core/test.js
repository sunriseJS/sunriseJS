(function(sr){	
	sr.test = function(){
		console.log("testfn");
		_private.returnPrivateData().test = "überschrieben o.o";

	}
	_private = sr._private;
})(window.sr = window.sr || {});