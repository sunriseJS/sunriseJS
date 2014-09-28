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


		var colliderTesters = {
			rectangle : {
				rectangle : function(first, second){
					return false;
				},
				circle : function(first, second){
					return false;
				},
				pixel : function(first, second){
					return false;
				}
			},
			circle : {
				rectangle : function(first, second){
					colliderTesters.rectangle.circle(second, first);
				},
				circle : function(first, second){
					return false;
				},
				pixel : function(first, second){
					return false;
				}
			},
			pixel : {
				rectangle : function(first, second){
					colliderTesters.rectangle.pixel(second, first);
				},
				circle : function(first, second){
					colliderTesters.circle.pixel(second, first);
				},
				pixel : function(first, second){
					return false;
				}
			}
		}

		/**
		 * Contructor of CollisionBody Component
		 */
		CollisionBody = function(stageObserver, options){
			$sr.Component.call(this);
			var self = this;
			this.colliderType = options.colliderType || 'rectangle';
			if(colliderTesters[this.colliderType] === undefined){
				throw new Error('Invalid colliderType "'+this.colliderType+'"');
			}

			this.on('tick', function(){

				stageObserver.getEntities().forEach(function(entity){
					entity.emit('testCollision', {
						other: self,
						colliderType : self.colliderType,
					});
				});

			});

			this.on('testCollision', function(data){
				if (colliderTesters[self.colliderType][data.colliderType](self,other)){
					other.emit('collision', {
						other : self
					});
					self.emit('collision', {
						other : data.other
					});
				}
			});

			this.on('collision', function(data){
				console.log('Collision between',self,'and',data.other);
			})

	
		}

		$sr.Component.extend(CollisionBody);

		return CollisionBody;

	})();

	
})($sr = window.$sr = window.$sr || {});