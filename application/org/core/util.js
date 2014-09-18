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
	 * Loads data asynchronous from URL
	 * @param  {String}   url      URL, data shoould be fetched from
	 * @param  {Function} callback is called when data is available
	 * @param  {String}   data     response from URL
	 */
	$sr.util.ajax = function(url,callback, data){
		var request;
		if (window.XMLHttpRequest){
		    request=new XMLHttpRequest();
		}else{
		    request=new ActiveXObject("Microsoft.XMLHTTP");
		}
		request.onreadystatechange=function(){
		    if (request.readyState==4 && request.status==200){
		        callback(request.responseText);
		    }
		}       
		request.open("POST",url,true);

		if(data){
			request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			request.send(data);
		}else{
			request.send();
		}
		
	}

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

	//shorter versions
	$sr.util.Vec2.prototype.sub = $sr.util.Vec2.prototype.subtract;
	$sr.util.Vec2.sub = $sr.util.Vec2.subtract;



	/**
	 * multiplies vector with scalar
	 * @param  Number factor Scalar the vector will be multiplied by
	 * @return {[type]}        [description]
	 */
	$sr.util.Vec2.prototype.multiply = function(factor){
		this.x *= factor;
		this.y *= factor;
	}

	/**
	 * multiplies a vector by a scalar
	 * @param  Vec2 vector
	 * @param  Number scalar 
	 * @return Vec2        new vector
	 */
	$sr.util.Vec2.multiply = function(vector, scalar){
		var vec =  new $sr.util.Vec2(vector);
		vec.multiply(scalar);
		return vec;
	}


	//shorter version
	$sr.util.Vec2.prototype.mul = $sr.util.Vec2.prototype.multiply;
	$sr.util.Vec2.mul = $sr.util.Vec2.multiply;


	/**
	 * divides a vector by a scalar
	 * @param  Number factor Scalar the vector will be divided by
	 * @return {[type]}        [description]
	 */
	$sr.util.Vec2.prototype.divide = function(factor){
		this.multiply(1/factor);
	}

	/**
	 * divides a vector by a scalar
	 * @param  Vec2 vector
	 * @param  Number scalar 
	 * @return Vec2        new vector
	 */
	$sr.util.Vec2.divide = function(vector, scalar){
		var vec =  new $sr.util.Vec2(vector);
		vec.divide(scalar);
		return vec;
	}


	//shorter version
	$sr.util.Vec2.prototype.div = $sr.util.Vec2.prototype.divide;
	$sr.util.Vec2.div = $sr.util.Vec2.divide;


	//find out the Size of an Object
	Object.size = function(obj) {
	    var size = 0, key;
	    for (key in obj) {
	        if (obj.hasOwnProperty(key)) size++;
	    }
	    return size;
	};

	// 
	Array.prototype.unique = function() {
	    var a = this.concat();
	    for(var i=0; i<a.length; ++i) {
	        for(var j=i+1; j<a.length; ++j) {
	            if(a[i] === a[j])
	                a.splice(j--, 1);
	        }
	    }

	    return a;
	};



	
})($sr = window.$sr = window.$sr || {});