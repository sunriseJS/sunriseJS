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
				rectangle : function(f, s){
					var colX = (s.x >= f.x && s.x <= f.x + f.width);
					colX = colX || (f.x >= s.x && f.x <= s.x + s.width);
					var colY = (s.y >= f.y && s.y <= f.y + f.height);
					colY = colY || (f.y >= s.y && f.y <= s.y + s.height);
					//console.log('testCollision rectangle:',colX, colY, f, s);
					return colX && colY;
				},
				circle : function(f, s){
					return false;
				},
				pixel : function(f, s){
					return false;
				}
			},
			circle : {
				rectangle : function(f, s){
					colliderTesters.rectangle.circle(second, first);
				},
				circle : function(f, s){
					return false;
				},
				pixel : function(f, s){
					return false;
				}
			},
			pixel : {
				rectangle : function(f, s){
					colliderTesters.rectangle.pixel(second, first);
				},
				circle : function(f, s){
					colliderTesters.circle.pixel(second, first);
				},
				pixel : function(f, s){
					return false;
				}
			}
		}

		/**
		 * Contructor of CollisionBody Component
		 */
		CollisionBody = function(options){
			$sr.Component.call(this);
			var self = this;
			this.colliderType = options.colliderType || 'rectangle';
			if(colliderTesters[this.colliderType] === undefined){
				throw new Error('Invalid colliderType "'+this.colliderType+'"');
			}

			this.on('tick', function(){

				$sr.stage.getStageObserver().getEntities().forEach(function(entity){
					if(entity !== self.entity){
						entity.emit('testCollision', {
							other: self.entity,
							colliderType : self.colliderType,
						});
					}
				});

			});

			this.on('testCollision', function(data){
				if (colliderTesters[self.colliderType][data.colliderType](self.entity,data.other)){
					
					data.other.emit('collision', {
						other : self.entity
					});
					self.entity.emit('collision', {
						other : data.other
					});
				}else{
				}
			});

	
		}

		$sr.Component.extend(CollisionBody);

		return CollisionBody;

	})();

	$sr.components.add('CollisionBody', function(config){
		return new $sr.CollisionBody(config);
	});

	
})($sr = window.$sr = window.$sr || {});