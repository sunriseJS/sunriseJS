/**
 * @license sunriseJS Game Engine
 * @copyright (C) 2014 - 2014 Jonas Gerdes, Jonathan Wiemers
 * http://www.sunrisejs.net
 *
 * sunriseJS is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license.php
 *
 */
srfn.Entity = (function(){ 


    //constructor
    function Entity(x, y, width, height, config){
    	this.components = {};
    	this.id = utilfn.guid();
    	this.x = x;
    	this.y = y;
    	this.width = width;
    	this.height = height;
        this.config = config;

        for(type in config){
            var component = srfn.components.create(type, config[type]);
            this.components[type] = component;
            component.receive('setEntity', this);
        }
	} 

	srfn.CoreObject.extend(Entity);


	Entity.prototype.emit = function(what, data){
		for(type in this.components){
            this.components[type].receive(what, data);
        }
	}	  

    Entity.prototype.getComponentData = function(type, variable){
        if(this.components[type] === undefined){
            console.warn('Error in Entity '+this);
            throw new Error('No component "'+type+'" found in entity.');
        }
        return this.components[type].data[variable];
    }  

    Entity.prototype.clone = function(x, y, width, height){
        x = (x === undefined) ? this.x : x;
        y = (y === undefined) ? this.y : y;
        width = (width === undefined) ? this.width : width;
        height = (height === undefined) ? this.height : height;
        return new srfn.Entity(x, y, width, height, this.config);
    }

    return Entity;
})();