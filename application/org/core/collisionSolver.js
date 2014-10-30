(function(){
var count = 0, time = 0;
	var colliderTesters = {
			rectangle : {
				rectangle : function(f, s){
					
					if(count == 0){
						time = $rootScope.time.actual;
					} 
					count++;
					if(($rootScope.time.actual-time) > 5000){
						console.log('rectangle',count); 
						count = 0;
					}
					
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
		var objs = $rootScope.groups['collidingGroups'],
			group1,group2, colEvent;
		for (i = objs.length - 1; i >= 0; --i) {
			group1 = objs[i][0];
			group2 = objs[i][1];
			colEvent = objs[i][2];
			for(var j = group1.length;j--;){ 
				for(var k = group2.length; k--;){
				    var first = group1[j],
				    	second = group2[k],
				    	firstX = first.x - first.anchor.x,
				    	firstW = first.width,
				    	secondX = second.x - second.anchor.x,
				    	secondW = second.width;

				    if((secondX >= firstX && secondX <= firstX + firstW) 
				    	|| (firstX >= secondX && firstX <= secondX + secondW)){

				    	var firstY = first.y - first.anchor.y,
					    	firstH = first.height,
					    	secondY = second.y - second.anchor.y,
					    	secondH = second.height;


					    if((secondY >= firstY && secondY <= firstY + firstH)
							 || (firstY >= secondY && firstY <= secondY + secondH)){

							var f = first.getComponentData('CollisionBody','bounds'),
						    	s = second.getComponentData('CollisionBody','bounds'),
						    	c1 = first.getComponentData('CollisionBody','colliderType'),
						    	c2 = second.getComponentData('CollisionBody','colliderType');

					    	f.x += first.x;
					    	f.y += first.y;
					    	s.x += second.x;
					    	s.y += second.y;



					    	var collision = colliderTesters[c1][c2](f,s);

					    	f.x -= first.x;
					    	f.y -= first.y;
					    	s.x -= second.x;
					    	s.y -= second.y;

						    if(collision !== false){

						    	var otherCollision = {normal: {x:-collision.normal.x, y: -collision.normal.y}, penetration:collision.penetration};
						    	$rootScope.emitDigit.push(utilfn.partial(first,first.emit,'collision',{other: second, collision: collision}));
						    	$rootScope.emitDigit.push(utilfn.partial(second,second.emit,'collision',{other: first, collision: otherCollision}));
						    	// console.log($rootScope.emitDigit);
						    }
						}
					} 
				}
		    }
		}
	}

})();