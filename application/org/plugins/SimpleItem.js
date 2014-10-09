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
			var self = this;
			var config = config_ || {};
			config.keys = config.keys || {};
			this.data = {};

		this.on('collision', function(data){
			console.log('test',data);
			data.other.emit('addToInventory', config);
			console.log(self.entity);
			$rootScope.$scope.fn.removeEntityFromAllGroups(self.entity);
			// data.self = self;
			// config.use(data);
			// delete data.self;
		});

		}
		srfn.Component.extend(SimpleItem);
		return SimpleItem

	})();



	srfn.components.add('SimpleItem', function(config){
		return new srfn.SimpleItem(config);
	});

	
})($sr = window.$sr = window.$sr || {});