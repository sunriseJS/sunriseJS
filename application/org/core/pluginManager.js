/**
 * @license sunriseJS Game Engine
 * @copyright (C) 2014 - 2014 Jonas Gerdes, Jonathan Wiemers
 * http://www.sunrisejs.net
 *
 * sunriseJS is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license.php
 *
 */
(function($sr){	
	var $rootScope = $sr.$rootScope;

	/**
	 *
	 * Loading a script asynchronous into the application and can run a callback after the files is fully loaded
	 * 
	 * @param  {[type]}   src
	 * @param  {Function} callback
	 * @return {[type]}
	 */
	$sr.loadScript = function(src, callback) {
		callback();
		return;
	    var s = document.createElement('script');
	    s.type = 'text/javascript';
	    s.src = src;
	    s.async = false;
	    s.onload = callback;        
	    document.body.appendChild(s);
	};


	// $sr.initPlugins = function(){
	// 	var plugs = {},
	// 	    i = $rootScope.core.length -1; 
	// 	while(i >= 0 && (plugs[i--] = $rootScope.folders.core+$rootScope.core.pop()+'.js')){}
	// 	for(var title in plugs){
	// 		(function(name, source){
	// 			$sr.loadScript(source, 
	// 					function() {
	// 					delete plugs[name];
	// 					if(Object.keys(plugs).length === 0){
	// 						$sr.sunrise();
	// 					}
	// 			});
	// 		})(title, plugs[title]);

	// 	}

	// };


	$rootScope.initPlugins = function(){
		for(var i = 0; i < game.config.plugins.length; ++i){
			console.log(game.config.plugins[i]);
		}
	};


})($sr = window.$sr = window.$sr || {});

