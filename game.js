var game = {
	config: {
		screenWidth: 1280,
		screenHeight: 720,
		plugins: ['physics', 'audio', 'video', 'graphics', 'hud', 'trigger', 'entities','touchcontrolls', 'collision'],
		images: {
			'player' 		: 'assets/graphics/char1.png',
			'player-anim' 	: {
								source: 'assets/graphics/char1_anim.png',
								tileWidth: 32,
								tileHeight: 96,
								animations: {
									left: [0,1],
									right: [2,3]
								}

							},
			'logo-small' 	: 'assets/graphics/logo-klein.png',
			'logo-normal' 	: 'assets/graphics/logo-normal.png',
			'logo' 			: 'assets/graphics/logo.png'
		}
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
				$scope.player.setAnimation('right');
			}
		}else{
			$scope.player.position.add(3,0);
			if($scope.player.position.x >= 1280){
				$scope.toLeft = true;
				$scope.player.setAnimation('left');
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


