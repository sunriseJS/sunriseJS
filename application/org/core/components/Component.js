/**
 * @license sunriseJS Game Engine
 * @copyright (C) 2014 - 2014 Jonas Gerdes, Jonathan Wiemers
 * http://www.sunrisejs.net
 *
 * sunriseJS is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license.php
 *
 */

$sr.Component = (function(){ 


	Component = function(){
		var self = this;
		this.receiver = {}
		this.on('setEntity', function(data){
			self.entity = data;
		});
	}

	$sr.CoreObject.extend(Component);

	Component.prototype.on = function(what, callback, force){
		if(this.receiver[what] !== undefined && !force){
			throw new Error('Already defined a callback for "'+what+'"');
		}else{
			this.receiver[what] = callback;
		}
	}

	Component.prototype.receive = function(what, data){
		if(this.receiver[what] !== undefined){
			this.receiver[what](data);
		}
	}

	return Component;

})();

