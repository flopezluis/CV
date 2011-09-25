var Sprite = function (img, animations) {
    this.animations = animations;
    this.img = img;
    this.lastTime = 0;
};
Sprite.prototype.image = undefined;
Sprite.prototype.setAnimation = function(animation) {
    this.currentFrame = 0
    this.currentAnimation = animation; 
}
Sprite.prototype.currentFrame = 0;
Sprite.prototype.draw = function(ctx, x, y) {
   var height = this.animations[this.currentAnimation].height;
   var width = this.animations[this.currentAnimation].width;
   var startFrameX =  this.animations[this.currentAnimation].x + (width * this.currentFrame);
   var startFrameY =  this.animations[this.currentAnimation].y;
   ctx.drawImage(this.img, startFrameX, startFrameY, width, height, x, y, width, height)
}
Sprite.prototype.getHeight = function() {
    return this.animations[this.currentAnimation].height;
};
Sprite.prototype.getWidth = function() {
    return this.animations[this.currentAnimation].width;
};

Sprite.prototype.nextFrame = function(now) {
    now = now || new Date().getTime();
    if (now - this.lastTime >=  this.animations[this.currentAnimation].duration) {
        this.currentFrame++;
        if (this.currentFrame >= this.animations[this.currentAnimation].frames) {
            if (this.animations[this.currentAnimation].finish) {
                this.animations[this.currentAnimation].finish();
            }
            this.currentFrame = 0;
        }
        this.lastTime = now;
        return true;
    }
    return false;
};

