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
 * Physics
 * Manage key inputs for a Jump'n'Run Character
 *
 * emits:
 *
 * receives:
 * tick
 *
*/


(function($sr){	
	var $rootScope = $sr.$rootScope,
		srfn = $rootScope.$scope.fn;
		utilfn = $rootScope.$scope.util;
	srfn.Physics = (function(){ 


	

		/**
		 * Contructor of Physics Component
		 * @param {Object} config      optional and may contain keys for the controll
		 */
		Physics = function(config){
			srfn.Component.call(this);
			this.config = config;
		};


		srfn.Component.extend(Physics);

		Physics.prototype.init = function(){
			var self = this,
				config = this.config,
				speed = this.data.speed = new utilfn.Vec2(0,0),
				forces = {},
				unit = 1/30, //pixel/second
				mass = (config.mass === undefined) ? 1 : config.mass,
				imass = this.data.imass = (mass===0)? 0 : 1/mass;
				inertia = (config.inertia === undefined) ? 0.99 : config.inertia,
				restitution = this.data.restitution = 0.0001;
			config.forces = config.forces || [];
			for(key in config.forces){
				forces[key] = new utilfn.Vec2(config.forces[key].x,config.forces[key].y);
			}

			this.on('tick', function(data){
				//console.log(mass);
				for (key in forces) {
					
					speed.add(utilfn.Vec2.multiply(utilfn.Vec2.divide(forces[key],mass), data.delta*unit));
					//console.log('force: '+key+':',for)
					//console.log(utilfn.Vec2.divide(forces[i],mass), data.delta*unit);
				}
				speed.multiply(inertia);
				self.entity.x += speed.x*(data.delta*unit);
				self.entity.y += speed.y*(data.delta*unit);			
			});

			this.on('setForce', function(data){
				forces[data.name] = new utilfn.Vec2(data.x,data.y);
			});

			this.on('collision', function(data){
				//console.log(data);
				if(data.other.components.Physics === undefined){
					return;
				}
				var otherSpeed = data.other.getComponentData('Physics', 'speed'),
					otherRestitution = data.other.getComponentData('Physics', 'restitution'),
					otherImass = data.other.getComponentData('Physics', 'imass'),
					normal = new utilfn.Vec2(data.collision.normal.x, data.collision.normal.y);
				if(!(otherSpeed && otherRestitution && otherImass)){
					return;
				}
				var	relativeSpeed = utilfn.Vec2.sub(otherSpeed, speed),
					speedNormal = utilfn.Vec2.dot(relativeSpeed, normal);

				if(speedNormal > 0){
					return;
				}

				var bounciness = Math.min(restitution, otherRestitution),
					force = (-(1+bounciness)*speedNormal)/(imass + otherImass),
					impulse = utilfn.Vec2.multiply(normal, force);

				speed.sub(utilfn.Vec2.multiply(impulse, imass));
				otherSpeed.add(utilfn.Vec2.multiply(impulse, otherImass));

				if(data.collision.penetration > 1){
					var correction = data.collision.penetration / (imass + otherImass);
					correction *= 0.8;
					self.entity.x -= imass * correction * normal.x;
					self.entity.y -= imass * correction * normal.y;
					data.other.x += otherImass * correction * normal.x;
					data.other.y += otherImass * correction * normal.y;
				}

			});


		}


		return Physics;

	})();


	srfn.components.add('Physics', function(config){
		return new srfn.Physics(config);
	});

	
})($sr = window.$sr = window.$sr || {});

