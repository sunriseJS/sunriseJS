/**
 * @license sunriseJS Game Engine
 * @copyright (C) 2014 - 2014 Jonas Gerdes, Jonathan Wiemers
 * http://www.sunrisejs.net
 *
 * sunriseJS is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license.php
 *
 */

srfn.StateMachine = (function(){ 
    /**
     * construktor
     * @param {[type]} states min 1 = default
     */
    StateMachine = function(config){ 
        srfn.Component.call(this);
        var self = this;
    	this.states = config.states || {};
    	this.currentState = 'default';
        this.data = this.states.default.values;

        this.on('setState', function(name){
            if(self.states[name] === undefined){
                throw new Error('no State with name: '+name);
            }
            self.currentState = name;
            if(self.states[name].events !== undefined){
                for(name in self.states[name].events){
                    self.entity.emit(name, self.states[name].events[name]);
                }
            }
            self.data = self.states[self.currentState].values;
        });

        this.on('addState', function(data){
            if(data.name === undefined){
                console.warn('Error in statemachine '+self);
                throw new Error('No name provided for new state');
            }
            if(data.state === undefined){
                console.warn('Error in statemachine '+self);
                throw new Error('No state provided to add');
            }

            if(self.states[data.name] == undefined){
                self.states[data.name] = data.state;
            } else {
                console.warn('Error in statemachine '+self);
                throw new Error("State: "+data.name+" already exists");
            }
        });
    };

	
    srfn.Component.extend(StateMachine);
    return StateMachine;
})();


srfn.components.add('StateMachine', function(config){
    return new srfn.StateMachine(config);
});


