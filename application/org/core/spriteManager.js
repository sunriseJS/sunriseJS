/**
 * @license sunriseJS Game Engine
 * @copyright (C) 2014 - 2014 Jonas Gerdes, Jonathan Wiemers
 * http://www.sunrisejs.net
 *
 * sunriseJS is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license.php
 *
 */

(function($sr) {
	var $rootScope = $sr.$rootScope;

	var spritePool = {}; //container for all sprites

	$sr.printSprites = function(){
		for(name in spritePool){
			console.log(name,spritePool[name]);
		}
	}


	/**
	 * Loads an imagefile and creates a sprite from it.
	 * If tileWidth and tileHeight is spezified in data, the image is interpreted as spritesheet.
	 * If animation is spezified in data,  
	 *
	 * The sprite is saved in sprite database.
	 *
	 * data example:
	 * 	{
	 *		name: "playersprite",
	 *		tileWidth:10,
	 *		tileHeight:50,
	 *		animations: {
	 *			"stand" : [0],
	 *			"running" : [0,1,2,3,4],
	 *			"jump" : [5,6,4,6]
	 *		}
	 *	}
	 * 
	 * @param  
	 * @return void
	 */
	
	$rootScope.createSprite = function(data) {

		//Test whether all required parameters are given
		var requiredParams = ['name'];
		if(data.tileWidth !== undefined || data.tileHeight !== undefined || data.animations !== undefined){
			requiredParams.push('tileWidth');
			requiredParams.push('tileHeight');
		}

		requiredParams.forEach(function(param){
			if(data[param] === undefined || data[param] === ""){
				throw new Error('No element "'+param+'" specified in data');
			}
		});

		//Name already used?
		if(spritePool[data.name] !== undefined){
			throw new Error('Sprite with name '+data.name+' already exists');
		}

		
		if($rootScope.ressources.images[data.name] === undefined){
			throw new Error('Imageressource with name '+data.name+' doesn\'t exists. Load it in config first!');
		}


		var image = $rootScope.ressources.images[data.name];
		if(data.tileWidth === undefined){
			data.tileWidth = image.width;
			data.tileHeight = image.height;
		}
		if(data.animations === undefined){
			data.animations = {};
		}
		//Make sure there is at least one animation
		if(data.animations.default === undefined){
			data.animations.default = [0];
		}

		
		spritePool[data.name] = new $sr.Sprite(image, data.tileWidth, data.tileHeight, data.animations);



		


	}
	$rootScope.getSprite = function(name){
		return spritePool[name];
	}
	
})(window.$sr = window.$sr || {});