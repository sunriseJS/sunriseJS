(function(sr){	
	_private = sr._private;
	
	sr.test = function(){
		console.log("testfn");
		_private.returnPrivateData().test = "überschrieben o.o";

	}
})(window.sr = window.sr || {});