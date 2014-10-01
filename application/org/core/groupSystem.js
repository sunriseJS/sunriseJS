/**
 * @license sunriseJS Game Engine
 * @copyright (C) 2014 - 2014 Jonas Gerdes, Jonathan Wiemers
 * http://www.sunrisejs.net
 *
 * sunriseJS is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license.php
 *
 */


(function(){ 

	var groupFn = {};
	/**
	 * adds a single entity in a group
	 */
	groupFn.addEntityToGroup = function(entity, groupName){
		if($rootScope.groups['groups'][groupName] == undefined){
			$rootScope.groups['groups'][groupName] = [];
		}
		if($sr.inArray(entity,$rootScope.groups['groups'][groupName])){
			$rootScope.groups['groups'][groupName].push(entity);
		}
	};
	/**
	 * adds an array for entities to a group
	 * @param {[type]} entities  [array]
	 */
	groupFn.addEntitiesToGroup = function(entities, groupName){
		if($rootScope.groups['groups'][groupName] == undefined){
			$rootScope.groups['groups'][groupName] = [];
		}
		for (var j = 0; j < entities.length; ++j) {
	  		if($sr.inArray(entities[j],$rootScope.groups['groups'][groupName]) === -1){
	  			$rootScope.groups['groups'][groupName].push(entities[j]);
	  		}
	  	}
	};
	/**
	 * array, the two objects that shall be testet for collision
	 * @param {[type]} collideingPair [description]
	 */
	groupFn.addEntityToCollingObjects = function(collidingPair){
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

	$rootScope.groups = {
		'groups': 	{
			'toRender': []
		},
		'collidingObjects': []
	};


	/**
	 * groups method to add entites to a group, 
	 * @param {[type]} entities  [formats are $sr.Entity and array of $sr.Entity's]
	 * @param {[type]} groupName [group to add the entites in]
	 */
	$sr.addToGroup = function(entities, groupName){
		if(entities instanceof Array){
			console.log('array');
			groupFn.addEntitiesToGroup(entities, groupName);
		} else if(entities instanceof $sr.Entity){
			console.log('entity');
			groupFn.addEntityToGroup(entities,groupName);
		} else {
			throw new Error('No valid object is given to put in group: '+groupName);
		}
	};

	/**
	 * define groups where the objects will collide
	 * @param  {[type]} collider  [the first group : String]
	 * @param  {[type]} toCollide [secound group : String]
	 */
	$sr.defineCollidingGroups = function(collider, toCollide){
		if($rootScope.groups['groups'][collider] == undefined || $rootScope.groups['groups'][toCollide] == undefined){
			throw 'One of the given groups is undefined!',collider,toCollide;
			return;
		}
		var colliderGrp = $rootScope.groups['groups'][collider];
		var toCollideGrp = $rootScope.groups['groups'][toCollide];
		for(var i = 0 ;i<colliderGrp.length; ++i){
			for(var j = 0; j < toCollideGrp.length; ++j){
				groupFn.addEntityToCollingObjects([colliderGrp[i],toCollideGrp[j]]);
			}
		}
	};


	$sr.removeEntityFromGroup = function(entity,group){
		
	};




	//debuging
	$sr.getGroups = function(){
		return $rootScope.groups;
	};
})();

