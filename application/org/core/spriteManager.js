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
		this.animations = animations;

		//Context from other modules
		this.context = $rootScope.canvas.context;

		//Until an actual animation is set, use first one
		for(anim in animations){
			this.currentAnimation = anim;
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
		var width = w || this.width;
		var height = h || this.height;
		var frame = this.currentAnimation[this.currentFrame];

		var sourceX = frame % this.cols;
		var sourceY = Math.floor(frame / this.rows);
		this.context.drawImage(this.image, sourceX, sourceY, this.width, this.height, 
					x, y, width, height);

		var now = Date.now();
		var delta = now - this.lastDrawTime;
		if(delta >= this.frameDuration){
			this.currentFrame++;
			if(this.currentFrame >= this.currentAnimation.length){
				this.currentFrame = 0;
			}
		}

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
	 *		src:"img/bla.png",
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
		var requiredParams = ['name', 'src'];
		if(data.tileWidth !== undefined || data.tileHeight !== undefined || data.animations !== undefined){
			requiredParams.push('tileWidth');
			requiredParams.push('tileHeight');
		}
		requiredParams.forEach(function(param){
			if(data[param] === undefined || data[param] === ""){
				throw new Error('No element "'+param+'" specified in data');
			}
		});

		

		var image = new Image();
		image.onload = function() {
			if(data.tileWidth === undefined){
				data.tileWidth = this.width;
				data.tileHeight = this.height;
			}
			if(data.animations === undefined){
				data.animations = {};
			}
			//Make sure there is at least one animation
			if(data.animations.default !== undefined){
				data.animations.default = [0];
			}

			//Name already used? (Has to be checked here, otherwise some other sprite
			//	with an image, which loads faster, could already has the name
			if(spritePool[data.name] !== undefined){
				throw new Error('Sprite with name '+data.name+' already exists');
			}else{
				spritePool[data.name] = new $sr.Sprite(this, data.tileWidth, data.tileHeight, data.animations);
			}

		}
		image.src = data.src;


		


	}
	$sr.getSprite = function(name){
		return spritePool[name];
	}
	
})(window.$sr = window.$sr || {});