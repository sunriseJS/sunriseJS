/**
 * @license sunriseJS Game Engine
 * @copyright (C) 2014 - 2014 Jonas Gerdes, Jonathan Wiemers
 * http://www.sunrisejs.net
 *
 * sunriseJS is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license.php
 *
 */


(function () {
	var rootVar = $rootScope.$scope.gameVariables = {};

	/**
	 * inits the UI pane
	 * @return {[type]} [description]
	 */
	rootfn.initUi = function () {
		$rootScope.ui = document.querySelector('div[sunriseJS-ui]');
		generateWatchers();

	}

	var ui = window.ui = $rootScope.ui = {
		variables: {}
	};






	/**
	 * 
	 * generates UI variables. Set variable watchers
	 * and set initial state
	 */
	function generateWatchers() {
		var uiR = $rootScope.ressources.ui;
		for (var key in uiR) {
			for (var type in uiR[key]) {
				if (type == "variables") {
					for (var vari in uiR[key][type]) {
						ui.variables[vari] = uiR[key][type][vari];
						rootVar[vari] = uiR[key][type][vari];
						rootfn.varChanged(vari, uiR[key][type][vari], uiR[key][type][vari]);
						
						ui.variables.watch(vari, function (prop, oldval, newval) {
							rootfn.varChanged(prop, oldval, newval);
							return newval;
						});
						rootVar.watch(vari, function (prop, oldval, newval) {
							rootfn.varChanged(prop, oldval, newval);
							return newval;
						});
					}
				}
			}
		}

	}

	/**
	 * if a ui variable gets changed the sepcific ui-dom will be updated.
	 */
	rootfn.varChanged = function (prop, oldval, newval) {
		var dom = document.querySelector('div[sr-ui-' + prop + ']');
		
		if(dom){	
			switch (dom.getAttribute('sr-ui-type')) {
				case "variable":
					dom.innerHTML = dom.getAttribute('sr-ui-' + prop) + newval;
					break;
				case "array":
					console.log(prop, oldval,newval);
					console.log(dom);
					break;
			}
		}
	};



	/**
	 * show a specific UI eg. score
	 * @param  {[type]} name [ui]
	 */
	srfn.showUi = function (name) {

	};

	/**
	 * hide a specific UI eg. score
	 * @param  {[type]} name [ui]
	 */
	srfn.hideUi = function (name) {

	};

})();