/**
 * @license sunriseJS Game Engine
 * @copyright (C) 2014 - 2014 Jonas Gerdes, Jonathan Wiemers
 * http://www.sunrisejs.net
 *
 * sunriseJS is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license.php
 *
 *
 * 
 * @param  {[type]} sr
 * @return {[type]}
 */

$rootScope.events = {};
$rootScope.$scope.events = {};


rootfn.emit = function(event, data){
	if($rootScope.events[event] != undefined){
		$rootScope.events[event].forEach(function(entry) {
				entry(data);
		});
	} else {
		console.error('there is no event named: '+event);
	}
};

rootfn.on = function(event, callback){
	if($rootScope.events[event] != undefined){
		$rootScope.events[event].push(callback); 
	} else {
		$rootScope.events[event] = [];
		$rootScope.events[event].push(callback);
	}
	
};

srfn.emit = function(event, data){
	if($rootScope.$scope.events[event] != undefined){
		$rootScope.$scope.events[event].forEach(function(entry) {
				entry(data);
		});
	} else {
		console.error('there is no event named: '+event);
	}
		
};

srfn.on = function(event, callback){
	if($rootScope.$scope.events[event] != undefined){
		$rootScope.$scope.events[event].push(callback); 
	} else {
		$rootScope.$scope.events[event] = [];
		$rootScope.$scope.events[event].push(callback);
	}
};