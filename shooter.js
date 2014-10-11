//window.debug = true;
var game = {
	config: {
		screenWidth: 640,
		screenHeight: 360,
		plugins: [
					'CollisionBody'
				],
		images: {
			'fighter': {
				source: 'assets/graphics/fighter.png',
				tileWidth: 80,
				tileHeight: 64,
				animations: {
					'straight': [4],
					'left': [3,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
					'right': [5,6,7,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8],
					'hit': [4,3,2,3,4,5,6,5,4]
				},
			},
			'xwing': {
				source: 'assets/graphics/xming.png',
				tileWidth: 60,
				tileHeight: 64,
				animations: {
					'straight': [4],
					'left': [3,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
					'right': [5,6,7,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8],
					'hit': [4,3,2,3,4,5,6,5]
				},
			},
			'space1':{
				source: 'assets/graphics/space.png'
			},
			'space2':{
				source: 'assets/graphics/space2.png'
			}
		},
		levels: {
			level1: 'assets/levels/space.json'
		},
		sounds: {
		}


	},


	init: function($) { 

		$.fn.components.add('Hero',function(config){
			var hero = new $.fn.Component(),
				isHit = false,
				hitTimeout = undefined;
			hero.on('tick', function(){
				hero.entity.y -= 2;
				if($.fn.controls.isKeyPressed('a')){
					hero.entity.x -= 2;
					$.fn.stage.setFocus($.player,-hero.entity.x,-128);
					hero.entity.emit('changeAnimation', {animation: 'left'});
				}
				if($.fn.controls.isKeyPressed('d')){
					hero.entity.x += 2;
					$.fn.stage.setFocus($.player,-hero.entity.x,-128);
					hero.entity.emit('changeAnimation', {animation: 'right'});
				}
				if(!$.fn.controls.isKeyPressed('a') && !$.fn.controls.isKeyPressed('d') && !isHit){
					hero.entity.emit('changeAnimation', {animation: 'straight'});
				}
				console.log(isHit);
			});

			hero.on('collision', function(){
				hero.entity.emit('changeAnimation', {animation: 'hit'});
				isHit = true;
				if(hitTimeout){
					clearTimeout(hitTimeout);
				}
				setTimeout(function(){
					isHit = false;
				},1000);
			});
			return hero;
	});


		$.player = new $.fn.Entity(0,2048,80,64,{	
			"Renderer":{
				"image": "fighter",
				"anchor": {"x": 40,	"y": 38},
				"animation": "straight" 
			},
			"CollisionBody":{
				"x":19,
				"y":6,
				"width":43,
				"height":57
			},
			"Hero":{}
		});

		var enemy = new $.fn.Entity(0,0,60,64,{
			"Renderer":{
				"image": "xwing",
				"anchor": {"x": 30,	"y": 52},
				"animation": "straight",
				"rotation": 3.14
			},
			"CollisionBody":{
				"x":6,
				"y":4,
				"width":49,
				"height":59
			}
		});

		$.fn.stage.setLevel('level1');
		$.fn.addToGroup($.player,'player');
		$.fn.addToGroup($.player,'toRender');

		for(var i=0; i<8; i++){
			var e = enemy.clone(Math.random()*320-160, Math.random()*(2048-512)+512);
			$.fn.addToGroup(e,'enemies');
			$.fn.addToGroup(e,'toRender');
		}
		
		$.fn.defineCollidingGroups('player','enemies');

		
		$.fpsdom = document.querySelector('#fps');
		window.player = $.player; // only for testing purposes
		$.fn.stage.setFocus($.player,0,-128);
		
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
};