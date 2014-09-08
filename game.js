var game = {
	config: {
		screenWidth: 1280,
		screenHeight: 720,
		plugins: ['physics', 'audio', 'video', 'graphics', 'hud', 'trigger', 'entities','touchcontrolls', 'collision'],
		images: {
			'player' 		: 'assets/graphics/char1.png',
			'player-anim' 	: {
								source: 'assets/graphics/soldier.png',
								tileWidth: 64,
								tileHeight: 128,
								animations: {
									'w': [0,1,2,3,4,5,6,7,8,9,10,11],
									'nw': [12,13,14,15,16,17,18,19,20,21,22,23],
									'n': [24,25,26,27,28,29,30,31,32,33,34,35],
									'ne':[36,37,38,39,40,41,42,43,44,45,46,47],
									'e': [48,49,50,51,52,53,54,55,56,57,58,59],
									'se': [60,61,62,63,64,65,66,67,68,69,70,71],
									's' : [72,73,74,75,76,77,78,79,80,81,82,83],
									'sw' : [84,85,86,87,88,89,90,91,92,93,94,95],
									'rot': [3,15,28,39,51,63,75,87]
								}

							},
			'logo-small' 	: 'assets/graphics/logo-klein.png',
			'logo-normal' 	: 'assets/graphics/logo-normal.png',
			'logo' 			: 'assets/graphics/logo.png'
		},
		levels: {
			level1 : "assets/maps/map1.json",
			bosLevel1: "assets/maps/bossLevel.json"
		},

		
	},


	init: function($scope){
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
		// $scope.fpsdom = 
		$scope.player = new $sr.Entity(40,40,'player-anim');
		$sr.stage.add($scope.player);
		$scope.toLeft = true;
		$scope.fpsdom = document.querySelector('#fps');

	},

	run: function($scope){
		$scope.fpsdom.innerHTML = $sr.fps.getFps();

		if($scope.toLeft){
			$scope.player.position.sub(3,0);
			if($scope.player.position.x <= 0){
				$scope.toLeft = false;
				$scope.player.setAnimation('e');
			}
		}else{
			$scope.player.position.add(3,0);
			if($scope.player.position.x >= 1280){
				$scope.toLeft = true;
				$scope.player.setAnimation('w');
			}
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


	generateStates: function($scope){
		
	}
};


