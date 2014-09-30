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

	for (var i in $rootScope.groups['public']['groupName']) {
  		if($rootScope.groups['public']['groupName'][i].id == entity.id){

  		}
	}
	$rootScope.groups['public']['groupName'].push(entity);
};


$sr.definedCollidingGroups = function(collider, toCollide){

};


$sr.removeEntityFromGroup = function(group, entity){

};


$rootScope.groups.orderCollidingObjects = function(){

};