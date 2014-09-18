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
	    var sprite;
	    var pos;

	    //constructor
	    function Entity(x, y, imageName){
	    	$sr.Sprite.call(this,imageName);
			pos = new $sr.util.Vec2(x,y);


			//public accessable data
			this.position = pos;
		} 

		$sr.Sprite.extend(Entity);


		Entity.prototype.draw = function(x,y){
			var x = x || 0,
				y = y || 0;
			this.super_.draw.call(this,pos.x+x,pos.y+y);
		}	    
	    

	    return Entity;
	})();

	
})($sr = window.$sr = window.$sr || {});