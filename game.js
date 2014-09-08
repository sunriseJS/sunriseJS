var game = {
	config: {
		screenWidth: 640,
		screenHeight: 360,
		plugins: ['physics', 'audio', 'video', 'graphics', 'hud', 'trigger', 'entities','touchcontrolls', 'collision'],
		images: {
			'player' 		: 'assets/graphics/char1.png',
			'player-anim' 	: {
								source: 'assets/graphics/spritesheet.png',
								tileWidth: 64,
								tileHeight: 128,
								animations: {
									left: [0,1,2,3,4,5,6,7,8,9,10,11,12],
									right: [12,11,10,9,8,7,6,5,4,3,2,1,0]
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


		if($sr.isKeyPressed(16))
			console.log('shift gedrückt' );
		/*if($scope.toLeft){
			$scope.player.position.sub(3,0);
			if($scope.player.position.x <= 0){
				$scope.toLeft = false;
				$scope.player.setAnimation('right');
			}
		}else{
			$scope.player.position.add(3,0);
			if($scope.player.position.x >= 1280){
				$scope.toLeft = true;
				$scope.player.setAnimation('left');
			}
		}*/

		$scope.player.position.add(-1,1);
		if($scope.player.position.x <= -64){
			$scope.player.position.x = 640;
		}
		if($scope.player.position.y >= 360){
			$scope.player.position.y = -128;
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


