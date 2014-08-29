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
	var $rootScope = sr.$rootScope;
	var $rootScope.ressources = {images:{}, audio:{}};


	/**
	 * loads images from files.
	 * Example for sources:
	 * sources = {"hero" : "my/path/hero.png"}
	 * @param   sources imagefiles and names
	 * @param  callback which is called when all images are loaded
	 */
	$sr.loadImages = function(sources, callback){

		for(name in srcArray){
			if($rootScope.ressources.images[name] !== undefined){
				throw new Error('Imageressource with name '+name+' already exists');
			}
			var image = new Image();
			image.onload = function() {
				delete srcArray[name];
				$rootScope.ressources.images[name] = image;
				var ready = true;
				for(index in srcArray){
					ready = false;
					break;
				}
				if(ready){
					callback();
				}

			}
			image.src = srcArray[name];
		}

	}

	
})(window.$sr = window.$sr || {});