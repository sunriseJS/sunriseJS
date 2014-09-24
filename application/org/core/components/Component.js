/**
 * @license sunriseJS Game Engine
 * @copyright (C) 2014 - 2014 Jonas Gerdes, Jonathan Wiemers
 * http://www.sunrisejs.net
 *
 * sunriseJS is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license.php
 *
 */
(function($sr){	
	var $rootScope = $sr.$rootScope;
	$sr.Component = (function(){ 


		//private Data
		var receiver = {}


		Component = function(){
			var self = this;
			this.on('setEntity', function(data){
				self.entity = data;
			});
		}

		$sr.CoreObject.extend(Component);

		Component.prototype.on = function(what, callback){
			if(receiver[what] !== undefined){
				throw new Error('Already defined a callback for "'+what+'"');
			}else{
				receiver[what] = callback;
			}
		}

		Component.prototype.receive = function(what, data){
			if(receiver[what] !== undefined){
				receiver[what](data);
			}
		}

		return Component;

	})();

	
})($sr = window.$sr = window.$sr || {});