function Stage() {
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");
    this.canvas.width = 640;
    this.canvas.height = 480;
    this.zoom = 1;
}

Stage.prototype = new Base();
Stage.prototype.constructor = Stage;

Stage.prototype.loadImage = function(path) {
    this.image = new Image();
    this.image.src = path;

    var me = this;
    this.image.onload = function() {
        me.canvas.width = me.image.width;
        me.canvas.height = me.image.height;
        me.context.drawImage(me.image, 0, 0, me.canvas.width, me.canvas.height);
        me.onRedraw();
    }
}

Stage.prototype.setImage = function(imgData) {
    this.clear();
    this.canvas.width = imgData.width;
    this.canvas.height = imgData.height;
    this.context.putImageData(imgData, 0, 0);
    this.onRedraw();
}

Stage.prototype.getImage = function() {
    return this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
}

Stage.prototype.clear = function() {
    this.context.fillStyle = "#aaa";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.onRedraw();
}

Stage.prototype.setSize = function(width, height) {
    this.canvas.width = width || this.canvas.width;
    this.canvas.height = height || this.canvas.height;
}

Stage.prototype.onRedraw = function() {
    var context = this.getContext();
    var imgData = this.getImage();
    var pos = this.getAccumulatedPosition();
    var w = this.canvas.width;
    var h = this.canvas.height;
    var imgObject = new Image();
    var me = this;
    imgObject.onload = function() {
        context.scale(me.zoom, me.zoom);
        context.drawImage(imgObject, pos.x / me.zoom, pos.y / me.zoom);
        context.setTransform(1, 0, 0, 1, 0, 0);
    }
    imgObject.src = this.canvas.toDataURL();
}

Stage.prototype.onMouseEnter = function(x, y) {
}

Stage.prototype.onMouseLeave = function(x, y) {
}

Stage.prototype.onMouseDown = function(x, y) {
}

Stage.prototype.onMouseUp = function(x, y) {
}

Stage.prototype.onAttached = function(parent) {
    this.clear();
}
