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
	var $rootScope = $sr.$rootScope,
		srfn = $rootScope.$scope.fn;
	srfn.JumpNRunController = (function(){ 
		/**
		 * Contructor of JumpNRunController Component
		 * @param {Object} config      optional and may contain keys for the controll
		 */
		JumpNRunController = function(config_){
			srfn.Component.call(this);
			var self = this;
			var config = config_ || {};
			config.keys = config.keys || {};

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

			config.keys.left = sanitiseConfig(config.keys.left,'a','left');
			config.keys.right = sanitiseConfig(config.keys.right,'d','right');
			config.keys.jump = sanitiseConfig(config.keys.jump,'w','up','space');

			srfn.controls.onKeyDown('f',function(){
				window.player.emit('useItem',{});
			});
			var direction = 0;

			this.on('tick', function(data){

				var run_left = false;
				config.keys.left.forEach(function(key){
					run_left = run_left || srfn.controls.isKeyPressed(key);
				});
				var run_right = false;
				config.keys.right.forEach(function(key){
					run_right = run_right || srfn.controls.isKeyPressed(key);
				});
				var jump = false;
				config.keys.jump.forEach(function(key){
					jump = jump || srfn.controls.isKeyPressed(key);
				});
				if(run_left && !run_right){
					self.entity.emit('changeAnimation', {
						animation: 'walk_left',
						restart: false
					});
					direction = -1;
					if(!srfn.isSoundPlaying('steps')){
						srfn.playSound('steps');
					}
				}
				if(run_right && !run_left){
					self.entity.emit('changeAnimation', {
						animation: 'walk_right',
						restart: false
					});
					direction = 1;
					if(!srfn.isSoundPlaying('steps')){
						srfn.playSound('steps');
					}
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
					if(srfn.isSoundPlaying('steps')){
						srfn.pauseSound('steps');
					}
				}

				self.entity.x += 2*direction;

				if(jump){
					self.entity.emit('setForce',{name:'movement',x:0,y:-20});
				}else{
					self.entity.emit('setForce',{name:'movement',x:0,y:0});
				}
				
			});
		}

		srfn.Component.extend(JumpNRunController);

		return JumpNRunController;

	})();


	srfn.components.add('JumpNRunController', function(config){
		return new srfn.JumpNRunController(config);
	});

	
})($sr = window.$sr = window.$sr || {});