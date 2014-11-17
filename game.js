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
			'tileset1': { 
				source: 'assets/graphics/tileset1.png',
				tileWidth: 64,
				tileHeight: 64
			},
			'background1': {
				source: 'assets/graphics/bg_256.png'
			},
			'signs': {
				source: 'assets/graphics/signs.png'
			},
			'elevator': {
				source: 'assets/graphics/elevator.png'
			},
			'item': {
				source: 'assets/items/item.png'
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
		"entityTypes": {

			"player": {
				 "width": 96,
				 "height": 128,
                 "anchor":{
                    "x": 48,
                    "y": 64
                },
                "groups":[
                    "player",
                    "toRender"
                ],
                "components": {
                    "Renderer": {
                        "image": "player-anim",
                        "animation": "stand_right"
                    },
                    "JumpNRunController": {
                        "keys": {
                            "left": ["a", "left"],
                            "right": ["d", "right"]
                        }
                    },
                    "CollisionBody": {
                        "x": 25,
                        "y": 10,
                        "width": 48,
                        "height": 116
                    },
                    "SimpleInventory": {
                        "inventory": ["test"]
                    },
                    "Physics": {
                        "mass": 8,
                        "forces": {
                            "gravity": {
                                "x": 0,
                                "y": 9.81
                            }
                        }
                    }
                }
			},

			"bot": {
				"width": 96,
				"height": 128,
				"anchor": {
					"x": 48,
					"y": 64
				},
				"groups": [
					"bots",
					"toRender"
				], 
				"components": {
					"Renderer": {
						"image": "player-anim",
						"animation": "stand_right"
					},
					"CollisionBody": {
						"x": 24,
						"y": 10,
						"width": 48,
						"height": 116
					},
					"Physics": {
						"mass": 8,
						"forces": {
							"gravity": {
								"x": 0,
								"y": 9.81
							}
						}
					},
					"cheapAI": {}
				},
			},

			"elevator": {
				"width": 128,
				"height": 8,
				"anchor": {
					"x": 64,
					"y": 4
				},
				"groups": [
					"elevator",
					"toRender"
				],
				"components": {
					"StateMachine": {
						"states": {
							"down": {
								"values": {
									"ySpeed": 1
								}
							},
							"up": {
								"values": {
									"ySpeed": -1
								}
							}
						},
						"default": "up",
					},
					"Renderer": {
						"image": "elevator"
					},
					"CollisionBody": {},
					"Physics": {
						"mass": 0,
						"forces": {}
					},
					"Elevator": {
						"minY": 64,
						"maxY": 320
					}
				}
			},
			"item": {
				"width": "50",
				"height": "50",
				"anchor": {
					"x": 0,
					"y": 0
				},
				"groups": [
					"items",
					"toRender"
				],
				"components":{
					"Renderer": {
						"image": "item",
					},
					"SimpleItem": {
						"use": "createBots"
					},
					"CollisionBody": {},
					"Physics": {
						"mass": 200,
						"forces": []
					}
				}
			}
		}
	},


	createComponents: function (gameData) {

		gameData.fn.components.add('cheapAI', function (config) {

			var cheapAI = new gameData.fn.Component();
			cheapAI.direction = 2;
			cheapAI.on('collision', function (data) {
				if (data.collision.normal.x != 0) {
					cheapAI.entity.emit('setForce', {
						name: 'movement',
						x: 0,
						y: -15
					});
				}
			});

			cheapAI.on('tick', function () {
				cheapAI.entity.emit('setForce', {
					name: 'movement',
					x: 0,
					y: 0
				});
				if (cheapAI.direction === 2) {
					cheapAI.direction = Math.floor(Math.random() * 3) - 1;
					setTimeout(function () {
						cheapAI.direction = 2;
					}, 1000 * (Math.random(3) + 3));
				}
				cheapAI.entity.x += cheapAI.direction; 
				if (cheapAI.direction === -1) {
					cheapAI.entity.emit('changeAnimation', {
						animation: 'walk_left'
					});
				} else if (cheapAI.direction === 1) {
					cheapAI.entity.emit('changeAnimation', {
						animation: 'walk_right'
					});
				} else {
					cheapAI.entity.emit('changeAnimation', {
						animation: 'stand_right'
					});
				}
			});

			return cheapAI;
		});


		gameData.fn.components.add('Elevator', function (data) {
			var elevator = new gameData.fn.Component();

			elevator.on('tick', function () {

				elevator.entity.y += elevator.entity.getComponentData('StateMachine', 'currentStateObj')['ySpeed'];
				if (elevator.entity.y < data.minY) {
					elevator.entity.emit('setStates', ['down']);
				}
				if (elevator.entity.y > data.maxY) {
					elevator.entity.emit('setStates', ['up']);
				}
			});
			return elevator;
		});


	},


	init: function (gameData) { //change to something else

		gameData.fn.stage.setLevel('level1');
		gameData.fn.stage.setFocus(gameData.player, 0, 0);
		gameData.fn.defineCollidingGroups('player', 'tiles');
		gameData.fn.defineCollidingGroups('player', 'items');
		gameData.fn.defineCollidingGroups('player', 'elevator');
		gameData.fn.defineCollidingGroups('bots', 'tiles');
		gameData.fn.defineCollidingGroups('bots', 'elevator');

		gameData.fpsdom = document.querySelector('#fps');
		window.player = gameData.player; // only for testing purposes

		gameData.fn.on('reganedFocus', function () {
			gameData.fn.emit('unPaus');
			document.title = 'running';
		});

		gameData.fn.on('lostFocus', function () {
			gameData.fn.emit('paus');
			document.title = 'paused';
		});
		
		gameData.playerscore = 0;

	},

	run: function (gameData) {

		gameData.fpsdom.innerHTML = gameData.fn.fps.getFps();
		gameData.gameVariables.score = Math.round(gameData.playerscore += gameData.time.delta *0.001);

	},

	createBots: function (gameData) {
		var bots = [];
		for (var i = 0; i < 500; i++) {
			var clone = gameData.bot.clone(window.player.x, window.player.y);
			bots.push(clone);
		}
		gameData.fn.addToGroup(bots, 'bots');
		gameData.fn.addToGroup(bots, 'toRender');
	}
};