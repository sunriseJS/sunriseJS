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
	

	
	$sr.Entity = (function(){ 

		//private Data
	    var components = [];

	    var x = 0,
	    	y = 0,
	    	width = 0,
	    	height = 0;


	    //constructor
	    function Entity(){
	    	if(arguments.length < 4){
	    		throw new Error('Define at least x, y, width and height!');
	    	}
	    	x = arguments[0];
	    	y = arguments[1];
	    	width = arguments[2];
	    	height = arguments[3];
	 		for(var i=4; i<arguments.length; i++){
	 			components.push(arguments[i]);
	 			arguments[i].receive('setEntity', this);
	 		}
		} 

		$sr.CoreObject.extend(Entity);


		Entity.prototype.emit = function(what, data){
			components.forEach(function(component){
				component.receive(what, data);
			});
		}	    

		Entity.prototype.getData = function(){
			return {x:x, y:y, width:width, height:height};
		}
	    

	    return Entity;
	})();

	
})($sr = window.$sr = window.$sr || {});