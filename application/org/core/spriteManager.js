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

	//Classes

	$sr.Sprite = function(image, width, height, animations){
		this.image = image;
		this.width = width;
		this.height = height;
		this.rotation = 0;
		this.alpha = 1;
		this.animations = animations;

		//Context from other modules
		this.context = $rootScope.canvas.context;

		//Until an actual animation is set, use first one
		for(anim in animations){
			this.currentAnimation = animations[anim];
			break;
		}

		this.currentFrame = 0;
		this.lastDrawTime = Date.now();
		this.frameDuration = 60; //in Milliseconds

		//Calculate values for spritesheet

		this.cols = Math.floor( image.width / width );
		this.rows = Math.floor( image.height / height );

	}

	/**
	 * Draws itselfs at the specified position.
	 * @param x Horizontal position
	 * @param y Vertical position
	 * @param w Width of drawn image. Useful for stretching. Optional.
	 * @param h Height of drawn image. Useful for stretching. Optional.
	 */
	$sr.Sprite.prototype.draw = function(x, y, w, h){

		if(this.alpha !== 1){
			var oldAlpha = this.context.globalAlpha;
			this.context.globalAlpha = this.alpha;
		}

		if(this.rotation !== 0){
			this.context.save();
			this.context.translate(x,y);
			this.context.rotate(this.rotation);
			this.context.translate(-x,-y);
		}
	
		var width = w || this.width;
		var height = h || this.height;
		var frame = this.currentAnimation[this.currentFrame];

		var sourceX = (frame % this.cols)*this.width;
		var sourceY = Math.floor(frame / this.rows)*this.height;

		this.context.drawImage(this.image, sourceX, sourceY, this.width, this.height, 
					x, y, width, height);
	

		var now = Date.now();
		var delta = now - this.lastDrawTime;
		if(delta >= this.frameDuration){
			this.currentFrame++;
			if(this.currentFrame >= this.currentAnimation.length){
				this.currentFrame = 0;
			}
			this.lastDrawTime = now;
		}


		if(this.alpha !== 1){
			this.context.globalAlpha = oldAlpha;
		}
		if(this.rotation !== 0){
			this.context.restore();
		}

	}

	/**
	 * Change current animation of the sprite
	 * @param String animationName name of the animation which should be played
	 * @param Integer startFrame	frame the animation should start at, optional
	 */
	$sr.Sprite.prototype.setAnimation = function(animationName, startFrame){
		if(this.animations[animationName] === undefined){
			throw new Error('No animation with name '+animationName+' found');
		}
		this.currentAnimation = this.animations[animationName];
		this.currentFrame = startFrame || 0;
	}


	$sr.Sprite.prototype.setRotationDeg = function(angle){
		this.setRotationRad(angle* Math.PI / 180);
	}

	$sr.Sprite.prototype.setRotationRad = function(angle){
		angle %= 2*Math.PI; //handle angles larger then 2*pi
		this.rotation = angle
	}

	$sr.Sprite.prototype.setAlpha = function(alpha){
		//alpha has to be between 0 and 1
		alpha = alpha < 0 ? 0 : alpha;
		alpha = alpha > 1 ? 1 : alpha;
		this.alpha = alpha;
	}

	/**
	 * Loads an imagefile an creates a sprite from it.
	 * If tileWidth and tileHeight is spezified in data, the image is interpreted as spritesheet.
	 * If animation is spezified in data,  
	 *
	 * The sprite is saved in sprite database.
	 *
	 * data example:
	 * 	{
	 *		name: "playersprite",
	 *		image:"imagename",
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
	
	//Todo: Think of some way to know, when Sprite is ready. Callback?
	$sr.createSprite = function(data) {

		//Test whether all required parameters are given
		var requiredParams = ['name', 'image'];
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

		
		if($rootScope.ressources.images[data.image] === undefined){
			throw new Error('Imageressource with name '+data.image+' doesn\'t exists. Load it in config first!');
		}

		var image = $rootScope.ressources.images[data.image];
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
	$sr.getSprite = function(name){
		return spritePool[name];
	}
	
})(window.$sr = window.$sr || {});