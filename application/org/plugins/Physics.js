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
			this.data = {};
			var self = this,
				speed = this.data.speed = new utilfn.Vec2(0,0),
				forces = [],
				unit = 1/60, //pixel/second
				mass = (config.mass === undefined) ? 1 : config.mass,
				imass = this.data.imass = (mass===0)? 0 : 1/mass;
				inertia = (config.inertia === undefined) ? 0.99 : config.inertia,
				restitution = this.data.restitution = 0.1;
			config.forces = config.forces || [];
			for(var i=0; i<config.forces.length; i++){
				forces.push(new utilfn.Vec2(config.forces[i].x,config.forces[i].y));
			}

			this.on('tick', function(data){
				//console.log(mass);
				for (i = forces.length - 1; i >= 0; --i) {
					
					speed.add(utilfn.Vec2.multiply(utilfn.Vec2.divide(forces[i],mass), data.delta*unit));
					//console.log(utilfn.Vec2.divide(forces[i],mass), data.delta*unit);
				}
				speed.multiply(inertia);
				self.entity.x += speed.x*(data.delta*unit);
				self.entity.y += speed.y*(data.delta*unit);			
			});

			this.on('collision', function(data){
				//console.log(data);
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

				var correction = data.collision.penetration / (imass + otherImass);
				self.entity.x -= imass * correction * normal.x;
				self.entity.y -= imass * correction * normal.y;
				data.other.x += otherImass * correction * normal.x;
				data.other.y += otherImass * correction * normal.y;

			});


		}

		srfn.Component.extend(Physics);

		return Physics;

	})();


	srfn.components.add('Physics', function(config){
		return new srfn.Physics(config);
	});

	
})($sr = window.$sr = window.$sr || {});

