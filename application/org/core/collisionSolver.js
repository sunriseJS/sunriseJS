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


	$rootScope.checkCollisions = function(){
		var objs = $rootScope.groups['collidingObjects'];
		for (i = values.length - 1; i >= 0; --i) {
		    //TODO: check Entites collider type
		    var o = objs[i];
		    if(colliderTesters.rectangle.rectangle(o[0],o[1])){
		    	o[0].emit('collision',{other: o[1]});
		    	o[1].emit('collision',{other: o[0]});
		    }
		}
	}

})();