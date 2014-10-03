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
			var self = this,
				speed = new utilfn.Vec2(0,0),
				forces = [];
				unit = 1/60, //pixel/second
				mass = (config.mass === undefined) ? 1 : config.mass,
				inertia = (config.inertia === undefined) ? 0.99 : config.inertia;

			config.forces = config.forces || [];
			for(var i=0; i<config.forces.length; i++){
				forces.push(new utilfn.Vec2(config.forces[i].x,config.forces[i].y));
			}

			this.on('tick', function(data){
				for (i = forces.length - 1; i >= 0; --i) {
					
					speed.add(utilfn.Vec2.multiply(utilfn.Vec2.divide(forces[i],mass), data.delta*unit));
					//console.log(utilfn.Vec2.divide(forces[i],mass), data.delta*unit);
				}
				speed.multiply(inertia);
				console.log(speed.y*(data.delta*unit));
				self.entity.x += speed.x*(data.delta*unit);
				self.entity.y += speed.y*(data.delta*unit);			
			});


		}

		srfn.Component.extend(Physics);

		return Physics;

	})();


	srfn.components.add('Physics', function(config){
		return new srfn.Physics(config);
	});

	
})($sr = window.$sr = window.$sr || {});

