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
        if(config.default === undefined){
            console.warn('Error in StateMachine '+this);
            throw new Error('Can\'t find state "'+config.default+'"');
        }
    	this.currentState = config.default;
        this.currentStateObj = this.states[config.default];

        this.data = this.states[this.currentState].values;

        this.on('setStates', function(){
            var currentState = [];
            var currentStateObj = {};
            for(var i = arguments.length; --i;){ 
                if(self.states[arguments[i]] === undefined){
                    throw new Error('no State with name: '+name);
                }
                if(self.states[arguments[i]].events !== undefined){
                    for(name in self.states[arguments[i]].events){
                        self.entity.emit(name, self.states[arguments[i]].events[name]);
                    }
                }
                for (var prop in self.states[arguments[i]]) {
                    if (obj.hasOwnProperty(prop)) {
                        currentStateObj[prob] = self.states[arguments[i]][prob];
                    }
                }
                currentState.push(arguments[i]);
            }
            self.data = self.states[arguments[i]].values;
            self.currentState = currentState;
            self.currentStateObj = currentStateObj;
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


