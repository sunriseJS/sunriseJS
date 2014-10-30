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
 *
 * receives:
 *
*/


(function($sr){	
	var $rootScope = $sr.$rootScope,
		srfn = $rootScope.$scope.fn;
		rootfn = $rootScope.fn;
	srfn.CollisionBody = (function(){ 


		

		/**
		 * Contructor of CollisionBody Component
		 */
		CollisionBody = function(options){
			srfn.Component.call(this);
			this.options = options;		
		}

		srfn.Component.extend(CollisionBody);

		CollisionBody.prototype.init = function(){
			var self = this;
			this.data.colliderType = this.options.colliderType || 'rectangle';
			if(rootfn.colliderTesters[this.data.colliderType] === undefined){
				throw new Error('Invalid colliderType "'+this.data.colliderType+'"');
			}
			self.data.bounds = {};
			var anchor;
			try{
				anchor = data.getComponentData('Renderer','anchor');
			}catch(e){
				//No Renderer available
				anchor = {};
			}
			self.data.bounds.x = (this.options.x || 0)-(anchor.x || 0);
			self.data.bounds.y = (this.options.y || 0)-(anchor.y || 0);
			switch(self.data.colliderType){
				case 'rectangle':
					self.data.bounds.width = (this.options.width === undefined) ? self.entity.width : this.options.width;
					self.data.bounds.height = (this.options.height === undefined) ? self.entity.height : this.options.height;
					break;
				case 'cricle':
					self.data.bounds.radius = (this.options.radius === undefined) ? self.entity.width : this.options.radius;
					break;
				default:
					throw new Error('Unrecognized colliderType');
					break;
			}
		}
		return CollisionBody;

	})();

	srfn.components.add('CollisionBody', function(config){
		return new srfn.CollisionBody(config);
	});

	
})($sr = window.$sr = window.$sr || {});