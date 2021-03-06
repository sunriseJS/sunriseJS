/**
 * @license sunriseJS Game Engine
 * @copyright (C) 2014 - 2014 Jonas Gerdes, Jonathan Wiemers
 * http://www.sunrisejs.net
 *
 * sunriseJS is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license.php
 *
 */

/**
 *
 * Loading a script asynchronous into the application and can run a callback after the files is fully loaded
 * 
 * @param  {[type]}   src
 * @param  {Function} callback
 * @return {[type]}
 */
srfn.loadScript = function(src, callback) {

    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = src;
    s.async = true;
    s.onload = callback;        
    document.body.appendChild(s);
};

rootfn.initPlugins = function(){
	var plugs = {},
	    i = game.config.plugins.length -1; 
	while(i >= 0 && (plugs[i--] = 'plugins/'+game.config.plugins.pop()+'.js')){}
	for(var title in plugs){
		(function(name, source){
			srfn.loadScript(source, 
					function() {
					delete plugs[name];
					if(Object.keys(plugs).length === 0){
						rootfn.emit('all_plugins_loaded');
					}
			});
		})(title, plugs[title]);
	}
};


