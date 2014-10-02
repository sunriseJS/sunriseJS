(function(){

	var colliderTesters = {
			rectangle : {
				rectangle : function(f, s){
					var colX = (s.x >= f.x && s.x <= f.x + f.width);
					colX = colX || (f.x >= s.x && f.x <= s.x + s.width);
					var colY = (s.y >= f.y && s.y <= f.y + f.height);
					colY = colY || (f.y >= s.y && f.y <= s.y + s.height);
					//console.log('testCollision rectangle:',colX, colY, f, s);
					return colX && colY;
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

		    if(colliderTesters[c1][c2](f,s)){
		    	o[0].emit('collision',{other: o[1]});
		    	o[1].emit('collision',{other: o[0]});
		    }
		    f.x -= o[0].x;
	    	f.y -= o[0].y;
	    	s.x -= o[1].x;
	    	s.y -= o[1].y;

		}
	}

})();