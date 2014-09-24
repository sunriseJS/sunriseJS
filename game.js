var game = {
	config: {
		screenWidth: 640,
		screenHeight: 360,
		plugins: ['testplugin'],
		images: {
			'player-anim': {
				source: 'assets/graphics/sheet_soldier.png',
				tileWidth: 96,
				tileHeight: 128,
				animations: {
					'walk_right': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
					'walk_left': [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
					'stand_right': [1],
					'stand_left': [13]
				}

			},
			'tileset1':{
				source: 'assets/graphics/tileset1.png',
				tileWidth: 64,
				tileHeight: 64
			},
			'background1':{
				source: 'assets/graphics/bg_256.png'
			},
			'signs':{
				source: 'assets/graphics/signs.png'
			}
		},
		levels: {
			level1: "assets/levels/level1.json"
		}


	},


	init: function($scope) {
		$scope.player = new $sr.Entity(688,260,96,128,
							new $sr.Render('player-anim', {
								anchor: {x: 48,	y: 64},
								animation: 'stand_right' 
							}),
							new $sr.JumpNRunController()
						);
		//set player states
		//$scope.player.stateManager.addStates({ name:"default",animation:'heftig',whatever:'idontknow' },{ name:"run_left",animation:'heftig-left',whatever:'idontknow-left' });
		
		$sr.stage.setLevel('level1');
		
		$scope.fpsdom = document.querySelector('#fps');
		window.player = $scope.player; // only for testing purposes
		$sr.stage.add($scope.player);
		$sr.stage.setFocus($scope.player,0,-64);
		
		/*
		console.log($scope.player.stateManager.states);
		console.log($scope.player.stateManager.getCurrentState());
		$scope.player.stateManager.setCurrentState('run_left');
		console.log($scope.player.stateManager.getCurrentState());
		*/
	},

	run: function($scope) {

		$scope.fpsdom.innerHTML = $sr.fps.getFps();

	},


	generateStates: function($scope) {

	}
};