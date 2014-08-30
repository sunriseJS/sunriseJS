var game = {
	config: {
		screenWidth: 1280,
		screenHeight: 720,
		plugins: ['physics', 'audio', 'video', 'graphics', 'hud', 'trigger', 'entities','touchcontrolls', 'collision'],
		images: {
			'player' 		: 'assets/graphics/char1.png',
			'player-anim' 	: 'assets/graphics/char1_anim.png',
			'logo-small' 	: 'assets/graphics/logo-klein.png',
			'logo-normal' 	: 'assets/graphics/logo-normal.png',
			'logo' 			: 'assets/graphics/logo.png',
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
		console.log('initgame');
		$sr.createSprite({
			name: "test",
			image: 'player-anim',
			tileWidth: 32,
			tileHeight: 96,
			animations: {
				left: [0,1],
				right: [2,3]
			}
		});
		$sr.getSprite('test').currentAnimation = [2,3];
		$scope.x = $scope.y = 1
		$scope.fpsdom = document.querySelector('#fps');
	},

	run: function($scope){
		$scope.fpsdom.innerHTML = $sr.fps.getFps();
		$sr.getSprite('test').draw($scope.x, $scope.y);
		$scope.x = $scope.y++;
		// $sr.strokeRect($scope.x, $scope.y,50,50);
	},

	irgendeinefunktion: function(){
		var player = $sr.getNewDrawingObj();
		player.states.add({
			"run-left": {
				enter : function(){
					player.sprite.set({animation: "run-left"});
				},
				tick : function(){
					player.position.add({x:-1});
				}
			},
			"run-right":{

			}
		});
		

		$scope.player = player;
		sr.physics.add({	
			moveable: [player,enemys],
			fixed: [wall1]
						});



		sr.level.add(player);
		player.position.set({z:1});
		player.sprite.set({name: "playersprite", animation: "stand"});
		player.sprite.set({animation: "running"});
				
		sr.controlls.key.on('A', $scope.player.states.run-left);

	},	


	generateStates: function($scope){
		
	}
};


