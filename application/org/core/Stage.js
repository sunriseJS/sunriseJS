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
		x: 0,
		y: 0
	};

	var layerCreator = {
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
			return canvas;
		},
		image : function(layer, width, height){
			var canvas = document.createElement('canvas'),
				context = canvas.getContext('2d'),
				image = $rootScope.ressources.images[layer.image];
			canvas.width = width;
			canvas.height = height;
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

			return canvas;
		}
	}

	$sr.stage.add = function(entity){
		if(!entity instanceof $sr.Entity){
			throw new Error('Only entities can be added to stage');
		}
		entities.push(entity);
		console.log('added to stage. entities:',entities);
	}

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
				var layerCanvas = layerCreator[layer.type](layer, levelWidth, levelHeight);
				if(layerCanvas !== undefined){
					layerBuffers.push(layerCanvas);
				}else{
					throw new Error('Error while creating level');
				}
				
			}
		});

	}

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

		offset.x = focus.centerX - focus.x;
		offset.y = focus.centerY - focus.y;
		layerBuffers.forEach(function(buffer){
			$rootScope.canvas.context.drawImage(buffer,offset.x,offset.y);			
		});

		entities.forEach(function(entity){
			entity.draw(offset.x, offset.y);
		});
	}

	
})($sr = window.$sr = window.$sr || {});