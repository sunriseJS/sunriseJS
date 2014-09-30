/**
 * @license sunriseJS Game Engine
 * @copyright (C) 2014 - 2014 Jonas Gerdes, Jonathan Wiemers
 * http://www.sunrisejs.net
 *
 * sunriseJS is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license.php
 *
 */
(function($sr){	
	var $rootScope = $sr.$rootScope;
	$sr.BasicComponent = (function(){ 


		var x = 0,
			y = 0,
			width = 0,
			height = 0;

		
		BasicComponent = function(){
			$sr.Component.call(this);

			this.on('move', function(data){
				if(data.isRelative){
					x += data.x || 0;
					y += data.y || 0;
				}else{
					if(data.x !== undefined){
						x = data.x;
					}
					if(data.y !== undefined){
						y = data.y;
					}
				}

				

			});


			this.on('resize', function(data){
				if(data.isRelative){
					width += data.width || 0;
					height += data.height || 0;
				}else{
					if(data.width !== undefined){
						width = data.width;
					}
					if(data.height !== undefined){
						height = data.height;
					}
				}
			})
		}

		$sr.Component.extend(BasicComponent);

		return BasicComponent;

	})();

	
})($sr = window.$sr = window.$sr || {});