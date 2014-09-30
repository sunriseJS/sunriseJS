/**
 * @license sunriseJS Game Engine
 * @copyright (C) 2014 - 2014 Jonas Gerdes, Jonathan Wiemers
 * http://www.sunrisejs.net
 *
 * sunriseJS is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license.php
 *
 */

$sr.StateMachine = (function(){ 
    /**
     * construktor
     * @param {[type]} states min 1 = default
     */
    function StateMachine(entity, states){ 
        this.entity = entity;
    	this.states = states;
    	this.currentState = 'default';
    };

    /**
     * returns current state.
     */
    StateMachine.prototype.getCurrentState = function(){
    	return this.states[this.currentState].values;
    };

    /**
     * Sets current state.
     * Throws error if state is not defined.
     * @param {[type]} name [the name of the new current state]
     */
	StateMachine.prototype.setCurrentState = function(name){
    	if(this.states[name] === undefined){
            throw new Error('no State with name: '+name);
    	}
        this.currentState = name;
        for(name in this.states[name].events){
            this.entity.emit(name, this.states[name].events[name]);
        }
    	
    };

    /**
     * Adds a new state to the states object.
     * Will throw error if name is already in use
     * @param {[type]} name  [the name of the new state]
     * @param {[type]} state [the state object]
     */
	StateMachine.prototype.addState = function(name,state){
        if(this.states[name] == undefined){
            this.states[name] = state;
        } else {
            throw "State: "+name+" already exists";
        }
    };  

    return StateMachine;
})();


