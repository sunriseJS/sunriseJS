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
	    var rotation;
	    var alpha;
	    var pos;

	    //constructor
	    function Entity(x, y, imageName){
			pos = new $sr.util.Vec2(x,y);
			sprite = $rootScope.getSprite(imageName);
			rotation = 0;
			alpha = 1;


			//public accessable data
			this.position = pos;
		} 


		Entity.prototype.draw = function(){
			sprite.setAlpha(alpha);
			sprite.setRotationRad(rotation);
			sprite.draw(pos.x, pos.y);
		}

		Entity.prototype.setAnimation = function(animation, startframe){
			if(startframe === undefined){
				sprite.setAnimation(animation);
			}else{
				sprite.setAnimation(animation, startframe);
			}
		}

	    
	    

	    return Entity;
	})();

	
})($sr = window.$sr = window.$sr || {});