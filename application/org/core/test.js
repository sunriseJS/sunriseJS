(function(sl){	
	sl.test = function(){
		console.log("testfn");
		_private.returnPrivateData().test = "überschrieben o.o";

	}
	_private = sl._private;
})(window.sl = window.sl || {});