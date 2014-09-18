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
	var focus = {};
	var offset = {
		x: 0,
		y: 0
	};

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
			tilesetInfo = game.config.images[level.tileset],
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
		if(levelBuffer !== undefined){

			$rootScope.canvas.context.drawImage(levelBuffer,offset.x,offset.y);
		}
		entities.forEach(function(entity){
			entity.draw(offset.x, offset.y);
		});
	}

	
})($sr = window.$sr = window.$sr || {});