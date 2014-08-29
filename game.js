var game = {
	config: {
		screenWidth: 1280,
		screenHeight: 720,
		plugins: ['physics', 'audio', 'video', 'graphics', 'hud', 'trigger', 'entities','touchcontrolls', 'collision']
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
		sr.createSprite({
			name: "test",
			src: 'assets/graphics/char1_anim.png',
			tileWidth: 32,
			tileHeight: 96,
			animations: {
				left: [0,1],
				right: [2,3]
			}
		});
		$scope.x = $scope.y = 1
	},

	run: function($scope){
		sr.getSprite('test').draw($scope.x, $scope.y);
		$scope.x = $scope.y++;
		// sr.strokeRect($scope.x, $scope.y,50,50);
	},

	irgendeinefunktion: function(){
		var player = sr.getNewDrawingObj();
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


