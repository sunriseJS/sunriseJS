(function(sr) {
	_private = sr._private;

	_private.spritePool = []; //container for all sprites

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
	sr.createSprite = function(data) {

		//Test whether all required parameters are given
		var requiredParams = ['name', 'src'];
		if(data.tileWidth !== undefined || data.tileHeight !== undefined || data.animations !== undefined){
			requiredParams.push('tileWidth');
			requiredParams.push('tileHeight');
		}
		for(param in requiredParams){
			if(data[param] === undefined){
				throw new Error('No element "'+param+'" specified in data');
			}
		}

	}
	
})(window.sr = window.sr || {});