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
			}
		}
	},


	createComponents: function ($) {

		$.fn.components.add('cheapAI', function (config) {

			var cheapAI = new $.fn.Component();
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
						//cheapAI.entity.emit('setStates',['neutral']);
					}, 1000 * (Math.random(3) + 3));
				}
				cheapAI.entity.x += cheapAI.direction; //cheapAI.direction*cheapAI.entity.getComponentData('StateMachine','speed');
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


		$.fn.components.add('Elevator', function (data) {
			var elevator = new $.fn.Component();

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


	init: function ($) { //change to something else



		$.fn.stage.setLevel('level1');
		$.fn.defineCollidingGroups('player', 'tiles');
		var item1 = new $.fn.Entity(1344, 64, 50, 50, {
			'x': 0,
			'y': 0
		}, {
			"Renderer": {
				"image": "item",
			},
			"SimpleItem": {
				"use": function (data) {

					var bots = [];
					for (var i = 0; i < 500; i++) {
						var clone = $.bot.clone(window.player.x, window.player.y);
						bots.push(clone);
					}
					$.fn.addToGroup(bots, 'bots');
					$.fn.addToGroup(bots, 'toRender');

				}
			},
			"CollisionBody": {},
			"Physics": {
				"mass": 200,
				"forces": []
			}
		});

		$.fn.addToGroup(item1, 'toRender');
		$.fn.addToGroup(item1, 'items');
		$.fn.defineCollidingGroups('player', 'items');
		$.fn.defineCollidingGroups('player', 'elevator');
		$.fn.defineCollidingGroups('bots', 'tiles');
		$.fn.defineCollidingGroups('bots', 'elevator');

		$.fpsdom = document.querySelector('#fps');
		window.player = $.player; // only for testing purposes

		$.fn.stage.setFocus($.player, 0, 0);

		$.fn.on('reganedFocus', function () {
			$.fn.emit('unPaus');
			document.title = 'running';
		});

		$.fn.on('lostFocus', function () {
			$.fn.emit('paus');
			document.title = 'paused';
		});
		
		$.playerscore = 0;

	},

	run: function ($) {

		$.fpsdom.innerHTML = $.fn.fps.getFps();
		$.gameVariables.score = Math.round($.playerscore += $.time.delta *0.001);

	},
};