/**
 * @license sunriseJS Game Engine
 * @copyright (C) 2014 - 2014 Jonas Gerdes, Jonathan Wiemers
 * http://www.sunrisejs.net
 *
 * sunriseJS is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license.php
 *
 */


/**
 * Component of a Entity
 */
srfn.Component = (function(){ 


	Component = function(){
		var self = this;
		this.receiver = {}; //Listener for certain events(specified with .on()) are saved here

		//Every component should know, which entity it's working for
		this.on('setEntity', function(data){
			self.entity = data.entity;
			self.data = data.data;
			self.init();
		});
	};

	srfn.CoreObject.extend(Component);

	Component.prototype.init = function(){

	};
    
	/**
	 * Method to add a listener for a specific event
	 * @param  {String}   what     name of the event
	 * @param  {Function} callback callback, which is called when event happens
	 * @param  {boolean}   force    whether existing callbacks should be overriden
	 */
	Component.prototype.on = function(what, callback, force){
		if(this.receiver[what] !== undefined && !force){
			throw new Error('Already defined a callback for "'+what+'"');
		}else{
			this.receiver[what] = callback;
		}
	};

	/**
	 * Is called when event happens, detects wheter event is handled by any callback, calls specific callback
	 * @param  {string} what name of the event
	 * @param  {[type]} data data providen for callback
	 */
	Component.prototype.receive = function(what, data){
		if(typeof this.receiver[what] !== 'undefined'){
			this.receiver[what](data);
		}
	};

	return Component;

})();

