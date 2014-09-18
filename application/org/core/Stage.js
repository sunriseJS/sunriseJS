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
	var mapBuffer;

	$sr.stage = {};

	$sr.stage.add = function(entity){
		if(!entity instanceof $sr.Entity){
			throw new Error('Only entities can be added to stage');
		}
		entities.push(entity);
		console.log('added to stage. entities:',entities);
	}

	$sr.stage.setMap = function(map){
		var tilesetInfo = game.config.images[map.tileset],
			tileset = $rootScope.ressources.images[map.tileset],
			mapWidth = tilesetInfo.tileWidth*map.width, 
			mapHeight = tilesetInfo.tileHeight*map.height,
			tileWidth = tilesetInfo.tileWidth,
			tileHeight = tilesetInfo.tileHeight,
			canvas = document.createElement('canvas'),
			context = canvas.getContext('2d');
		canvas.width = mapWidth;
		canvas.height = mapHeight;
		map.tiles.forEach(function(tile){
			var setX = tile[2]*tileWidth,
				setY = tile[3]*tileHeight,
				mapX = tile[0]*tileWidth,
				mapY = tile[1]*tileHeight;
			context.drawImage(tileset,setX, setY, tileWidth, tileHeight,
									mapX, mapY, tileWidth, tileHeight);
		});
		mapBuffer = canvas;

	}

	$rootScope.drawStage = function(){
		if(mapBuffer !== undefined){

			$rootScope.canvas.context.drawImage(mapBuffer,0,0);
		}
		entities.forEach(function(entity){
			entity.draw();
		});
	}

	
})($sr = window.$sr = window.$sr || {});