var game = {
	config: {
		screenWidth: 640,
		screenHeight: 360,
		plugins: [
					'JumpNRunController',
					'CollisionBody'
				],
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
			},
			'elevator':{
				source: 'assets/graphics/elevator.png'
			}
		},
		levels: {
			level1: "assets/levels/level1.json"
		}


	},


	init: function($) {

		$.fn.components.add('playerBehavior',function(config){
			var playerBehavior = new $sr.Component();
			playerBehavior.on('collision', function(){
				playerBehavior.entity.emit('changeOpacity', {
					opacity: 0.5
				});
				clearTimeout(playerBehavior.reset);
				playerBehavior.reset = setTimeout(function(){
					playerBehavior.entity.emit('changeOpacity', {
						opacity: 1
					});
				}, 20);
			});
			return playerBehavior;
		});

		$.player = new $.fn.Entity(688,260,96,128,{	
							"StateMachine":{
								"states":{
									"default":{
									}
								}
							},
							"Renderer":{
								"image": "player-anim",
								"anchor": {"x": 48,	"y": 64},
								"animation": 'stand_right' 
							},
							"JumpNRunController":{
								"keys":{
									"left":['a','left'], 
									"right":['d','right']
								}
							},
							"CollisionBody":{
								"x":25,
								"y":10,
								"width":48,
								"height":120
							},
							"playerBehavior":{

							}
		});

		$.fn.addToGroup($.player,'player');
		
		$.fn.components.add('cheapAI', function(config){

			var cheapAI = new $.fn.Component();
			cheapAI.direction = 2;
			cheapAI.on('collision', function(){
				cheapAI.entity.emit('setState', 'mad');
			});	

			cheapAI.on('tick', function(){
				if(cheapAI.direction === 2){
					cheapAI.direction = Math.floor(Math.random()*3)-1;
					setTimeout(function(){
						cheapAI.direction = 2;
						cheapAI.entity.emit('setState','default');
					},1000*(Math.random(3)+3));
				}
				cheapAI.entity.x += cheapAI.direction*cheapAI.entity.getComponentData('StateMachine','speed');
				if(cheapAI.direction === -1){
					cheapAI.entity.emit('changeAnimation', {animation: 'walk_left'});
				}else if(cheapAI.direction === 1){
					cheapAI.entity.emit('changeAnimation', {animation: 'walk_right'});
				}else{
					cheapAI.entity.emit('changeAnimation', {animation: 'stand_right'});
				}
			});

			return cheapAI;
		});

		window.bot = new $.fn.Entity(688+128,260+64,96/2,128/2,{
				"StateMachine":{
					"states":{
						"default":{
							"values":{
								"speed": "0.5",
								"madness": "minimum"
							}
						},
						"mad":{
							"values":{
								"speed": "1",
								"madness": "maximum"
							}
						}
					}
				},
				"Renderer":{
					"image": "player-anim",
					"anchor": {"x": 48,	"y": 64},
					"animation": "stand_right" 
				},
				"CollisionBody":{},
				"cheapAI":{
				}
			});
		var bots = [];
		for(var i=0; i<8; i++){
			var clone = bot.clone();
			bots.push(clone);
		}
		$.fn.addToGroup(bots,'bots');
		$.fn.addToGroup(bots,'toRender');



		$.fn.components.add('elevator', function(data){
			console.log(data);
			var elevator = new $.fn.Component();
			elevator.on('tick', function(){

				elevator.entity.y += elevator.entity.getComponentData('StateMachine','ySpeed');
				if(elevator.entity.y < data.minY){
					elevator.entity.emit('setState','down');
				}
				if(elevator.entity.y > data.maxY){
					elevator.entity.emit('setState','up');
				}
			});
			return elevator;
		});

		window.elevator = new $.fn.Entity(1216,256,128,8,{
			"StateMachine":{
				"states":{
					"default":{
						"values":{
							"ySpeed": 1
						}
					},
					"up":{
						"values":{
							"ySpeed": -1
						}
					},
					"down":{
						"values":{
							"ySpeed": 1
						}
					}
				}
			},
			"Renderer":{
				"image": "elevator",
				"anchor": {"x": 64,	"y": 4}
			},
			"CollisionBody":{},
			"elevator":{
				"minY" : 64,
				"maxY" : 320
			}
		});
		$.fn.addToGroup(elevator,'elevator');
		$.fn.addToGroup(elevator,'toRender');

		


		var testBots = [];
		testBots.push(bots[0]);
		testBots.push(bots[2]);
		testBots.push(bots[4]);
		testBots.push(bots[6]);

		$.fn.addToGroup(testBots,'testBots');

		$.fn.defineCollidingGroups('player','bots');
		$.fn.defineCollidingGroups('testBots','player');
		$.fn.defineCollidingGroups('player','elevator');

		
		//set player states
		//$scope.player.stateManager.addStates({ name:"default",animation:'heftig',whatever:'idontknow' },{ name:"run_left",animation:'heftig-left',whatever:'idontknow-left' });
		
		$.fn.stage.setLevel('level1');
		
		$.fpsdom = document.querySelector('#fps');
		window.player = $.player; // only for testing purposes
		$.fn.addToGroup($.player,'toRender');
		$.fn.stage.setFocus($.player,0,-64);
		
		/*
		console.log($scope.player.stateManager.states);
		console.log($scope.player.stateManager.getCurrentState());
		$scope.player.stateManager.setCurrentState('run_left');
		console.log($scope.player.stateManager.getCurrentState());
		*/
	
	},

	run: function($) {

		$.fpsdom.innerHTML = $.fn.fps.getFps();

	},


	generateStates: function($scope) {

	}
};