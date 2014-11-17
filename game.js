//Uncomment for debug mode, shows collision rectangles etc
//Alternatively open console in browser (usually f12) and type this line
//window.debug = true;

//Game
var game = {
	config: {

		//Width and height of canvas
		screenWidth: 640,
		screenHeight: 360,

		//Plugins to be loaded (have to be in the directory "plugins" relative to HTML file)
		plugins: [
					'JumpNRunController',
					'CollisionBody',
					'SimpleInventory',
					'Physics',
					'SimpleItem'
				],
		//Images to be loaded. Names must be unique
		images: {
			'player-anim': {
				//Path relative to HTML file
				source: 'assets/graphics/sheet_soldier.png',
				//Width and height of one frame/tile
				tileWidth: 96,
				tileHeight: 128,
				//Indicees for animations. Names must be unique
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
		//Levels to be loaded. Names must me unique. Path relative to HTML file.
		levels: {
			level1: "assets/levels/army.json"
		},
		uis: {
			ui1: "assets/ui/ui.json"
		},
		//Sound files to be loaded. Names must me unique..
		sounds: {
			steps: {
				//Path relative to HTML file.
				file: "assets/sounds/walking.mp3",
				//Flag whether sound should be looped or only played once
				loop: true
			}
		},

		//Different Types of Entites which can be generated
		//Names have to be unique
		"entityTypes": {

			"player": {
				//Width and height of the entity. If different from size provided as tileWidth/tileHeight
				//in images section, the image is stretched
				 "width": 96,
				 "height": 128,
				 //Anchor point on entity relative to upper left corner. If entity is moved, scaled or rotated, 
				 //this point is used instead of upper left corner
	             "anchor":{
	                "x": 48,
	                "y": 64
                },
                //Groups, the entity is in. 
                //Important: to be rendered and to have the tick event emitted, the entity has to be in group "toRender"
                "groups":[
                    "player",
                    "toRender"
                ],
                //Components of entity. Names must be names of existing (or self written) components.
                "components": {
                	//Renders entity on screen using provided image and animation.
                	//
                    "Renderer": {
                    	//Image from image section (see top of this document)
                        "image": "player-anim",
                        //Animation to be renderen. Can be changed by emitting "changeAnimation"
                        //For details see https://github.com/sunriseJS/sunriseJS/blob/dev/application/org/core/components/Renderer.js
                        "animation": "stand_right"
                    },
                    //Manages moving (and jumping)
                    "JumpNRunController": {
                    	//Keys to use. Defaults are:
                    	//left: a, left,
                    	//right: d, right,
                    	//jump: w, up, space
                    	//These could be removed since they are the default keys, are here for presentation purposes 
                        "keys": {
                            "left": ["a", "left"],
                            "right": ["d", "right"]
                        }
                    },
                    //Gives entity the ability to collide with other entities which have also a CollisionBody.
                    //Emits "collision" event to all components
                    "CollisionBody": {
                        "x": 25,
                        "y": 10,
                        "width": 48,
                        "height": 116
                    },
                    //Lets entity pickup items
                    "SimpleInventory": {
                        "inventory": ["test"]
                    },
                    //Gives entity mass, acceleration and speed. Reacts to collision with other entites which also have a physics component
                    //Forces can be added/set by emitting "setForce".
                    //For details see https://github.com/sunriseJS/sunriseJS/blob/dev/application/org/plugins/Physics.js
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
					//Custom component. Is implemented further down this document.
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
					//StateMachine to control behaviour of entity more easily
					//How states can be changed is shown in the implemenation of Ele
					"StateMachine": {
						//States of this entity. Names must me unique
						"states": {
							"down": {
								//values to be set when entering this state
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
						//State the entity should start with.
						"default": "up",
					},
					"Renderer": {
						"image": "elevator"
					},
					"CollisionBody": {},
					"Physics": {
						"mass": 0,
						"forces": {},
						//Ignores collision from specified directions.
						//Not fully implemented yet
						"ignore": [
							{"y":-1}
						]
					},
					//Custom componente for elevator. Implemented further down this document.
					//Uses minY und maxY to specify moving range
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
					//Custom component for Item
					"SimpleItem": {
						//Function in game to be called when Item is used
						"use": "createBots"
					},
					"CollisionBody": {}
				}
			}
		}
	},


	//Function for creating own components.
	//Will be called before init function.
	//GameData provides function for the game and can hold custom data which will be provided in each function in game
	createComponents: function (gameData) {
		//Register a new component under the name "cheapAI"
		//config contains data from above entityType setup
		gameData.fn.components.add('cheapAI', function (config) {
			//Create new Component
			var cheapAI = new gameData.fn.Component();
			//Set some data
			cheapAI.direction = 2;
			//Register listener for "collision" events
			//data contains data about the collision:
			//	data.other: entity this entity collided with
			//	data.collision.normal: normal to collision ("direction" of collision)
			//	data.collision.penetration: how far the entities overlap (in pixel)
			cheapAI.on('collision', function (data) {
				if (data.collision.normal.x != 0) {
					//Emit an event to other components
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
					//Change Animation of entity
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

		//Register component with name 'Elevator'
		gameData.fn.components.add('Elevator', function (data) {
			var elevator = new gameData.fn.Component();

			elevator.on('tick', function () {

				//Get Data from current state of state machine
				elevator.entity.y += elevator.entity.getComponentData('StateMachine', 'currentStateObj')['ySpeed'];
				if (elevator.entity.y < data.minY) {
					//Change state to 'down'
					elevator.entity.emit('setStates', ['down']);
				}
				if (elevator.entity.y > data.maxY) {
					elevator.entity.emit('setStates', ['up']);
				}
			});
			return elevator;
		});


	},


	//Initate the game
	//Is called once after createComponents, everything else (loading assets etc) is set up at this point and ready to go
	init: function (gameData) { 

		//load level
		gameData.fn.stage.setLevel('level1');
		//Let camera target and follow player. 0, 0 are offsets in x- and y-direction.
		gameData.fn.stage.setFocus(gameData.player, 0, 0);

		//Defines entites from which groups can collide against each other
		gameData.fn.defineCollidingGroups('player', 'tiles');
		gameData.fn.defineCollidingGroups('player', 'items');
		gameData.fn.defineCollidingGroups('player', 'elevator');
		gameData.fn.defineCollidingGroups('bots', 'tiles');
		gameData.fn.defineCollidingGroups('bots', 'elevator');

		//Set a DOM element of the HTML file to contain a FPS counter
		gameData.fpsdom = document.querySelector('#fps');

		//When game is left, set title of window to 'paused' and pause the game
		gameData.fn.on('lostFocus', function () {
			gameData.fn.emit('pause');
			document.title = 'paused';
		});

		//When game is in focus again, resume it and change title of window again
		gameData.fn.on('regainedFocus', function () {
			gameData.fn.emit('resume');
			document.title = 'running';
		});

		
		//set score to 0
		gameData.playerscore = 0;

	},

	//Will be called every step (around 60 times pre second)
	run: function (gameData) {
		//Update FPS counter
		gameData.fpsdom.innerHTML = gameData.fn.fps.getFps();
		//Change score
		gameData.gameVariables.score = Math.round(gameData.playerscore += gameData.time.delta *0.001);

	},

	//Creates Bots for testing purposes. Is used SimpleItem
	createBots: function (gameData) {
		var bots = [];
		for (var i = 0; i < 500; i++) {
			//Create a new entity by cloning a bot and assigning new position
			var clone = gameData.bot.clone(window.player.x, window.player.y);
			bots.push(clone);
		}
		//Add all new bots to some groups
		gameData.fn.addToGroup(bots, 'bots');
		gameData.fn.addToGroup(bots, 'toRender');
	}
};