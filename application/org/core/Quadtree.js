/**
 * Quadtree for speeding up collision detection
 * @param Number level       Depth of this Quadtree
 * @param Number x           Horiziontal position
 * @param Number y           Vertical position
 * @param Number width       Horizontal size
 * @param Number height      Vertical size
 * @param Number maxLevels   Max depth of Quadtrees
 * @param Number maxEntities Max count of entites until Quadtree splits
 */
var Quadtree = window.Quadtree = srfn.Quadtree = function(level, x, y, width, height, maxLevels, maxEntities){
	this.maxLevels = maxLevels || 5;
	this.maxEntities = maxEntities || 10;
	this.level = level;
	this.bounds = {
		x: x,
		y: y,
		width: width,
		height: height,
	};
	this.center = {
		x: x + width/2,
		y: y + height/2
	}
	this.nodes = [];
	this.entities = [];
};

Quadtree.prototype.clear = function(){
	this.entities = [];
	for(var i = this.nodes.length;i--;){
		if(typeof this.nodes[i] !== 'undefined'){
			this.nodes[i].clear();
		}
	} 
	this.nodes = [];
};

Quadtree.prototype.getNodeIndex = function(entity){
	var x = entity.x,
		y = entity.y,
		cx = this.center.x,
		cy = this.center.y,
		left = x < cx && (x+entity.width) < cx,
		right = x > cx,
		top = y < cy && (y+entity.height) < cy,
		bottom = y > cy;

	if(left){
		if(top){
			return 1;
		}else if(bottom){
			return 2;
		}
	}else if(right){
		if(top){
			return 0;
		}else if(bottom){
			return 3;
		}
	}

	return -1;
}

Quadtree.prototype.split = function(){
	var x = this.bounds.x,
		y = this.bounds.y,
		w = this.bounds.width/2,
		h = this.bounds.height/2,
		l = this.level+1;

	this.nodes[0] = new Quadtree(l, x+w, y, w, h);
	this.nodes[1] = new Quadtree(l, x, y, w, h);
	this.nodes[2] = new Quadtree(l, x, y+h, w, h);
	this.nodes[3] = new Quadtree(l, x+w, y+h, w, h);
};

Quadtree.prototype.insert = function(entity){
	if(this.nodes.length !== 0){
		var index = this.getNodeIndex(entity);
		if(index !== -1){
			this.nodes[index].insert(entity);
			return;
		}
	}

	this.entities.push(entity);

	if(this.entities.length > this.maxEntities && this.level < this.maxLevels){
		if(this.nodes.length === 0){
			this.split();
		}

		for(var i = this.nodes.length;i--;){
			var index = this.getNodeIndex(this.entities[i]);
			if(index !== -1){
				this.nodes[index].insert(this.entities.pop());
			}
		}
	}
};

Quadtree.prototype.getPossibleCollisions = function(entity){
	var result = [],
		index = this.getNodeIndex(entity);
	if(index !== -1 && this.nodes.length !== 0){
		result = result.concat(this.nodes[index].getPossibleCollisions(entity));
	}

	result = result.concat(this.entities);
	return result;

};
