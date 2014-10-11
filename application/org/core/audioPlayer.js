srfn.playSound = function(name){
	if($rootScope.ressources.sounds[name] === undefined){
		throw new Error('No sound with name "'+name+'" found.');
	}
	$rootScope.ressources.sounds[name].play();
}

srfn.pauseSound = function(name){
	if($rootScope.ressources.sounds[name] === undefined){
		throw new Error('No sound with name "'+name+'" found.');
	}
	$rootScope.ressources.sounds[name].pause();
}

srfn.isSoundPlaying = function(name){
	if($rootScope.ressources.sounds[name] === undefined){
		throw new Error('No sound with name "'+name+'" found.');
	}
	return !$rootScope.ressources.sounds[name].paused;
}