// =========== Solid Box ===========

function SolidBox(parent) {
    this.setParent(parent);
}

SolidBox.prototype = new Base();
SolidBox.prototype.constructor = SolidBox;

SolidBox.prototype.onResize = function() {
    this.x = this.parent.x;
    this.y = this.parent.y;
    this.width = this.parent.width;
    this.height = this.parent.height;

    this.onRedraw();

    var context = this.getContext();
    context.save();
    context.beginPath();
    context.rect(this.x, this.y, this.width, this.height);
    context.clip();

    for (var i in this.childs)
        this.childs[i].onResize();

    context.restore();
}

SolidBox.prototype.attach = function(obj, x, y, width, height) {
    this.childs.push(obj);
    obj.setPosition(x, y);
    obj.setSize(width, height);
    obj.setParent(this);
    obj.onAttached(this);
    this.onResize();
}

function VerticalBox() {
}
