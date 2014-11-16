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
	 * generates UI variables. Set variable watchers.
	 */
	function generateWatchers() {
		var uiR = $rootScope.ressources.ui;
		for (var key in uiR) {
			for (var type in uiR[key]) {
				if (type == "variables") {
					for (var vari in uiR[key][type]) {
						ui.variables[vari] = uiR[key][type][vari];
						ui.variables.watch(vari, function (prop, oldval, newval) {
							rootfn.varChanged();
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
	rootfn.varChanged = function () {

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