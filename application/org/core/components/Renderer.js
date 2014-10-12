/**
 * @license sunriseJS Game Engine
 * @copyright (C) 2014 - 2014 Jonas Gerdes, Jonathan Wiemers
 * http://www.sunrisejs.net
 *
 * sunriseJS is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license.php
 *
 */

/*
 * ComponentDescription
 * Renderer
 * Renders a sprite on screen, handels animation
 *
 * emits:
 *
 * receives:
 *  draw {}
 *  rotate {
 *          radian - radians to rotate
 *          [degree] - degrees to rotate
 *          [isRelative] - is rotation relative?            
 *      }
 *      
 *  changeAnimation {
 *          animation - name of animation
 *          [frame] - frame number to start with
 *          [restart] - if animation is already running, restart it?
 *      }
 *
 * changeOpacity {
 *          opacity - new opacity
 * }
 *
 * changeAnchor {
 *          x - horizontal position of anchor
 *          y - vertical position of anchor
 * }
 */
srfn.Renderer = (function(){ 


    

    /**
     * Contructor of Renderer Component
     * @param {String} image_name name of the image
     * @param {Object} data       optional and may contain animation, rotation, alpha or anchor
     */
    Renderer = function(config){
        srfn.Component.call(this);
        var self = this;
        //Test whether image exists
        var image_name = config.image;
        if(game.config.images[image_name] === undefined){
            throw new Error('No image with name "'+image_name+'" found');
        }
        var data = game.config.images[image_name];
        var data_ = config || {};

        //Test whether all required parameters are given
        var requiredParams = [];
        if(data.tileWidth !== undefined || data.tileHeight !== undefined || data.animations !== undefined){
            requiredParams.push('tileWidth');
            requiredParams.push('tileHeight');
        }

        requiredParams.forEach(function(param){
            if(data[param] === undefined || data[param] === ""){
                throw new Error('No element "'+param+'" specified in data');
            }
        });

        this.image = $rootScope.ressources.images[image_name];
        if(data.tileWidth === undefined){
            data.tileWidth = this.image.width;
            data.tileHeight = this.image.height;
        }
        if(data.animations === undefined){
            data.animations = {};
        }
        //Make sure there is at least one animation
        if(data.animations.default === undefined){
            data.animations.default = [0];
        }

        this.setAnimation = function(animationName){
           var animation = this.animations[animationName];
            if(animation instanceof Array){
                if(this.currentAnimation.out.length === 0){
                    this.currentAnimation = {"in":[], "out":[], "loop":animation};
                    this.currentFrameNumber = 0;
                    this.animationType = 'in';
                    this.currentAnimation.name = animationName;
                }else{
                    this.nextAnimation = {"in":[], "out":[], "loop":animation, "name":animationName};
                }
            }else{
                if(animation.loop === undefined || animation.loop.length === 0){
                    throw new Error('Please provide at least a "loop" animation with 1 frame.');
                }
                this.nextAnimation = {};
                this.nextAnimation['in'] = animation['in'] || [];
                this.nextAnimation.loop = animation.loop;
                this.nextAnimation.out = animation.out || [];
                this.nextAnimation.name = animationName;
            }
        }

        this.nextFrame = function(){
            this.currentFrameNumber++;
            while(this.currentFrameNumber >= this.currentAnimation[this.animationType].length){
                switch(this.animationType){
                    case 'in': 
                        this.currentFrameNumber = 0;
                        this.animationType = 'loop';
                        break;
                    case 'loop':
                        this.currentFrameNumber = 0;
                        if(this.nextAnimation !== undefined){
                            this.animationType = 'out';
                        }
                        break;
                    case 'out':
                        this.currentFrameNumber = 0;
                        this.currentAnimation = this.nextAnimation;
                        this.nextAnimation = undefined;
                        this.animationType = 'in';
                        break;
                }

            }  
            this.currentFrame = this.currentAnimation[this.animationType][this.currentFrameNumber]; 
        }

    
        this.width = data.tileWidth;
        this.height = data.tileHeight;
        this.rotation = data_.rotation || 0;
        this.alpha = (data_.alpha === undefined) ? 1 : data_.alpha;
        this.animations = data.animations;
        this.anchor = data_.anchor || { x: 0, y:0};

        //Context from other modules
        this.context = $rootScope.canvas.context;

        this.currentFrameNumber = 0;
        this.currentAnimation = {"in":[],loop:[],out:[],name:''};
        this.animationType = 'in';
        this.lastDrawTime = Date.now();
        this.frameDuration = 60; //in Milliseconds

        if(data_.animation === undefined || this.animations[data_.animation] === undefined){
            //Until an actual animation is set, use first one
            for(anim in this.animations){
                this.setAnimation(anim);
                break;
            }
        }else{
            this.setAnimation(data_.animation);
        }

        

        //Calculate values for spritesheet
        this.cols = Math.floor( self.image.width / self.width );
        this.rows = Math.floor( self.image.height / self.height );

        

        this.on('draw', function(data){
            var xo = self.entity.x + data.offsetX,
                yo = self.entity.y + data.offsetY,
                x = xo - self.anchor.x,
                y = yo - self.anchor.y;

            if(self.alpha !== 1){
                self.context.globalAlpha = self.alpha;
            }

            if(self.rotation !== 0){
                self.context.save();
                self.context.translate(xo,yo);
                self.context.rotate(self.rotation);
                self.context.translate(-xo,-yo);
            }
        
            var drawWidth = self.entity.width || self.width;
            var drawHeight = self.entity.height || self.height;
            var frame = self.currentFrame;


            var sourceX = (frame % self.cols)*self.width;
            var sourceY = Math.floor(frame / self.cols)*self.height;

            self.context.drawImage(self.image, sourceX, sourceY, self.width, self.height, 
                        x, y, drawWidth, drawHeight);

             

            var now = Date.now();
            var delta = now - self.lastDrawTime;
            if(delta >= self.frameDuration){
                self.nextFrame();
                self.lastDrawTime = now;
            }


            self.context.globalAlpha = 1;
            if(self.rotation !== 0){
                self.context.restore();
            }

            if(window.debug){
                var bounds = self.entity.getComponentData('CollisionBody','bounds');
                self.context.strokeStyle ="#FF0000";
                self.context.strokeRect(x, y, self.entity.width, self.entity.height);
                if(bounds !== undefined){
                    self.context.strokeStyle ="#0000FF";
                    self.context.strokeRect(self.entity.x + data.offsetX+bounds.x, self.entity.y + data.offsetY+bounds.y, bounds.width, bounds.height);
                }
                self.context.strokeStyle ="#00FF00"; 
                self.context.strokeRect(x+self.anchor.x, y+self.anchor.y, 1,1);

            }

        });


        this.on('rotate', function(data){
            var rads = 0;
            if(data.degree !== undefined){
                rads = data.degree* Math.PI / 180
            }else{
                rads = data.radian;
            }
            if(data.isRelative){
                self.rotation += rads;
            }else{
                self.rotation = rads;
            }
            self.rotation %= 2*Math.PI; //handle angles larger then 2*pi
        });


        this.on('changeAnimation', function(data){
            if(self.animations[data.animation] === undefined){
                throw new Error('No animation with name '+data.animation+' found');
            }
            
            if((self.currentAnimation.name === data.animation ||
                (self.nextAnimation && self.nextAnimation.name === data.animation)) && !data.restart){
                return; 
            }
            self.setAnimation(data.animation);
        });

        this.on('changeOpacity', function(data){
            self.alpha = data.opacity || 0;
            self.alpha = self.alpha > 1 ? 1: (self.alpha < 0 ? 0: self.alpha);
        });



        //set up public data
        
        this.data.anchor = this.anchor;
    }

    srfn.Component.extend(Renderer);

    return Renderer;

})();


srfn.components.add('Renderer', function(config){
    return new srfn.Renderer(config);
});