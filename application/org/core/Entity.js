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

	    //constructor
	    function Entity(){
	 		for(var i=0; i<arguments.length; i++){
	 			components.push(arguments[i]);
	 		}
		} 

		$sr.Sprite.extend(Entity);


		Entity.prototype.emit = function(what,message){
			components.forEach(function(component){
				component.receive(what, message);
			});
		}	    
	    

	    return Entity;
	})();

	
})($sr = window.$sr = window.$sr || {});