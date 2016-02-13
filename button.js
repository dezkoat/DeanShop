function Button(text) {
    this.text = text;
    this.down = false;
    this.cb = null;
    this.enabled = true;
}

Button.prototype = new Base();
Button.prototype.constructor = Button;

Button.prototype.setCallback = function(cb) {
    this.cb = cb;
}

Button.prototype.setEnabled = function(val) {
    this.enabled = val;
    this.onRedraw();
}

Button.prototype.onRedraw = function() {
    var context = this.getContext();
    context.beginPath();
    context.rect(this.x, this.y, this.width, this.height);
    context.fillStyle = "#fff";
    if (!this.enabled)
        context.fillStyle = "#aaa";
    else if (this.down)
        context.fillStyle = "#888";
    else if (this.hover)
        context.fillStyle = "#ddd";

    context.fill();
    context.strokeStyle = "#000";
    context.stroke();
    context.fillStyle = "#000";
    context.font = "12pt Calibri";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2);
}

Button.prototype.onMouseEnter = function(x, y) {
    if (!this.enabled)
        return;

    this.onRedraw();
}

Button.prototype.onMouseLeave = function(x, y) {
    if (!this.enabled)
        return;

    this.onRedraw();
}

Button.prototype.onMouseDown = function(x, y) {
    if (!this.enabled)
        return;

    this.down = true;
    this.setMouseLock(true);
    this.onRedraw();
}

Button.prototype.onMouseUp = function(x, y) {
    if (!this.enabled)
        return;

    this.down = false;
    this.setMouseLock(false);
    if (this.cb && this.hitTest(x, y))
        this.cb();

    this.onRedraw();
}
