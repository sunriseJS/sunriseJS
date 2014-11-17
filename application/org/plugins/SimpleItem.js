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
	
	srfn.SimpleItem = (function(){ 

		SimpleItem = function(config_){
			srfn.Component.call(this);
			this.config = config_;
		}

		srfn.Component.extend(SimpleItem);
		
		SimpleItem.prototype.init = function(){
			var self = this;
			var config = this.config || {};
			config.keys = config.keys || {};

			this.on('collision', function(data){
				data.other.emit('addToInventory', self.config);
				$rootScope.$scope.fn.removeEntityFromAllGroups(self.entity);
			});
		}

		return SimpleItem;

	})();



	srfn.components.add('SimpleItem', function(config){
		return new srfn.SimpleItem(config);
	});

	
})($sr = window.$sr = window.$sr || {});