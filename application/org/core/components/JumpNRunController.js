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
 * Jump'n'Run Controller
 * Manage key inputs for a Jump'n'Run Character
 *
 * emits:
 *
 * receives:
 * tick
 *
*/


(function($sr){	
	var $rootScope = $sr.$rootScope;
	$sr.JumpNRunController = (function(){ 


		var config;

		/**
		 * Contructor of JumpNRunController Component
		 * @param {Object} config      optional and may contain keys for the controll
		 */
		JumpNRunController = function(config_){
			$sr.Component.call(this);
			var self = this;
			config = config_ || {};

			function sanitiseConfig(){
				var r = arguments[0];
				if(r === undefined || r.length === 0){
					r = [];
					for(var i=1; i<arguments.length; i++){
						r.push(arguments[i]);
					}
				}else if(!(r instanceof Array)){
					r = [r];
				}
				return r;
			}

			config.left = sanitiseConfig(config.left,'a','left');
			config.right = sanitiseConfig(config.right,'d','right');
			config.jump = sanitiseConfig(config.jump);


			var direction = 0;

			this.on('tick', function(data){

				var run_left = false;
				config.left.forEach(function(key){
					run_left = run_left || $sr.controls.isKeyPressed(key);
				});
				var run_right = false;
				config.right.forEach(function(key){
					run_right = run_right || $sr.controls.isKeyPressed(key);
				});

				if(run_left && !run_right){
					self.entity.emit('changeAnimation', {
						animation: 'walk_left',
						restart: false
					});
					direction = -1;
				}
				if(run_right && !run_left){
					self.entity.emit('changeAnimation', {
						animation: 'walk_right',
						restart: false
					});
					direction = 1;
				}

				if(!run_left && !run_right){
					if(direction !== 0){
						var animation = 'stand_';
						if(direction === -1){
							animation += 'left';
						}else if(direction === 1){
							animation += 'right';
						}
						self.entity.emit('changeAnimation', {
							animation: animation,
							restart: false
						});
						direction = 0;
					}
				}

				self.entity.x += 2*direction;


			});
		}

		$sr.Component.extend(JumpNRunController);

		return JumpNRunController;

	})();

	
})($sr = window.$sr = window.$sr || {});