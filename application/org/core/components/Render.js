/**
 * @license sunriseJS Game Engine
 * @copyright (C) 2014 - 2014 Jonas Gerdes, Jonathan Wiemers
 * http://www.sunrisejs.net
 *
 * sunriseJS is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license.php
 *
 */

/*
 * ComponentDescription
 * Render
 * Renders a sprite on screen, handels animation
 *
 * emits:
 *
 * receives:
 * 	draw {}
 * 	rotate {
 * 			radian - radians to rotate
 * 			[degree] - degrees to rotate
 * 			[isRelative] - is rotation relative?  			
 * 		}
 * 		
 * 	changeAnimation {
 * 			animation - name of animation
 * 			[frame] - frame number to start with
 * 			[restart] - if animation is already running, restart it?
 * 		}
 *
 * changeOpacity {
 * 			opacity - new opacity
 * }
 *
 * changeAnchor {
 * 			x - horizontal position of anchor
 * 			y - vertical position of anchor
 * }
 */
(function($sr){	
	var $rootScope = $sr.$rootScope;
	$sr.Render = (function(){ 


		var image,
			animations,
			width,
			height,
			rotation = 0,
			alpha = 1,
			anchor = { x: 0, y:0};

		/**
		 * Contructor of Render Component
		 * @param {String} image_name name of the image
		 * @param {Object} data       optional and may contain animation, rotation, alpha or anchor
		 */
		Render = function(image_name, extended_data){
			$sr.Component.call(this);
			var self = this;
			//Test whether image exists
			if(game.config.images[image_name] === undefined){
				throw new Error('No image with name "'+image_name+'" found');
			}
			var data = game.config.images[image_name];
			var data_ = extended_data || {};

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

			image = $rootScope.ressources.images[image_name];
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
			width = data.tileWidth;
			height = data.tileHeight;
			rotation = data_.rotation || 0;
			alpha = (data_.alpha === undefined) ? 1 : data_.alpha;
			animations = data.animations;
			anchor = data_.anchor || { x: 0, y:0};

			//Context from other modules
			this.context = $rootScope.canvas.context;

			if(data_.animation === undefined || animations[data_.animation] === undefined){
				//Until an actual animation is set, use first one
				for(anim in animations){
					this.currentAnimation = animations[anim];
					break;
				}
			}else{
				this.currentAnimation = animations[data_.animation];
			}

			this.currentFrame = 0;
			this.lastDrawTime = Date.now();
			this.frameDuration = 60; //in Milliseconds

			//Calculate values for spritesheet
			this.cols = Math.floor( image.width / width );
			this.rows = Math.floor( image.height / height );



			this.on('draw', function(data){
				var d = self.entity.getData(),
				x = d.x + data.offsetX,
				y = d.y + data.offsetY;

				x -= anchor.x;
				y -= anchor.y;

				if(alpha !== 1){
					var oldAlpha = self.context.globalAlpha;
					self.context.globalAlpha = alpha;
				}

				if(rotation !== 0){
					self.context.save();
					self.context.translate(x,y);
					self.context.rotate(rotation);
					self.context.translate(-x,-y);
				}
			
				var drawWidth = d.width || width;
				var drawHeight = d.height || height;
				var frame = self.currentAnimation[self.currentFrame];


				var sourceX = (frame % self.cols)*width;
				var sourceY = Math.floor(frame / self.cols)*height;

				self.context.drawImage(image, sourceX, sourceY, width, height, 
							x, y, drawWidth, drawHeight);
				 

				var now = Date.now();
				var delta = now - self.lastDrawTime;
				if(delta >= self.frameDuration){
					self.currentFrame++;
					if(self.currentFrame >= self.currentAnimation.length){
						self.currentFrame = 0;
					}
					self.lastDrawTime = now;
				}


				if(alpha !== 1){
					self.context.globalAlpha = oldAlpha;
				}
				if(rotation !== 0){
					self.context.restore();
				}

			});


			this.on('rotate', function(data){
				var rads = 0;
				if(data.degree !== undefined){
					rads = data.degree* Math.PI / 180
				}else{
					rads = data.radian;
				}
				if(data.isRelative){
					rotation += rads;
				}else{
					rotation = rads;
				}
				rotation %= 2*Math.PI; //handle angles larger then 2*pi
			});


			this.on('changeAnimation', function(data){
		
			});

			this.on('changeOpacity', function(data){
				opacity = data.opacity || 0;
				opacity = opacity > 1 ? 1: (opacity < 0 ? 0: opacity);
			});
		}

		$sr.Component.extend(Render);

		return Render;

	})();

	
})($sr = window.$sr = window.$sr || {});