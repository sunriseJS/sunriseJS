var mygame = {
	config: {
		width: 1280,
		height: 720,
		plugins: ['physics', 'audio', 'video', 'graphics', 'hud', 'trigger', 'entities','touchcontrolls', 'collision']
	},

	init: function(gamedata){
		sr.physics.setGravity({x:1,y:2});
		sr.loadSprite({
			name: "playersprite",
			src:"img/bla.png",
			tileWidth:10,
			tileHeight:50,
			animations: {
				"stand" : [0],
				"running" : [0,1,2,3,4],
				"jump" : [5,6,4,6]
			}
		});
	}

	run: function(gamedata){
		js.collision.on("playercollision", function(collidingObjs){

		})

	}

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
		

		gamedata.player = player;
		sr.physics.add({	
			moveable: [player,enemys],
			fixed: [wall1]
						});



		sr.level.add(player);
		player.position.set({z:1});
		player.sprite.set({name: "playersprite", animation: "stand"});
		player.sprite.set({animation: "running"});
				
		sr.controlls.key.on('A', gamedata.player.states.run-left);

	}	


	generateStates: function(gamedata){
		sr.controlls.
	}




};

sr.insertGame(mygame).start();