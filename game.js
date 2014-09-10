var game = {
	config: {
		screenWidth: 640,
		screenHeight: 360,
		plugins: ['physics', 'audio', 'video', 'graphics', 'hud', 'trigger', 'entities', 'touchcontrolls', 'collision'],
		images: {
			'player': 'assets/graphics/char1.png',
			'player-anim': {
				source: 'assets/graphics/soldier.png',
				tileWidth: 64,
				tileHeight: 128,
				animations: {
					'w_walk': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
					'nw_walk': [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
					'n_walk': [24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35],
					'ne_walk': [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47],
					'e_walk': [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59],
					'se_walk': [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71],
					's_walk': [72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83],
					'sw_walk': [84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95],
					'rot': [3, 15, 28, 39, 51, 63, 75, 87],
					'w_stand': [4],
					'nw_stand': [16],
					'n_stand': [28],
					'ne_stand': [40],
					'e_stand': [53],
					'se_stand': [64],
					's_stand': [76],
					'sw_stand': [88]
				}

			},
			'logo-small': 'assets/graphics/logo-klein.png',
			'logo-normal': 'assets/graphics/logo-normal.png',
			'logo': 'assets/graphics/logo.png'
		},
		levels: {
			level1: "assets/maps/map1.json",
			bosLevel1: "assets/maps/bossLevel.json"
		},


	},


	init: function($scope) {
		// sr.physics.setGravity({x:1,y:2});
		// sr.loadSprite({
		// 	name: "playersprite",
		// 	src:"img/bla.png",
		// 	tileWidth:10,
		// 	tileHeight:50,
		// 	animations: {
		// 		"stand" : [0],
		// 		"running" : [0,1,2,3,4],
		// 		"jump" : [5,6,4,6]
		// 	}
		// });
		$scope.player = new $sr.Entity(40, 40, 'player-anim');
		$sr.stage.add($scope.player);
		$scope.toLeft = true;
		$scope.fpsdom = document.querySelector('#fps');
		$scope.player.directions = {
			w : {
				x : -1.5,
				sprite : 'w'
			},
			nw : {
				x : -1,
				y : -0.5,
				sprite : 'nw'
			},
			n : {
				y : -1,
				sprite : 'n'
			},
			ne : {
				x : 1,
				y : -0.5,
				sprite : 'ne'
			},
			e : {
				x : 1.5,
				sprite : 'e'
			},
			se : {
				x : 1,
				y : 0.5,
				sprite : 'se'
			},
			s : {
				y : 1,
				sprite : 's'
			},
			sw : {
				x : -1,
				y : 0.5,
				sprite : 'sw'
			}

		};
		$scope.player.currentDirection = 'e';
		$sr.controls.onKeyDown('i', function(){
			console.log('das erste key callback ausgeführt');
		},function(){
			console.log('MOEEMOEMOEMOEMOEMOEEEEP');
		});//sdaasdasd

		$sr.controls.onKeyDown('i', function(){
			console.log('das dritte key callback ausgeführt');
		});
	},

	run: function($scope) {
		$scope.fpsdom.innerHTML = $sr.fps.getFps();

		var lastDir = $scope.player.currentDirection;
		$scope.player.currentDirection = -1;

		if($sr.controls.isKeyPressed('w') || $sr.controls.isKeyPressed('up')){
			$scope.player.currentDirection = 'n';
		}
		if($sr.controls.isKeyPressed('s') || $sr.controls.isKeyPressed('down')){
			$scope.player.currentDirection = 's';
		}
		if($sr.controls.isKeyPressed('a') || $sr.controls.isKeyPressed('left')){
			$scope.player.currentDirection = 'w';
		}
		if($sr.controls.isKeyPressed('d') || $sr.controls.isKeyPressed('right')){
			$scope.player.currentDirection = 'e';
		}
		if($sr.controls.isKeyPressed('w','a')  || $sr.controls.isKeyPressed('up', 'left')){
			$scope.player.currentDirection = 'nw';
		}
		if($sr.controls.isKeyPressed('w','d') || $sr.controls.isKeyPressed('up', 'right')){
			$scope.player.currentDirection = 'ne';
		}
		if($sr.controls.isKeyPressed('s','a') || $sr.controls.isKeyPressed('down', 'left')){
			$scope.player.currentDirection = 'sw';
		}
		if($sr.controls.isKeyPressed('s','d') || $sr.controls.isKeyPressed('down', 'right')){
			$scope.player.currentDirection = 'se';
		}

		if($scope.player.currentDirection !== -1){
			var dir = $scope.player.directions[$scope.player.currentDirection];
			$scope.player.position.x += dir.x || 0;
			$scope.player.position.y += dir.y || 0;
			$scope.player.setAnimation(dir.sprite+'_walk');
		}else{
			$scope.player.setAnimation($scope.player.directions[lastDir].sprite+'_stand');
			$scope.player.currentDirection = lastDir;
		}

		if($sr.controls.isKeyPressed('ctrl')){
			$scope.player.setAnimation('rot');
		}







		// $sr.strokeRect($scope.x, $scope.y,50,50);
	},

	// irgendeinefunktion: function(){
	// 	var player = $sr.getNewDrawingObj();
	// 	player.states.add({
	// 		"run-left": {
	// 			enter : function(){
	// 				player.sprite.set({animation: "run-left"});
	// 			},
	// 			tick : function(){
	// 				player.position.add({x:-1});
	// 			}
	// 		},
	// 		"run-right":{

	// 		}
	// 	});


	// 	$scope.player = player;
	// 	sr.physics.add({	
	// 		moveable: [player,enemys],
	// 		fixed: [wall1]
	// 					});



	// 	sr.level.add(player);
	// 	player.position.set({z:1});
	// 	player.sprite.set({name: "playersprite", animation: "stand"});
	// 	player.sprite.set({animation: "running"});

	// 	sr.controlls.key.on('A', $scope.player.states.run-left);

	// },	


	generateStates: function($scope) {

	}
};