$rootScope.time = {
	'delta'		: 	0,
	'actual'	: 	Date.now(),
	'wasPaused'	: 	false
};

rootfn.processTime = function(){
	if($rootScope.time.wasPaused){
		$rootScope.time.actual = Date.now();
		$rootScope.time.wasPaused = false;
	} else {
		$rootScope.time.delta = Date.now() - $rootScope.time.actual;
		$rootScope.time.actual = Date.now();
	}
};

