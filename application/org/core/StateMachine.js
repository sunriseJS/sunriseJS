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
    function StateMachine(){ 
    	this.states = {};
    	this.currentState = 'default';

        this.addStates.apply(this, arguments);
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

	StateMachine.prototype.addStates = function(){
    	for(var i = 0; i < arguments.length; ++i){
    		console.log(arguments[i].name);
    		if(this.states[arguments[i].name] != undefined){
    			console.info('State: '+arguments[i].name+' overwrites a previously defined state!');
    		}
    		this.states[arguments[i].name] = arguments[i];
    	}
    };

    return StateMachine;
})();


