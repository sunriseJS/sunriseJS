/**
 * @license sunriseJS Game Engine
 * @copyright (C) 2014 - 2014 Jonas Gerdes, Jonathan Wiemers
 * http://www.sunrisejs.net
 *
 * sunriseJS is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license.php
 *
 */
$sr.Entity = (function(){ 


    //constructor
    function Entity(x, y, width, height, config){
    	this.components = [];
    	
    	this.x = x;
    	this.y = y;
    	this.width = width;
    	this.height = height;
        this.config = config;

        var stateMachineConfig = config["StateMachine"];
        if(stateMachineConfig === undefined){
            throw new Error ('Please provide options for StateMachine!');
        }
        if(stateMachineConfig.states === undefined){
            throw new Error ('Please provide states for StateMachine!');
        }
        this.stateMachine = new $sr.StateMachine(this, stateMachineConfig.states);

        for(type in config){
            if(type !== 'StateMachine'){
                var component = $sr.components.create(type, config[type]);
                this.components.push(component);
                component.receive('setEntity', this);
            }
        }
	} 

	$sr.CoreObject.extend(Entity);


	Entity.prototype.emit = function(what, data){
		this.components.forEach(function(component){
			component.receive(what, data);
		});
	}	    

    Entity.prototype.clone = function(x, y, width, height){
        x = (x === undefined) ? this.x : x;
        y = (y === undefined) ? this.y : y;
        width = (width === undefined) ? this.width : width;
        height = (height === undefined) ? this.height : height;
        return new $sr.Entity(x, y, width, height, this.config);
    }

    return Entity;
})();