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
 * collision
 *
 * receives:
 * tick
 *
*/


(function($sr){	
	var $rootScope = $sr.$rootScope;
	$sr.CollisionBody = (function(){ 


		/**
		 * Contructor of CollisionBody Component
		 */
		CollisionBody = function(stage, option){
			$sr.Component.call(this);
			var self = this;


			this.on('tick', function(){

			});

	
		}

		$sr.Component.extend(CollisionBody);

		return CollisionBody;

	})();

	
})($sr = window.$sr = window.$sr || {});