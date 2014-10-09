/**
 * @license sunriseJS Game Engine
 * @copyright (C) 2014 - 2014 Jonas Gerdes, Jonathan Wiemers
 * http://www.sunrisejs.net
 *
 * sunriseJS is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license.php
 *
 *
 *
 * @param  {[type]} sr
 * @return {[type]}
 */

srfn.controls = {};
rootfn.controls = {
	'keys': {},
	'keycallbacksDown': {},
	'keycallbacksUp': {},
	'keysPressed': {}
};
rootfn.controls.init = function() {
	rootfn.controls.generateKeys();
};

/**
 * onKeyDown and onKeyUp work with function arguments 
 * MDN docu: http://goo.gl/FSZ196
 * All this arguments are just redirected to saveCallbacksToArray (args).
 * The first argument is the array where the callbacks get stored and 
 * since there are two types (keyup, keydown) we need two diferent arrays for keyup and keydown
 * 
 * @param  {[type]} type is the keyAction type (keyup or keydown)
 * @param  {[type]} args are all the arguments, 
 */
function saveCallbacksToArray(type, args){
	var keys = [],
		callbacks = [],
		i = 0;
	for (; (i < args.length);) {
		keys = [];
		callbacks = [];
		while(!utilfn.isFunction(args[i])){
			keys.push(args[i]);
			i++;
		}
		while(utilfn.isFunction(args[i])){
			callbacks.push(args[i]);
			i++;
		}
		for(var k = 0; k < keys.length;k++){
			if(rootfn.controls[type][keys[k]] == undefined){
				rootfn.controls[type][keys[k]]= callbacks;
			}
			rootfn.controls[type][keys[k]] = rootfn.controls[type][keys[k]].concat(callbacks);
		}
	}
};

/**
 * Handel the key - function callbacks for keyDown
 */
srfn.controls.onKeyDown = function() {
	saveCallbacksToArray('keycallbacksDown', arguments);
};

/**
 * Handel the key - function callbacks for keyUp
 */
srfn.controls.onKeyUp = function() {
	saveCallbacksToArray('keycallbacksUp', arguments);
};

/**
 * if the key event is "keydown" this function will be executed
 * @param  {[type]} event [description]
 * @return {[type]}       [description]
 */
rootfn.handleKeyDown = function(event) {
	// 1. if key has been pressed before and haven't been release by now, there is no need to access the array again.
	// 2. the callback funtions gets fired just once
	if(rootfn.controls.keysPressed[event.keyCode]){
		return;
	}
	if(rootfn.controls.keycallbacksDown[rootfn.controls.keys.names[event.keyCode]]!= undefined){ 
		for(var i = 0; i < rootfn.controls.keycallbacksDown[rootfn.controls.keys.names[event.keyCode]].length; ++i){
			rootfn.controls.keycallbacksDown[rootfn.controls.keys.names[event.keyCode]][i]();
		}
	}

	rootfn.controls.keysPressed[event.keyCode] = true;
};

/**
 * if the key event is "keyup" this function will be executed
 * @param  {[type]} event [description]
 * @return {[type]}       [description]
 */
rootfn.handleKeyUp = function(event) {
	if(rootfn.controls.keycallbacksUp[rootfn.controls.keys.names[event.keyCode]]!= undefined){ 
		for(var i = 0; i < rootfn.controls.keycallbacksUp[rootfn.controls.keys.names[event.keyCode]].length; ++i){
			rootfn.controls.keycallbacksUp[rootfn.controls.keys.names[event.keyCode]][i]();
		}
	}
	rootfn.controls.keysPressed[event.keyCode] = false;
};

rootfn.on('canvas-fully-loaded', function() {
	$rootScope.canvas.addEventListener('keydown', rootfn.handleKeyDown);
	$rootScope.canvas.addEventListener('keyup', rootfn.handleKeyUp);
});

/**
 * will return if a key (or multiple keys) are actualy pressed
 * workin with javascript arguments: MDN docu: http://goo.gl/FSZ196
 * 
 */
srfn.controls.isKeyPressed = function() {
	var result = true;
		i = -1;
	for (; (++i < arguments.length) && result;) {
		result = rootfn.controls.keysPressed[rootfn.controls.keys.codes[arguments[i]]] || rootfn.controls.keysPressed[arguments[i]];
	}
	return result;
};

rootfn.controls.generateKeys = function() {
	var codes = {
		'backspace': 8,
		'tab': 9,
		'enter': 13,
		'shift': 16,
		'ctrl': 17,
		'alt': 18,
		'pause/break': 19,
		'caps lock': 20,
		'esc': 27,
		'space': 32,
		'page up': 33,
		'page down': 34,
		'end': 35,
		'home': 36,
		'left': 37,
		'up': 38,
		'right': 39,
		'down': 40,
		'insert': 45,
		'delete': 46,
		'windows': 91,
		'right click': 93,
		'numpad *': 106,
		'numpad +': 107,
		'numpad -': 109,
		'numpad .': 110,
		'numpad /': 111,
		'num lock': 144,
		'scroll lock': 145,
		'my computer': 182,
		'my calculator': 183,
		';': 186,
		'=': 187,
		',': 188,
		'-': 189,
		'.': 190,
		'/': 191,
		'`': 192,
		'[': 219,
		'\\': 220,
		']': 221,
		'\'': 222
	};

	// Helper aliases

	var aliases = {
		'ctl': 17,
		'pause': 19,
		'break': 19,
		'caps': 20,
		'escape': 27,
		'pgup': 33,
		'pgdn': 33,
		'ins': 45,
		'del': 46,
		'spc': 32
	};


	/*!
	 * Programatically add the following
	 */

	// lower case chars
	for (i = 97; i < 123; i++) {
		codes[String.fromCharCode(i)] = i - 32;
	}

	// numbers
	for (var i = 48; i < 58; i++) {
		codes[i - 48] = i;
	}

	// function keys
	for (i = 1; i < 13; i++) {
		codes['f' + i] = i + 111;
	}

	// numpad keys
	for (i = 0; i < 10; i++) {
		codes['numpad ' + i] = i + 96;
	}

	// Create reverse mapping
	var names = {};
	for (i in codes) {
		names[codes[i]] = i;
	}

	// Add aliases
	for (var alias in aliases) {
		codes[alias] = aliases[alias];
	}

	// add all the stuff to the global scope
	rootfn.controls.keys.codes = codes;
	rootfn.controls.keys.names = names;

};

rootfn.controls.init();

