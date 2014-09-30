/**
 * @license sunriseJS Game Engine
 * @copyright (C) 2014 - 2014 Jonas Gerdes, Jonathan Wiemers
 * http://www.sunrisejs.net
 *
 * sunriseJS is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license.php
 *
 */


$rootScope.groups = {
	'public': 	{
		'grpnme': []
	},
	'private':  {},
	'collidingObjects': []
};


$sr.addEntityToGroup = function(groupName, entity){
	if($rootScope.groups['public'][groupName] == undefined){
		$rootScope.groups['public'][groupName] = [];
	}
	for (var i in $rootScope.groups['public'][groupName]) {
  		if($rootScope.groups['public'][groupName][i].id == entity.id){
  			throw 'Entity: ['+entity+'] is already in group: ['+groupName+']';
  			return;
  		}
	}
	$rootScope.groups['public'][groupName].push(entity);
};


$sr.defineCollidingGroups = function(collider, toCollide){
	if($rootScope.groups['public'][collider] == undefined || $rootScope.groups['public'][toCollide] == undefined){
		throw 'One of the given groups is undefined!',collider,toCollide;
		return;
	}
	var colliderGrp = $rootScope.groups['public'][collider];
	var toCollideGrp = $rootScope.groups['public'][toCollide];
	console.log('colliderGrp', colliderGrp);
	for(var i = 0 ;i<colliderGrp.length; i++){
		for(var j = 0; j < toCollideGrp.length; j++){
			$rootScope.groups['collidingObjects'].push([colliderGrp[i],toCollideGrp[j]]);
		}
	}
};


$sr.removeEntityFromGroup = function(group, entity){
	//to be done
};


$rootScope.groups.orderCollidingObjects = function(){
	//TO BE DONE!!!
};




//debuging


$sr.getGroups = function(){
	return $rootScope.groups;
}


