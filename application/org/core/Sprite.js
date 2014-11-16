/**
 * @license sunriseJS Game Engine
 * @copyright (C) 2014 - 2014 Jonas Gerdes, Jonathan Wiemers
 * http://www.sunrisejs.net
 *
 * sunriseJS is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license.php
 *
 *
 * 
 * @param  {[type]} sr
 * @return {[type]}
 */
srfn.Sprite = (function () { 


	//private Data
	var image_,
		width_,
		height_,
		animations_;


	Sprite = function(image_name){

		//Test whether image exists
		if(game.config.images[image_name] === undefined){
			throw new Error('No image with name "'+image_name+'" found');
		}
		var data = game.config.images[image_name];

		//Test whether all required parameters are given
		var requiredParams = [];
		if(data.tileWidth !== undefined || data.tileHeight !== undefined || data.animations !== undefined){
			requiredParams.push('tileWidth');
			requiredParams.push('tileHeight');
		}

		requiredParams.forEach(function(param){
			if(data[param] === undefined || data[param] === ""){
				throw new Error('No element "'+param+'" specified in data');
			}
		});

		var image = $rootScope.ressources.images[image_name];
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

		//private attributes
		image_ = image;
		width_ = data.tileWidth;
		height_ = data.tileHeight;
		this.rotation = 0;
		this.alpha = 1;
		animations_ = data.animations;
		this.anchor = { x: 0, y:0};

		//Context from other modules
		this.context = $rootScope.canvas.context;

		//Until an actual animation is set, use first one
		for(anim in animations_){
			this.currentAnimation = animations_[anim];
			break;
		}

		this.currentFrame = 0;
		this.lastDrawTime = Date.now();
		this.frameDuration = 60; //in Milliseconds

		//Calculate values for spritesheet
		this.cols = Math.floor( image.width / width_ );
		this.rows = Math.floor( image.height / height_ );

	}

	srfn.CoreObject.extend(Sprite);

	/**
	 * Draws itselfs at the specified position.
	 * @param x Horizontal position
	 * @param y Vertical position
	 * @param w Width of drawn image. Useful for stretching. Optional.
	 * @param h Height of drawn image. Useful for stretching. Optional.
	 */
	Sprite.prototype.draw = function(x, y, w, h){

		x -= this.anchor.x;
		y -= this.anchor.y;

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
	
		var width = w || width_;
		var height = h || height_;
		var frame = this.currentAnimation[this.currentFrame];


		var sourceX = (frame % this.cols)*width_;
		var sourceY = Math.floor(frame / this.cols)*height_;

		this.context.drawImage(image_, sourceX, sourceY, width_, height_, 
					x, y, width, height);
		// console.log("frame:"+frame, "cols:"+this.cols, "rows:"+this.rows, "sourceX:"+sourceX, "sourceY:"+sourceY, "this.cols:"+this.cols, "height_:"+height_
		// );
	

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
	Sprite.prototype.setAnimation = function(animationName, startFrame){
		if(animations_[animationName] === undefined){
			throw new Error('No animation with name '+animationName+' found');
		}
		if(this.currentAnimation == animations_[animationName] && startFrame === undefined){
			return;	
		}
		this.currentAnimation = animations_[animationName];
		this.currentFrame = startFrame || 0;
	}


	Sprite.prototype.setRotationDeg = function(angle){
		this.setRotationRad(angle* Math.PI / 180);
	}

	Sprite.prototype.setRotationRad = function(angle){
		angle %= 2*Math.PI; //handle angles larger then 2*pi
		this.rotation = angle
	}

	Sprite.prototype.setAlpha = function(alpha){
		//alpha has to be between 0 and 1
		alpha = alpha < 0 ? 0 : alpha;
		alpha = alpha > 1 ? 1 : alpha;
		this.alpha = alpha;
	}

	Sprite.prototype.setAnchor = function(x,y){
		if(typeof x === 'object' && typeof x.x !== 'undefined' && typeof x.y !== 'undefined'){
			this.anchor.x = x.x;
			this.anchor.y = x.y;
		}else{
			this.anchor.x = x;
			this.anchor.y = y;
		}
	}

	return Sprite;

})();