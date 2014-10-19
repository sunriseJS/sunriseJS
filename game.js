//window.debug = true;
var game = {
	config: {
		screenWidth: 640,
		screenHeight: 360,
		plugins: [
					'JumpNRunController',
					'CollisionBody',
					'SimpleInventory',
					'Physics',
					'SimpleItem'
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
			'tileset1':{	//put to level file
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
			},
			'item':{
				source:'assets/items/item.png'
			}
		},
		levels: {
			level1: "assets/levels/army.json"
		},	
		uis: {
			ui1: "assets/ui/ui.json"
		},
		sounds: {
			steps: {
				file: "assets/sounds/walking.mp3",
				loop: true
			}
		},
	},


	init: function($) { //change to something else

		$.fn.components.add('playerBehavior',function(config){
			var playerBehavior = new $.fn.Component();
			playerBehavior.on('tick', function(){
				if(playerBehavior.entity.y > 1000){
					playerBehavior.entity.y = -500;
				}
				if($.fn.controls.isKeyPressed('w')){
					playerBehavior.entity.y -= 1;
				}
				if($.fn.controls.isKeyPressed('s')){
					playerBehavior.entity.y += 1;
				}
			});
			playerBehavior.on('collision', function(data){
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
			playerBehavior.on('test', function(){
				console.log('test ausgeführt');
			});
			return playerBehavior;

		});

		$.player = new $.fn.Entity(436,-128,96,128,{	
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
								"height":116
							},
							"playerBehavior":{

							},
							"SimpleInventory":{
								"inventory": ['test']
							},
							"Physics":{
								"mass": 8,
								"forces":{
									"gravity":{"x":0,"y":9.81}
								}
							}
		});




		$.fn.addToGroup($.player,'player');
		
		$.fn.components.add('cheapAI', function(config){

			var cheapAI = new $.fn.Component();
			cheapAI.direction = 2;
			cheapAI.on('collision', function(data){
				if(data.collision.normal.x != 0){
					cheapAI.entity.emit('setForce', {name:'movement', x:0, y: -15});
				}
			});	

			cheapAI.on('tick', function(){
				cheapAI.entity.emit('setForce', {name:'movement', x:0, y: 0});
				if(cheapAI.direction === 2){
					cheapAI.direction = Math.floor(Math.random()*3)-1;
					setTimeout(function(){
						cheapAI.direction = 2;
						//cheapAI.entity.emit('setStates',['neutral']);
					},1000*(Math.random(3)+3));
				}
				cheapAI.entity.x += cheapAI.direction;//cheapAI.direction*cheapAI.entity.getComponentData('StateMachine','speed');
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
					"default": "neutral",
					"states":{
						"neutral":{
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
				"CollisionBody":{
					// "x":12,
					// "y":5,
					// "width":24,
					// "height":58
						"x":12,
						"y":5,
						"width":24,
						"height":58
				},
				"Physics":{
					"mass": 8,
					"forces":{
						"gravity":{"x":0,"y":9.81}
					}
				},
				"cheapAI":{
				}
			});
		



		$.fn.components.add('elevator', function(data){
			console.log(data);
			var elevator = new $.fn.Component();

			elevator.on('tick', function(){

				elevator.entity.y += elevator.entity.getComponentData('StateMachine','currentStateObj')['ySpeed'];
				if(elevator.entity.y < data.minY){
					elevator.entity.emit('setStates',['down']);
				}
				if(elevator.entity.y > data.maxY){
					elevator.entity.emit('setStates',['up']);
				}
			});
			return elevator;
		});


		window.elevator = new $.fn.Entity(832,256,128,8,{
			"StateMachine":{
				"default": "up",
				"states":{
					"down":{
						"values":{
							"ySpeed": 1
						}
					},
					"up":{
						"values":{
							"ySpeed": -1
						}
					}
				}
			},
			"Renderer":{
				"image": "elevator",
				"anchor": {"x": 64,	"y": 4}
			},
			"CollisionBody":{},
			"Physics":{
				"mass": 0,
				"forces":{}
			},
			"elevator":{
				"minY" : 64,
				"maxY" : 320
			}
		});
		var bots = [];
		$.fn.defineEmptyGroup('bots');
		$.fn.defineEmptyGroup('tiles');



		$.fn.addToGroup(elevator,'elevator');
		$.fn.addToGroup(elevator,'toRender');

	


		

		
		//set player states
		//$scope.player.stateManager.addStates({ name:"default",animation:'heftig',whatever:'idontknow' },{ name:"run_left",animation:'heftig-left',whatever:'idontknow-left' });
		
		$.fn.stage.setLevel('level1');
		$.fn.defineCollidingGroups('player','tiles');
		var item1 = new $.fn.Entity(1344, 64,50,50,{
			"Renderer":{
				"image": "item",
			},
			"SimpleItem":{
				"use": function(data){
					
					var bots = [];
					for(var i=0; i<500; i++){
						console.log(i, "new bot");
						var clone = bot.clone(window.player.x,window.player.y);
						bots.push(clone);
					}
					$.fn.addToGroup(bots,'bots');
					$.fn.addToGroup(bots,'toRender');

				} 
			},
			"CollisionBody": {},
			"Physics":{
				"mass": 200,
				"forces":[]
			},
		});

		$.fn.addToGroup(item1,'toRender');
		$.fn.addToGroup(item1,'items');
		$.fn.defineCollidingGroups('player','items');
		$.fn.defineCollidingGroups('player','elevator');
		$.fn.defineCollidingGroups('bots','tiles');
		$.fn.defineCollidingGroups('bots','elevator');
		


		
		$.fpsdom = document.querySelector('#fps');
		window.player = $.player; // only for testing purposes
		$.fn.addToGroup($.player,'toRender');
		$.fn.stage.setFocus($.player,0,0);
		
		/*
		console.log($scope.player.stateManager.states);
		console.log($scope.player.stateManager.getCurrentState());
		$scope.player.stateManager.setCurrentState('run_left');
		console.log($scope.player.stateManager.getCurrentState());
		*/
		
		$.fn.on('reganedFocus', function(){
			$.fn.emit('unPaus');
			document.title = 'running';
		});

		$.fn.on('lostFocus', function(){
			$.fn.emit('paus');
			document.title = 'paused';
		});



	},

	run: function($) {

		$.fpsdom.innerHTML = $.fn.fps.getFps();

	},
};