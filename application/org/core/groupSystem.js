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
		if(utilfn.inArray(entity,$rootScope.groups['groups'][groupName])){
			$rootScope.groups['groups'][groupName].push(entity);
		}
	}
	/**
	 * adds an array for entities to a group
	 * @param {[type]} entities  [array]
	 */
	groupFn.addEntitiesToGroup = function(entities, groupName){
		if($rootScope.groups['groups'][groupName] == undefined){
			$rootScope.groups['groups'][groupName] = [];
		}
		for (var j = 0; j < entities.length; ++j) {
	  		if(utilfn.inArray(entities[j],$rootScope.groups['groups'][groupName]) === -1){
	  			$rootScope.groups['groups'][groupName].push(entities[j]);
	  		}
	  	}
	}
	/**
	 * array, the two objects that shall be testet for collision
	 * @param {[type]} collideingPair [description]
	 */
	groupFn.addPairToCollingObjects = function(collidingPair){
		// for(var i = 0; i < $rootScope.groups['collidingObjects'].length; ++i){
		// 	if(($rootScope.groups['collidingObjects'][i][0] == collidingPair[0] 
		// 		&& $rootScope.groups['collidingObjects'][i][1] == collidingPair[1])
		// 		|| ($rootScope.groups['collidingObjects'][i][0] == collidingPair[1] 
		// 			&& $rootScope.groups['collidingObjects'][i][1] == collidingPair[0])){
		// 			return;	
		// 	}
		// }
		$rootScope.groups['collidingObjects'].push([collidingPair[0],collidingPair[1]]);	
	}

	groupFn.deleteFromCollidingObjects = function(entity){
		for(var i = 0; i < $rootScope.groups['collidingObjects'].length; ++i){
			if($rootScope.groups['collidingObjects'][i][0].id == entity.id 
				|| $rootScope.groups['collidingObjects'][i][1].id == entity.id){
				$rootScope.groups['collidingObjects'].splice(i,1);
			}
		}
	}

	/**
	 * note used anymore // deadCODE
	 * @return {[type]} [description]
	 */
	groupFn.generateCollidingObjects = function(){
		$rootScope.groups['collidingObjects'] = [];
		for(var g = $rootScope.groups['collidingGroups'].length;g--;){
			var colliderGrp = $rootScope.groups['collidingGroups'][g][0];
			var toCollideGrp = $rootScope.groups['collidingGroups'][g][1];
			for(var i = 0 ;i<colliderGrp.length; ++i){
				for(var j = 0; j < toCollideGrp.length; ++j){
					groupFn.addPairToCollingObjects([colliderGrp[i],toCollideGrp[j]]);
				}
			}
		}
	}

	$rootScope.groups = {
		'groups': 	{
			'toRender': []
		},
		'collidingGroups': []
	}

	/**
	 * predefining groups is helpfull if there are no objects in the group from the start
	 * @param  {[type]} groupName [description]
	 * @return {[type]}           [description]
	 */
	srfn.defineEmptyGroup = function(groupName){
		$rootScope.groups['groups'][groupName] = [];
	}

	/**
	 * groups method to add entites to a group, 
	 * @param {[type]} entities  [formats are $sr.Entity and array of $sr.Entity's]
	 * @param {[type]} groupName [group to add the entites in]
	 */
	srfn.addToGroup = function(entities, groupName){
		if(entities instanceof Array){
			for(var i = entities.length; i--;){
				if(!(entities[i] instanceof srfn.Entity)){
					throw new Error('Object is not an Entity.');
				}
			}
			groupFn.addEntitiesToGroup(entities, groupName);
		} else if(entities instanceof srfn.Entity){
			groupFn.addEntityToGroup(entities,groupName);
		} else {
			throw new Error('Object is not an Entity.');
		}
	}

	/**
	 * define groups where the objects will collide
	 * @param  {[type]} collider  [the first group : String]
	 * @param  {[type]} toCollide [secound group : String]
	 */
	srfn.defineCollidingGroups = function(collider, toCollide, event){
		if($rootScope.groups['groups'][collider] == undefined || $rootScope.groups['groups'][toCollide] == undefined){
			throw new Error('One of the given groups is undefined!',collider,toCollide);
		}
		$rootScope.groups['collidingGroups'].push([collider,toCollide, event]);
	}

	/**
	 * EXPERIMENTAL - NOT TESTET JET
	 *
	 * Removes a colliding pair from the list.
	 * 
	 * @param  {[type]} collider  [f]
	 * @param  {[type]} toCollide [s]
	 */
	srfn.deleteCollidingGroups = function(collider, toCollide){
		for(var i = $rootScope.groups['collidingGroups'].length; i--;){
			if($rootScope.groups['collidingGroups'][i][0] === $rootScope.groups['groups'][collide] &&
				$rootScope.groups['collidingGroups'][i][1] === $rootScope.groups[groups][toCollide]){
				$rootScope.groups['collidingGroups'].splice(i,1);
			}
		}
	}


	/**
	 * Removes an entity from one specific group
	 * @param  {[type]} entity [Entity to remove]
	 * @param  {[type]} group  [group to remove the object from]
	 * @return {[type]}        [undefined]
	 */
	srfn.removeEntityFromGroup = function(entity,group){
		if(!(entity instanceof srfn.Entity)){
			throw new Error('Given object is not an Entity',entity);
		}
		var index = $rootScope.groups['groups'][group].indexOf(entity);
		if(index == -1){
			return;
		}
		$rootScope.groups['groups'][group].splice(index, 1);
	}

	/**
	 * Removes an entity from all groups.
	 * @param  {[type]} entity [Entity to remove]
	 * @return {[type]}        [description]
	 */
	srfn.removeEntityFromAllGroups = function(entity){
		if(!(entity instanceof srfn.Entity)){
			throw new Error('Given object is not an Entity',entity);
		}
		var groups = srfn.getGroupsByEntity(entity);
		if(!groups){
			return;
		}
		for(var i = groups.length; i--;){
			console.log(groups[i]);
			srfn.removeEntityFromGroup(entity,groups[i]);
		}
	}

	/**
	 * Returns an array of groups which hold the Entity.
	 * Returns false if entity is in no group. 
	 * @param  {[type]} entity [entity to search for in all groups]
	 * @return {[type]}        [array, false]
	 */
	srfn.getGroupsByEntity = function(entity){
		if(!(entity instanceof srfn.Entity)){
			throw new Error('Given object is not an Entity',entity);
		}
		var groups = [];
		for (var key in $rootScope.groups['groups']) {
		   if ($rootScope.groups['groups'].hasOwnProperty(key)) {
		      var obj = $rootScope.groups['groups'][key];
		      for (var prop in obj) {
		         if (obj.hasOwnProperty(prop)) {
	            	if(entity.id == obj[prop].id){
	            		groups.push(key);
	            	}
		         }
		      }
		   }
		}
		if(groups.length == 0){
			return false;
		}
		return groups;
	}

	//debuging
	$sr.getGroups = function(){
		return $rootScope.groups;
	}
})();

