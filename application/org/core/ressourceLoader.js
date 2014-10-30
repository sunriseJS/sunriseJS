/**
 * @license sunriseJS Game Engine
 * @copyright (C) 2014 - 2014 Jonas Gerdes, Jonathan Wiemers
 * http://www.sunrisejs.net
 *
 * sunriseJS is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license.php
 *
 */

$rootScope.ressources = {
	images  : {}, 
	sprites : {}, 
	sounds 	: {}, 
	levels 	: {},
	ui 		: {}
};


/**
 * loads images from files.
 * Example for sources:
 * sources = {"hero" : "my/path/hero.png"}
 * @param   sources imagefiles and names
 * @param  callback which is called when all images are loaded
 */
srfn.loadImages = function(sources_raw, callback){

	//copy source object, so original object isn't affected by
	//removin already loaded images from this object
	var sources = {};
	var sourcesLength = 0;
	for(key in sources_raw){
		sources[key] = sources_raw[key];
		sourcesLength++;
	}
	if(sourcesLength === 0){
		callback();
		return;
	}


	for(title in sources){
		

		//IFFE which is executed for every image
		(function(name, source){
			var sourceFile;
			var spriteConfig;
			//Test whether there is a string for path only or a complex object for animation
			if(typeof source === 'object'){
				if(source.source === undefined){
					throw new Error('No attribute "source" found in image '+title);
				}
				sourceFile = source.source;
				spriteConfig = source;
				spriteConfig.name = title;
			}else{
				sourceFile = source;
				spriteConfig = {};
				spriteConfig.name = title;
			}
			if($rootScope.ressources.images[name] !== undefined){
				throw new Error('Imageressource with name '+name+' already exists');
			}
			var image = new Image();
			image.onload = function() {

				delete sources[name];
				$rootScope.ressources.images[name] = this;

				//$rootScope.createSprite(spriteConfig);

				//Last image got loaded? notify callback!
				var ready = true;
				for(index in sources){
					ready = false;
					break;
				}
				if(ready){
					callback();
				}

			}
			image.src = sourceFile;
		})(title, sources[title]);
	}

};


srfn.loadUis = function(uiSources, callback){
	var sources = {};
	var sourcesLength = 0;
	for(key in uiSources){
		sources[key] = uiSources[key];
		sourcesLength++;
	}
	//no levels to load? gtfo!
	if(sourcesLength === 0){
		callback();
		return;
	}

	for(key in sources){
		utilfn.ajax(sources[key], function(data){
			$rootScope.ressources.ui = JSON.parse(data);
			delete sources[key];
			//Last level got loaded? notify callback!
			var ready = true;
			for(index in sources){
				ready = false;
				break;
			}
			if(ready){
				callback();
			}
		});
	}
};


/**
 * loads levels from files.
 * Example for sources:
 * sources = {"level1" : "my/path/level.json"}
 * @param   sources imagefiles and names
 * @param  callback which is called when all images are loaded
 */
srfn.loadLevels = function(levelSources, callback){

	//copy source object, so original object isn't affected by
	//removin already loaded images from this object
	var sources = {};
	var sourcesLength = 0;
	for(key in levelSources){
		sources[key] = levelSources[key];
		sourcesLength++;
	}
	//no levels to load? gtfo!
	if(sourcesLength === 0){
		callback();
		return;
	}

	for(key in sources){
		utilfn.ajax(sources[key], function(data){
			$rootScope.ressources.levels[key] = JSON.parse(data);
			delete sources[key];
			//Last level got loaded? notify callback!
			var ready = true;
			for(index in sources){
				ready = false;
				break;
			}
			if(ready){
				callback();
			}
		});
	}
};


srfn.loadSounds = function(sources_raw, callback){

	//copy source object, so original object isn't affected by
	//removin already loaded images from this object
	var sources = {};
	var sourcesLength = 0;
	for(key in sources_raw){
		sources[key] = sources_raw[key];
		sourcesLength++;
	}
	if(sourcesLength === 0){
		callback();
		return;
	}


	for(title in sources){

		//IFFE which is executed for every sounds
		(function(name, source){
			
			if(source.file === undefined){
				throw new Error('Please provide filename for sound "'+name+'".');
			}
			
			if($rootScope.ressources.sounds[name] !== undefined){
				throw new Error('Soundsressource with name '+name+' already exists');
			}
			var audio = new Audio();
			audio.preload = "true";

			if(source.loop === true){
				//small hack since HTML5 Audio's own attribute 'loop' causes small delay
				addEventListener('timeupdate', function(){
	                var buffer = 0.5;
	                if(this.currentTime > this.duration - buffer){
	                    this.currentTime = 0;
	                    this.play();
                	}
            	}, false);
			}

			function soundLoaded(sound){
				if(!sources[name]){
					return;
				}
				delete sources[name];
				$rootScope.ressources.sounds[name] = sound;

				//Last sounds got loaded? notify callback!
				var ready = true;
				for(index in sources){
					ready = false;
					break;
				}
				if(ready){
					callback();
				}
			}

			audio.addEventListener('loadeddata',function() {
				soundLoaded(this);

			}, false);

			audio.onerror = function(){
				throw new Error ('Error while loading sound "'+name+'"');
			};
			audio.src = source.file;
			audio.load();
			setTimeout(function testDuration(){
				if(isNaN(audio.duration)){
					setTimeout(testDuration,100);
				}else{
					soundLoaded(audio);
				}
			},100);
		})(title, sources[title]);
	}

};