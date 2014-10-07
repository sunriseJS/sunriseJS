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
	
	srfn.SimpleInventory = (function(){ 

		SimpleInventory = function(config_){
			console.log(config_);
			srfn.Component.call(this);
			var self = this;
			var config = config_ || {};
			config.keys = config.keys || {};


			this.data = {
				"inventory": []
			};


			this.on('addToInventory', function(data){
				self.addItem(data);
			});


			SimpleInventory.prototype.addItem = function(item){
				this.data.inventory.push(item);
				return this.data.inventory;
			};

			SimpleInventory.prototype.getInventory = function(){
				return this.data.inventory;
			};

		}
		srfn.Component.extend(SimpleInventory);
		return SimpleInventory

	})();


	srfn.components.add('SimpleInventory', function(config){
		return new srfn.SimpleInventory(config);
	});

	
})($sr = window.$sr = window.$sr || {});