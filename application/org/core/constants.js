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
	 
	var keys = {};
	var touch = {};
	var folders = {};
	folders.core = "application/org/core/";
	folders.plugins = "application/org/plugins/";
	folders.userPlugins = "application/plugins/";

	$rootScope.$scope.KEYS = keys;
	$rootScope.$scope.TOUCH = touch;
	$rootScope.folders = folders;
	
	console.log($rootScope.folders);
})($sr = window.$sr = window.$sr || {});