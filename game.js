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
		$scope.player = new $sr.Entity(688,260, 'player-anim');
		//set player states
		$scope.player.stateManager.addStates({ name:"default",animation:'heftig',whatever:'idontknow' },{ name:"run_left",animation:'heftig-left',whatever:'idontknow-left' });
		

		$scope.player.setAnchor(48,64);
		window.player = $scope.player; // only for testing purposes
		$sr.stage.add($scope.player);
		$sr.stage.setLevel('level1');
		$sr.stage.setFocus($scope.player,0,-64);
		$scope.fpsdom = document.querySelector('#fps');

		function setAnimation(){
			$scope.player.setAnimation($scope.player.state);
		}



		
		$scope.player.state = 'stand_right';
		setAnimation();
		$sr.controls.onKeyDown('a', 'left', function(){
			$scope.player.state = 'walk_left';
			setAnimation();
		});
		$sr.controls.onKeyDown('d', 'right', function(){
			$scope.player.state = 'walk_right';
			setAnimation();
		});
			
		$sr.controls.onKeyUp('a', 'left', function(){
			if(!$sr.controls.isKeyPressed('d') && !$sr.controls.isKeyPressed('right')){
				$scope.player.state = 'stand_left';
				setAnimation();
			}
			
		});
		$sr.controls.onKeyUp('d', 'right', function(){
			if(!$sr.controls.isKeyPressed('a') && !$sr.controls.isKeyPressed('left')){
				$scope.player.state = 'stand_right';
				setAnimation();
			}
		});

		console.log($scope.player.stateManager.states);
		console.log($scope.player.stateManager.getCurrentState());
		$scope.player.stateManager.setCurrentState('run_left');
		console.log($scope.player.stateManager.getCurrentState());
	},

	run: function($scope) {
		





		$scope.fpsdom.innerHTML = $sr.fps.getFps();

		var lastDir = $scope.player.currentDirection;
		$scope.player.currentDirection = -1;

		if($scope.player.state === 'walk_left'){
			$scope.player.position.x -= 2;
		}
		if($scope.player.state === 'walk_right'){
			$scope.player.position.x += 2;
		}

	},


	generateStates: function($scope) {

	}
};