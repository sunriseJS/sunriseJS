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


(function($sr) {
	var $rootScope = $sr.$rootScope;
	$sr.controls = {};
	$rootScope.controls = {};
	$rootScope.controls.keys = {};
	$rootScope.controls.keycallbacks = {};
	$rootScope.controls.keysPressed = {};

	function init() {
		$rootScope.generateKeys();
	}

	$sr.controls.key = function(key, callback) {
		$rootScope.controls.keycallbacks[key] = callback;
	};

	$rootScope.handleKeyDown = function(event) {
		// var charCode = String.fromCharCode((typeof event.which == "undefined") ? event.keyCode : event.which);
		// console.log("Keycode: ", event.keyCode, "keypressed: ", charCode);
		$rootScope.controls.keysPressed[event.keyCode] = true;
	};

	$rootScope.handleKeyUp = function(event) {
		// var charCode = String.fromCharCode((typeof event.which == "undefined") ? event.keyCode : event.which);
		// console.log("Keycode: ", event.keyCode, "keypressed: ", charCode);

		$rootScope.controls.keysPressed[event.keyCode] = false;
	};

	$rootScope.on('canvas-fully-loaded', function() {
		$rootScope.canvas.addEventListener('keydown', $rootScope.handleKeyDown);
		$rootScope.canvas.addEventListener('keyup', $rootScope.handleKeyUp);
	});

	/**
	 * will return if a key (or multiple keys) are actualy pressed
	 */
	$sr.controls.isKeyPressed = function() {
		var result = true;
			i = -1;
		for (; (++i < arguments.length) && result;) {
			result = $rootScope.controls.keysPressed[$rootScope.controls.keys.codes[arguments[i]]] || $rootScope.controls.keysPressed[arguments[i]];
		}
		return result;
	};

	$rootScope.generateKeys = function() {
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

		$rootScope.controls.keys.codes = codes;
		$rootScope.controls.keys.names = names;

	};

	init();


})($sr = window.$sr = window.$sr || {});