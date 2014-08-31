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
	    var pos;
	    var sprite;
	    var rotation;
	    var alpha;

	    //constructor
	    function Entity = function(x, y, imageName){
			pos = new $sr.util.Vec2(x,y);
			sprite = $rootScope.getSprite(imageName);
			rotation = 0;
			alpha = 0;
		} 


		Entity.prototype.draw = function(){
			sprite.setAlpha(alpha);
			sprite.setRotationRad(rotation);
			sprite.draw(pos.x, pos.y);
		}

	    
	    

	    return Entity;
	})();

	
})($sr = window.$sr = window.$sr || {});