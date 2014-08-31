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


	$sr.util = {};

	$sr.util.Vec2 = function(x, y){
		this.x = x;
		this.y = y;
	}

	/**
	 * Adds to Vec2 together
	 * @param Vec2 other Vector to be added
	 * @return Sum of both vectors as new Vec2
	 */
	$sr.util.Vec2.prototype.add = function(other){
		if(!other instanceof $sr.util.Vec2){
			throw new Error('Can\'t add '+other+' to Vec2 ('+this+')');
		}
		return new $sr.util.Vec2(this.x+other.x, this.y+other.y);
	}
	

	
})($sr = window.$sr = window.$sr || {});