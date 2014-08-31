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

	/**
	 * Used so some functions (e.g. add ) can be
	 * called both with values for x,y and with an actual Vec2 object.
	 * @param  Number/Vec2 x 		value for x or existing Vec2 object
	 * @param  Number y           value for y (optional if x is Vec2)
	 * @param  function(Vec2) calculation function which will be called with an Vec2
	 */
	function executeCalculation(x, y, calculation){
		if(typeof x === 'object'){
			if(!x instanceof $sr.util.Vec2){
				throw new Error('Can\'t use '+x+'as Vec2');
			}
			calculation(x);
		}else{
			if(y === undefined || typeof y ==='undefined'){
				throw new Error('Excpected value for y');
			}
			calculation(new $sr.util.Vec2(x,y));
		}
	}


	/**
	 * Vec2 is a vector with basic math
	 * @param Number/Vec2 x Value for x oder existing Vec2 object which will be copied
	 * @param Number y Value for y (optional if x is Vec2)
	 */
	$sr.util.Vec2 = function(x, y){
		if(typeof x === 'object'){
			if(!x instanceof $sr.util.Vec2){
				throw new Error('Can\'t use '+x+'as Vec2');
			}
			this.x = x.x;
			this.y = x.y;
		}else{
			this.x = x;
			this.y = y;
		}
	}


	/**
	 * Adds a Vec2 to itself
	 * @param Number/Vec2 x Vector to be added or value for 
	 * @param Number value for y
	 */
	$sr.util.Vec2.prototype.add = function(x, y){
		var self = this;
		executeCalculation(x, y, function(other){
			self.x += other.x;
			self.y += other.y;
		});
	}


	/**
	 * Adds to vectors together
	 * @param Vec2 first
	 * @param Vec2 second
	 * @return Vec2 Sum of both vectors
	 */
	$sr.util.Vec2.add = function(first, second){
		return new $sr.util.Vec2(first.x+second.x, first.y+second.y);
	}

	/**
	 * Subtracts a Vec2 from itself
	 * @param Number/Vec2 x Vector to be subtracted or value for 
	 * @param Number value for y
	 */
	$sr.util.Vec2.prototype.subtract = function(x, y){
		var self = this;
		executeCalculation(x, y, function(other){
			self.x -= other.x;
			self.y -= other.y;
		});
	}


	/**
	 * Subtracts first from seconds
	 * @param Vec2 first
	 * @param Vec2 second
	 * @return Vec2 Difference of both vectors
	 */
	$sr.util.Vec2.subtract = function(first, second){
		return new $sr.util.Vec2(first.x-second.x, first.y-second.y);
	}

	//Shorter Versions
	$sr.util.Vec2.prototype.sub = $sr.util.Vec2.prototype.subtract;
	$sr.util.Vec2.sub = $sr.util.Vec2.subtract;

	


	

	
})($sr = window.$sr = window.$sr || {});