/**
 * @license sunriseJS Game Engine
 * @copyright (C) 2014 - 2014 Jonas Gerdes, Jonathan Wiemers
 * http://www.sunrisejs.net
 *
 * sunriseJS is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * */


(function($sr){	
	$sr.CoreObject = (function(){

		//Make sure all derived ovjects can be extended
		CoreObject.extend = function(sub){
			sub.prototype = Object.create(this.prototype);
			sub.prototype.constructor = sub;
			sub.prototype.super_ = this.prototype;
			sub.extend = this.extend;
		}

	    function CoreObject(){
		} 
	   
	    return CoreObject;
	});

	
})($sr = window.$sr = window.$sr || {});