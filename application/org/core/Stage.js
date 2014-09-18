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
	var levelBuffer;

	$sr.stage = {};

	$sr.stage.add = function(entity){
		if(!entity instanceof $sr.Entity){
			throw new Error('Only entities can be added to stage');
		}
		entities.push(entity);
		console.log('added to stage. entities:',entities);
	}

	$sr.stage.setLevel = function(level){
		var tilesetInfo = game.config.images[level.tileset],
			tileset = $rootScope.ressources.images[level.tileset],
			levelWidth = tilesetInfo.tileWidth*level.width, 
			levelHeight = tilesetInfo.tileHeight*level.height,
			tileWidth = tilesetInfo.tileWidth,
			tileHeight = tilesetInfo.tileHeight,
			canvas = document.createElement('canvas'),
			context = canvas.getContext('2d');
		canvas.width = levelWidth;
		canvas.height = levelHeight;
		level.tiles.forEach(function(tile){
			var setX = tile[2]*tileWidth,
				setY = tile[3]*tileHeight,
				levelX = tile[0]*tileWidth,
				levelY = tile[1]*tileHeight;
			context.drawImage(tileset,setX, setY, tileWidth, tileHeight,
									levelX, levelY, tileWidth, tileHeight);
		});
		levelBuffer = canvas;

	}

	$rootScope.drawStage = function(){
		if(levelBuffer !== undefined){

			$rootScope.canvas.context.drawImage(levelBuffer,0,0);
		}
		entities.forEach(function(entity){
			entity.draw();
		});
	}

	
})($sr = window.$sr = window.$sr || {});