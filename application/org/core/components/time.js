$rootScope.time = {
	'delta'		: 	undefined,
	'actual'	: 	undefined,
	'wasPaused'	: 	false
}

rootfn.processTime = function(){
	if($rootScope.time.wasPaused){
		$rootScope.time.actual = Date.now();
		$rootScope.time.wasPaused = false;1
	} else {
		$rootScope.time.delta = Date.now() - $rootScope.time.actual;
		$rootScope.time.actual = Date.now();
	}
}

