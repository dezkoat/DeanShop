function Stage() {
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");
    this.canvas.width = 640;
    this.canvas.height = 480;

    this.context.fillStyle = "#fff";
    this.context.fillRect(0, 0, 640, 480);
}

Stage.prototype = new Base();
Stage.prototype.constructor = Stage;

Stage.prototype.loadImage = function(path) {
    this.image = new Image();
    this.image.src = path;

    var me = this;
    this.image.onload = function() {
        me.canvas.width = Math.min(640, me.image.width);
        me.canvas.height = Math.min(480, me.image.height);
        me.context.drawImage(me.image, 0, 0, me.canvas.width, me.canvas.height);
        me.onRedraw();
    }
}

Stage.prototype.setImage = function(imgData) {
    this.context.putImageData(imgData, 0, 0);
    this.onRedraw();
}

Stage.prototype.getImage = function() {
    return this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
}

Stage.prototype.clear = function() {
    this.canvas.width = 640;
    this.canvas.height = 480;
    this.context.fillStyle = "#fff";
    this.context.fillRect(0, 0, 640, 480);
    this.onRedraw();
}

Stage.prototype.onRedraw = function() {
    var context = this.getContext();
    var imgData = this.getImage();
    var pos = this.getAccumulatedPosition();
    context.fillStyle = "#aaa";
    context.fillRect(pos.x, pos.y, 640, 480);
    context.putImageData(imgData, pos.x, pos.y);
}

Stage.prototype.onMouseEnter = function(x, y) {
}

Stage.prototype.onMouseLeave = function(x, y) {
}

Stage.prototype.onMouseDown = function(x, y) {
}

Stage.prototype.onMouseUp = function(x, y) {
}
