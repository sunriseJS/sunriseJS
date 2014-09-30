/**
 * @license sunriseJS Game Engine
 * @copyright (C) 2014 - 2014 Jonas Gerdes, Jonathan Wiemers
 * http://www.sunrisejs.net
 *
 * sunriseJS is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license.php
 *
 */

var components = {};

$sr.components = {};

$sr.components.add = function(type, creator){
	if(components[type] !== undefined){
		throw new Error('Component of type "'+type+'" already exist.');
	}
	components[type] = creator;
}

$sr.components.create = function(type, config){
	if(components[type] !== undefined){
		throw new Error('No component of type "'+type+'" exists.');
	}
	return components[type](config);
}