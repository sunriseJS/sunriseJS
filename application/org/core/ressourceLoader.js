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
	$rootScope.ressources = {images:{}, sprites:{}, audio:{}, levels: {}};


	/**
	 * loads images from files.
	 * Example for sources:
	 * sources = {"hero" : "my/path/hero.png"}
	 * @param   sources imagefiles and names
	 * @param  callback which is called when all images are loaded
	 */
	$sr.loadImages = function(sources_raw, callback){

		//copy source object, so original object isn't affected by
		//removin already loaded images from this object
		var sources = {};
		for(key in sources_raw){
			sources[key] = sources_raw[key];
		}


		for(title in sources){
			

			//IFFE which is executed for every image
			(function(name, source){
				var sourceFile;
				var spriteConfig;
				//Test whether there is a string for path only or a complex object for animation
				console.log(source);
				if(typeof source === 'object'){
					if(source.source === undefined){
						throw new Error('No attribute "source" found in image '+title);
					}
					sourceFile = source.source;
					spriteConfig = source;
					spriteConfig.name = title;
				}else{
					sourceFile = source;
					spriteConfig = {};
					spriteConfig.name = title;
				}
				if($rootScope.ressources.images[name] !== undefined){
					throw new Error('Imageressource with name '+name+' already exists');
				}
				var image = new Image();
				image.onload = function() {

					delete sources[name];
					$rootScope.ressources.images[name] = this;

					//$rootScope.createSprite(spriteConfig);

					//Last image got loaded? notify callback!
					var ready = true;
					for(index in sources){
						ready = false;
						break;
					}
					if(ready){
						callback();
					}

				}
				image.src = sourceFile;
			})(title, sources[title]);
		}

	}

	/**
	 * loads levels from files.
	 * Example for sources:
	 * sources = {"level1" : "my/path/level.json"}
	 * @param   sources imagefiles and names
	 * @param  callback which is called when all images are loaded
	 */
	$sr.loadLevels = function(levelSources, callback){

		//copy source object, so original object isn't affected by
		//removin already loaded images from this object
		var sources = {};
		for(key in levelSources){
			sources[key] = levelSources[key];
		}

		for(key in sources){
			$sr.util.ajax(sources[key], function(data){
				$rootScope.ressources.levels[key] = JSON.parse(data);
				delete sources[key];
				//Last level got loaded? notify callback!
				var ready = true;
				for(index in sources){
					ready = false;
					break;
				}
				if(ready){
					callback();
				}
			});
		}
	}

	
})(window.$sr = window.$sr || {});