/**
 * @license sunriseJS Game Engine
 * @copyright (C) 2014 - 2014 Jonas Gerdes, Jonathan Wiemers
 * http://www.sunrisejs.net
 *
 * sunriseJS is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license.php
 *
 */

/*
 * ComponentDescription
 * CollisionBody
 * Detects collisions with other entities
 *
 * emits:
 * testCollision
 * collision
 *
 * receives:
 * tick
 * testCollision
 *
*/


(function($sr){	
	var $rootScope = $sr.$rootScope;
	$sr.CollisionBody = (function(){ 


		

		/**
		 * Contructor of CollisionBody Component
		 */
		CollisionBody = function(options){
			$sr.Component.call(this);
			var self = this;
			this.colliderType = options.colliderType || 'rectangle';
			if($rootScope.colliderTesters[this.colliderType] === undefined){
				throw new Error('Invalid colliderType "'+this.colliderType+'"');
			}

			this.on('setEntity', function(data){
				self.entity = data;
				self.bounds = {};
				self.bounds.x = (options.x || 0)-(data.getComponentData('Renderer','anchor').x || 0);
				self.bounds.y = (options.y || 0)-(data.getComponentData('Renderer','anchor').y || 0);
				switch(self.colliderType){
					case 'rectangle':
						self.bounds.width = (options.width === undefined) ? data.width : options.width;
						self.bounds.height = (options.height === undefined) ? data.height : options.height;
						break;
					case 'cricle':
						self.bounds.radius = (options.radius === undefined) ? data.width : options.radius;
						break;
				}
			},true);
					
		}

		$sr.Component.extend(CollisionBody);

		return CollisionBody;

	})();

	$sr.components.add('CollisionBody', function(config){
		return new $sr.CollisionBody(config);
	});

	
})($sr = window.$sr = window.$sr || {});