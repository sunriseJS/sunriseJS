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
(function($sr){	
	var $rootScope = $sr.$rootScope;
	

	$sr.Sprite = (function(){ 


		Sprite = function(image, width, height, animations){
			this.image = image;
			this.width = width;
			this.height = height;
			this.rotation = 0;
			this.alpha = 1;
			this.animations = animations;
			this.anchor = { x: 0, y:0};

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
		
			var width = w || this.width;
			var height = h || this.height;
			var frame = this.currentAnimation[this.currentFrame];


			var sourceX = (frame % this.cols)*this.width;
			var sourceY = Math.floor(frame / this.cols)*this.height;

			this.context.drawImage(this.image, sourceX, sourceY, this.width, this.height, 
						x, y, width, height);
			// console.log("frame:"+frame, "cols:"+this.cols, "rows:"+this.rows, "sourceX:"+sourceX, "sourceY:"+sourceY, "this.cols:"+this.cols, "this.height:"+this.height
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
			if(this.animations[animationName] === undefined){
				throw new Error('No animation with name '+animationName+' found');
			}
			if(this.currentAnimation == this.animations[animationName] && startFrame === undefined){
				return;	
			}
			this.currentAnimation = this.animations[animationName];
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

	

})($sr = window.$sr = window.$sr || {});