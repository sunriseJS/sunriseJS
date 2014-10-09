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


    /**
     * Game Entity
     * @param {Number} x      Horizontal position on stage
     * @param {Number} y      Vertical position on stage
     * @param {Number} width  Horizintal size
     * @param {Number} height Vertical size
     * @param {[type]} config Configuration containing components
     */
    function Entity(x, y, width, height, config){
    	this.components = {};
    	this.id = utilfn.guid();
    	this.x = x;
    	this.y = y;
    	this.width = width;
    	this.height = height;
        this.config = config;

        //for each component in config call corresponding creator function and provide additional data
        for(type in config){
            var component = srfn.components.create(type, config[type]);
            this.components[type] = component;
            component.receive('setEntity', this);
        }
	} 

	srfn.CoreObject.extend(Entity);

    /**
     * Distribute an event to all components
     * @param  {string} what name of the event
     * @param  {Object} data additional data to this event
     */
	Entity.prototype.emit = function(what, data){
		for(type in this.components){
            this.components[type].receive(what, data);
        }
	}	  

    /**
     * Provides specific data of a specific component (content of its this.data)
     * Throws error if no component with provided name is found
     * @param  {string} type     name/type of component
     * @param  {string} variable name of the variable to fetch data from
     * @return {}          undefined if variable doesn't exist, otherwise value ot the variable
     */
    Entity.prototype.getComponentData = function(type, variable){
        if(this.components[type] === undefined){
            console.warn('Error in Entity '+this);
            throw new Error('No component "'+type+'" found in entity.');
        }
        return this.components[type].data[variable];
    }  

    /**
     * Clones the Entity by providing a new entity with same components (components have same config)
     * @param {Number} x      Horizontal position on stage
     * @param {Number} y      Vertical position on stage
     * @param {Number} width  Horizintal size
     * @param {Number} height Vertical size
     * @return {Entity}        Cloned entity
     */
    Entity.prototype.clone = function(x, y, width, height){
        x = (x === undefined) ? this.x : x;
        y = (y === undefined) ? this.y : y;
        width = (width === undefined) ? this.width : width;
        height = (height === undefined) ? this.height : height;
        return new srfn.Entity(x, y, width, height, this.config);
    }

    return Entity;
})();