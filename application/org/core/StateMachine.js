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
 * Excample for player
 * 
 * {
 * 		name: "default",!!!!!!!
 * 		speed: 0,
 * 		sound: "none"
 * }
 *
 * 
 */

$sr.StateMachine = (function(){ 
   

    /**
     * construktor
     * @param {[type]} states min 1 = default
     */
    function StateMachine(states){ 
    	this.states = states;
    	this.currentState = 'default';
    };

    StateMachine.prototype.getCurrentState = function(){
    	return this.states[this.currentState];
    };

	StateMachine.prototype.setCurrentState = function(name){
    	if(this.states[name] != undefined){
    		this.currentState = name;
    		return;
    	}
    	throw 'no State with name: '+name;
    };

	StateMachine.prototype.addState = function(name,state){
        if(this.states[name] == undefined){
            this.states[name] = state;
        } else {
            throw "State: "+name+" already exists";
        }
    };  

    return StateMachine;
})();


