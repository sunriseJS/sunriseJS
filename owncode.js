var game = {
	config:{
		screenWidth: 640,
		screenHeight 360,
		plugins: [
			'CollisionBody'
		],
		images: {
			'player':{
				source: 'assets/graphics/fighter.png',
				tileWidth: 80,
				tileHeight: 64,
				animation:{
					'straight': [4],
					'left': [0],
					'right': [8],
					'animation': [4,3,2,3,4,5,6,5,4]
				}
			},
			'xwing': {
				source: 'assets/graphics/xming.png',
				tileWidth: 60,
				tileHeight: 64,
				animations: {
					'straight': [4],
					'left': {
						'in':[4,3,2,1],
						'loop':[0],
						'out':[1,2,3,4]
					},
					'right': {
						'in':[4,5,6,7],
						'loop':[8],
						'out':[7,6,5,4]
					},
					'hit': [4,3,2,3,4,5,6,5,4]
				}
			},
			'bullet':{
				source: 'assets/graphics/bullet.png'
			},
			'space1':{
				source: 'assets/graphics/space.jpg'
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
	}
}