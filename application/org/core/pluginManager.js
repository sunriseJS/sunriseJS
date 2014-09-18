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

	    var s = document.createElement('script');
	    s.type = 'text/javascript';
	    s.src = src;
	    s.async = true;
	    s.onload = callback;        
	    document.body.appendChild(s);
	};

	$rootScope.initPlugins = function(){
		var plugs = {},
		    i = game.config.plugins.length -1; 
		while(i >= 0 && (plugs[i--] = 'plugins/'+game.config.plugins.pop()+'.js')){}
		for(var title in plugs){
			(function(name, source){
				$sr.loadScript(source, 
						function() {
						delete plugs[name];
						if(Object.keys(plugs).length === 0){
							$rootScope.emit('all_plugins_loaded');
						}
				});
			})(title, plugs[title]);
		}
	};


})($sr = window.$sr = window.$sr || {});

