(function(){

	var colliderTesters = {
			rectangle : {
				rectangle : function(f, s){
					var collision = {},
						n = {
							x: f.x - s.x,
							y : f.y - s.y,
							ax : Math.abs(f.x - s.x),
							ay : Math.abs(f.y - s.y)
						},
						realLength = (f.x < s.x) ? n.ax+s.width : n.ax+f.width,
						xOverlap = (f.width+s.width) - realLength;
					if(xOverlap > 0){
						var	realHeight = (f.y < s.y) ? n.ay+s.height : n.ay+f.height,
							yOverlap = (f.height+s.height) - realHeight;
						if(yOverlap > 0){
							if(xOverlap < yOverlap){
								if(n.x < 0){
									collision.normal = {x: 1, y: 0};
								}else{
									collision.normal = {x: -1, y: 0};
								}
								collision.penetration = xOverlap;
							}else{
								if(n.y < 0){
									collision.normal = {x: 0, y: 1};
								}else{
									collision.normal = {x: 0, y: -1};
								}
								collision.penetration = yOverlap;
							}
							return collision;
						}
					}
					
					return false;
				},
				circle : function(f, s){
					return false;
				},
				pixel : function(f, s){
					return false;
				}
			},
			circle : {
				rectangle : function(f, s){
					colliderTesters.rectangle.circle(second, first);
				},
				circle : function(f, s){
					var a = Math.pow((f.x - s.x),2)+Math.pow((f.y - s.y),2);
					var b = Math.pow((f.r + s.r),2);
					return a <= b;
				},
				pixel : function(f, s){
					return false;
				}
			},
			pixel : {
				rectangle : function(f, s){
					colliderTesters.rectangle.pixel(second, first);
				},
				circle : function(f, s){
					colliderTesters.circle.pixel(second, first);
				},
				pixel : function(f, s){
					return false;
				}
			}
		}

	rootfn.colliderTesters = colliderTesters;


	rootfn.checkCollisions = function(){
		var objs = $rootScope.groups['collidingObjects'];
		for (i = objs.length - 1; i >= 0; --i) {
		    var o = objs[i],
		    	f = o[0].getComponentData('CollisionBody','bounds'),
		    	s = o[1].getComponentData('CollisionBody','bounds'),
		    	c1 = o[0].getComponentData('CollisionBody','colliderType'),
		    	c2 = o[1].getComponentData('CollisionBody','colliderType');

	    	if(f === undefined || s === undefined){
	    		throw new Error('Collision can only be tested on entities with a CollisionBody component.');
	    	}
	    	f.x += o[0].x;
	    	f.y += o[0].y;
	    	s.x += o[1].x;
	    	s.y += o[1].y;



	    	var collision = colliderTesters[c1][c2](f,s);

	    	f.x -= o[0].x;
	    	f.y -= o[0].y;
	    	s.x -= o[1].x;
	    	s.y -= o[1].y;

		    if(collision !== false){
		    	var otherCollision = {normal: {x:-collision.normal.x, y: -collision.normal.y}, penetration:collision.penetration};
		    	o[0].emit('collision',{other: o[1], collision: collision});
		    	o[1].emit('collision',{other: o[0], collision: otherCollision});
		    }
		    

		}
	}

})();