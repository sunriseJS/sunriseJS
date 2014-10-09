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
    	this.data.currentState = config.default;
        this.data.currentStateObj = this.states[config.default].values;

        this.on('setStates', function(data){
            var currentState = [];
            var currentStateObj = {};
            for(var i = data.length; i--;){ 
                if(self.states[data[i]] === undefined){
                    throw new Error('no State with name: '+name);
                }
                if(self.states[data[i]].events !== undefined){
                    for(name in self.states[data[i]].events){
                        self.entity.emit(name, self.states[data[i]].events[name]);
                    }
                }
                for (var prop in self.states[data[i]].values) {
                    if (self.states[data[i]].values.hasOwnProperty(prop)) {
                        currentStateObj[prop] = self.states[data[i]].values[prop];
                    }
                }
            }
            self.data.currentState = data;
            self.data.currentStateObj = currentStateObj;
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


