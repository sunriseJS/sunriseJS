/**
 * @license sunriseJS Game Engine
 * @copyright (C) 2014 - 2014 Jonas Gerdes, Jonathan Wiemers
 * http://www.sunrisejs.net
 *
 * sunriseJS is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license.php
 *
 *
 */
(function($sr){	
	var $rootScope = $sr.$rootScope;
	var entities = [];

	$sr.stage = {};

	$sr.stage.add = function(entity){
		if(!entity instanceof $sr.Entity){
			throw new Error('Only entities can be added to stage');
		}
		entities.push(entity);
		console.log('added to stage. entities:',entities);
	}

	$rootScope.drawStage = function(){
		entities.forEach(function(entity){
			entity.draw();
		});
	}

	
})($sr = window.$sr = window.$sr || {});