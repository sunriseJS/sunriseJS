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
	'public': 	{},
	'private':  {},
	'collidingObjects': []
};


/**
 * Public method to add entites to a group, 
 * @param {[type]} entities  [formats are $sr.Entity and array of $sr.Entity's]
 * @param {[type]} groupName [group to add the entites in]
 */
$sr.addToGroup = function(entities, groupName){

console.log(entities);

	if(entities instanceof Array){
		console.log('array');
		$rootScope.groups.addEntitiesToGroup(entities, groupName);
	} else if(entities instanceof $sr.Entity){
		console.log('entity');
		$rootScope.groups.addEntityToGroup(entities,groupName);
	} else {
		throw new Error('No valid object is given to put in group: '+groupName);
	}
};


/**
 * adds a single entity in a group
 */
$rootScope.groups.addEntityToGroup = function(entity, groupName){
	if($rootScope.groups['public'][groupName] == undefined){
		$rootScope.groups['public'][groupName] = [];
	}
	if($rootScope.groups['public'][groupName].length > 0){ 
		for (var i = 0; i < $rootScope.groups['public'][groupName].length;++i) {
	  		if($rootScope.groups['public'][groupName][i].id == entity.id){
	  			throw new Error('Entity: ['+entity+'] is already in group: ['+groupName+']');
	  			return;
	  		}
		}
	}
	$rootScope.groups['public'][groupName].push(entity);
	
};


/**
 * adds an array for entities to a group
 * @param {[type]} entities  [array]
 */
$rootScope.groups.addEntitiesToGroup = function(entities, groupName){
	if($rootScope.groups['public'][groupName] == undefined){
		$rootScope.groups['public'][groupName] = [];
	}
	if($rootScope.groups['public'][groupName].length > 0){ 
		for (var i = 0; i < $rootScope.groups['public'][groupName].length; ++i) {
			for (var j = 0; j < entities.length; ++j) {
		  		if($sr.inArray(entities[j],$rootScope.groups['public'][groupName]) === -1){
		  			$rootScope.groups['public'][groupName].push(entities[j]);
		  		}
		  	}
		}
	} else {
		$rootScope.groups['public'][groupName].push(entities[0]);
		$rootScope.groups.addEntitiesToGroup(entities, groupName);
	}
};


/**
 * define groups where the objects will collide
 * @param  {[type]} collider  [the first group : String]
 * @param  {[type]} toCollide [secound group : String]
 */
$sr.defineCollidingGroups = function(collider, toCollide){
	if($rootScope.groups['public'][collider] == undefined || $rootScope.groups['public'][toCollide] == undefined){
		throw 'One of the given groups is undefined!',collider,toCollide;
		return;
	}
	var colliderGrp = $rootScope.groups['public'][collider];
	var toCollideGrp = $rootScope.groups['public'][toCollide];
	for(var i = 0 ;i<colliderGrp.length; ++i){
		for(var j = 0; j < toCollideGrp.length; ++j){
			$rootScope.groups.addEntityToCollingObjects([colliderGrp[i],toCollideGrp[j]]);
		}
	}
};


$sr.removeEntityFromGroup = function(group, entity){
	//to be done
};


/**
 * array, the two objects that shall be testet for collision
 * @param {[type]} collideingPair [description]
 */
$rootScope.groups.addEntityToCollingObjects = function(collidingPair){
	for(var i = 0; i < $rootScope.groups['collidingObjects'].length; ++i){
		if(($rootScope.groups['collidingObjects'][i][0] == collidingPair[0] 
			&& $rootScope.groups['collidingObjects'][i][1] == collidingPair[1])
			|| ($rootScope.groups['collidingObjects'][i][0] == collidingPair[1] 
				&& $rootScope.groups['collidingObjects'][i][1] == collidingPair[0])){
				return;	
		}
	}
	$rootScope.groups['collidingObjects'].push([collidingPair[0],collidingPair[1]]);	
};




//debuging


$sr.getGroups = function(){
	return $rootScope.groups;
}


