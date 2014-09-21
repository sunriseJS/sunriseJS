/**
 * @license sunriseJS Game Engine
 * @copyright (C) 2014 - 2014 Jonas Gerdes, Jonathan Wiemers
 * http://www.sunrisejs.net
 *
 * sunriseJS is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license.php
 *
 *
 */
(function($sr){	
	var $rootScope = $sr.$rootScope;
	var entities = [];
	var layerBuffers = [];

	$sr.stage = {};
	var focus = {};
	var offset = {
		x : 0,
		y : 0
	}

	//Creator functions for different layer types
	var layerCreator = {
		//tilesets
		tiles : function(layer, width, height){
			tilesetInfo = game.config.images[layer.tileset],
			tileset = $rootScope.ressources.images[layer.tileset],
			tileWidth = tilesetInfo.tileWidth,
			tileHeight = tilesetInfo.tileHeight,
			canvas = document.createElement('canvas'),
			context = canvas.getContext('2d');
			canvas.width = width;
			canvas.height = height;
			layer.tiles.forEach(function(tile){
				var setX = tile[2]*tileWidth,
					setY = tile[3]*tileHeight,
					levelX = tile[0]*tileWidth,
					levelY = tile[1]*tileHeight;
				context.drawImage(tileset,setX, setY, tileWidth, tileHeight,
										levelX, levelY, tileWidth, tileHeight);
			});
			return {buffer:canvas};
		},
		//simple image
		image : function(layer, width, height){
			var canvas = document.createElement('canvas'),
				context = canvas.getContext('2d'),
				image = $rootScope.ressources.images[layer.image];
			canvas.width = width;
			canvas.height = height;
			//calculate width and height for image, depends on which
			//tye for size was choosen 
			//stretch - stretch image to fit level
			//loop - tile image to fill level
			//original - draw image once in original size
			var w,h;
			switch(layer['size-x']){
				case 'stretch': w = width;break;
				case 'loop' : 
				case 'original':
				case undefined : w = image.width; break;
				default: throw new Error('Unknow size-x: "'+layer['size-x']+'".');
			}

			switch(layer['size-y']){
				case 'stretch': h = height;break;
				case 'loop' : 
				case 'original':
				case undefined : h = image.height; break;
				default: throw new Error('Unknow size-x: "'+layer['size-x']+'".');
			}


			//draw image once or multiple times on canvas (depends on size)
			var x = 0,
				y = 0;

			do{
				do{
					context.drawImage(image, 0, 0, image.width, image.height, x, y, w, h);
					x += w;
				}while(x<width && layer['size-x']!=='original');

				y += h;
				x = 0;
			}while(y<height && layer['size-y']!=='original');

			return {buffer:canvas, scrollX: layer['scroll-x'],scrollY: layer['scroll-y']};
		}
	}

	/**
	 * Adds an entity to the stage so it is drawn every render step
	 * @param {[Entity]} entity which sould be added to stage
	 */
	$sr.stage.add = function(entity){
		if(!entity instanceof $sr.Entity){
			throw new Error('Only entities can be added to stage');
		}
		entities.push(entity);
	}

	/**
	 * sets level for the stage. a level defines, 
	 * where different entites are spawned (TODO: not implemented yet)
	 * and different layers of tiles / background images/ foreground images
	 * @param {[String]} levelname name is looked up in ressources manager, where 
	 * level was initial stored
	 */
	$sr.stage.setLevel = function(levelname){
		if($rootScope.ressources.levels[levelname] === undefined){
			throw new Error('No level with name "'+levelname+'" found.');
		}
		var level = $rootScope.ressources.levels[levelname],
			levelWidth = level.width, 
			levelHeight =level.height;

		level.layer.forEach(function(layer){
			if(layerCreator[layer.type] === undefined){
				throw new Error('Invalid layer type "'+layer.type+'"');
			}else{
				//call appropriate creator function for layer, if there is one for the given type
				var layerBuffer = layerCreator[layer.type](layer, levelWidth, levelHeight);
				if(layerBuffer !== undefined){
					layerBuffer.x = layer.x || 0;
					layerBuffer.y = layer.y || 0;
					layerBuffers.push(layerBuffer);
				}else{
					throw new Error('Error while creating level');
				}
				
			}
		});
		var style = '';
		if(typeof level.background === 'object'){
			var bg = level.background;
			if(bg.color !== undefined){
				style = bg.color;
			}else if(bg.from !== undefined
					&& bg.to !== undefined){
				style = 'linear-gradient(to bottom, '+bg.from+' 0%,'+bg.to+' 100%)';
			}
		}
		console.log("style:",style);
		$rootScope.canvas.style.background = style;

	}

	/**
	 * Sets focus of the stage to an Entity or a position (x,y), moves with entity
	 * @param {Number/Entity} x  Either an entity to follows or an position on x-axis
	 * @param {[type]} y  If x is an Entity, offset on x-axis, otherwise position on y-axis
	 * @param {[type]} yy Only needed if x is an Entity. Offset on y-axis
	 */
	$sr.stage.setFocus = function(x,y,yy){
		if(x instanceof $sr.Entity){
			focus.entity = x;
			focus.xoffset = y || 0;
			focus.yoffset = yy || 0;
		}else{
			focus.x = x;
			focus.y = y;
			focus.entity = undefined;
		}
	}

	/**
	 * Draw stage which all layers and entities.
	 * Layers are drawn first in order of the layers array in the json file of the layer
	 * Entities are drawn on top (TODO: implement foreground layers)
	 */
	$rootScope.drawStage = function(){
		//Quick & dirty, maybe add a init function to stage?
		if(focus.x === undefined){
			focus.x= $rootScope.canvas.width/2;
			focus.y= $rootScope.canvas.height/2;
			focus.centerX = $rootScope.canvas.width/2;
			focus.centerY = $rootScope.canvas.height/2;
		}
		if(focus.entity !== undefined){
			focus.x = focus.entity.position.x + focus.xoffset;
			focus.y = focus.entity.position.y + focus.yoffset;
		}

		
		layerBuffers.forEach(function(layer){
			var x = focus.centerX - focus.x*(layer.scrollX || 1)+layer.x,
				y = focus.centerY - focus.y*(layer.scrollY || 1)+layer.y;	
			$rootScope.canvas.context.drawImage(layer.buffer,x,y);			
		});

		offset.x = focus.centerX - focus.x;
		offset.y = focus.centerY - focus.y;

		entities.forEach(function(entity){
			entity.draw(offset.x, offset.y);
		});
	}

	
})($sr = window.$sr = window.$sr || {});