function Base() {
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.parent = null;
    this.childs = [];
    this.hover = false;
    this.mouseLock = false;
}

Base.prototype.getContext = function() {
    return this.parent.getContext();
}

Base.prototype.setParent = function(parent) {
    this.parent = parent;
};

Base.prototype.setPosition = function(x, y) {
    this.x = x || this.x;
    this.y = y || this.y;
}

Base.prototype.setSize = function(width, height) {
    this.width = width || this.width;
    this.height = height || this.height;
}

Base.prototype.getAccumulatedPosition = function() {
    if (!this.parent)
        return { x: this.x, y: this.y };

    var parentPos = this.parent.getAccumulatedPosition();
    return { x: this.x + parentPos.x, y: this.y + parentPos.y };
}

Base.prototype.getWorld = function() {
    return this.parent;
}

Base.prototype.getContext = function() {
    return this.parent.getContext();
}

Base.prototype.hitTest = function(x, y) {
    var pos = this.getAccumulatedPosition();
    return x >= pos.x && x <= pos.x + this.width && y >= pos.y && y <= pos.y + this.height;
};

Base.prototype.setMouseLock = function(val) {
    this.mouseLock = val;
}

Base.prototype.onRedraw = function() {
}

Base.prototype.onResize = function() {
    this.onRedraw();
}

Base.prototype.onMouseMoveSub = function(x, y) {
    this.onMouseMove(x, y);
    for (var i in this.childs) {
        if (this.childs[i].hitTest(x, y)) {
            this.childs[i].onMouseMoveSub(x, y);
            if (!this.childs[i].hover) {
                this.childs[i].hover = true;
                this.childs[i].onMouseEnter();
            }
        } else if (this.childs[i].hover) {
            this.childs[i].hover = false;
            this.childs[i].onMouseLeave();
        }
    }
}

Base.prototype.onMouseMove = function(x, y) {
}

Base.prototype.onMouseEnter = function() {
}

Base.prototype.onMouseLeave = function() {
}

Base.prototype.onMouseDownSub = function(x, y) {
    this.onMouseDown(x, y);
    for (var i in this.childs) {
        if (this.childs[i].mouseLock || this.childs[i].hitTest(x, y))
            this.childs[i].onMouseDownSub(x, y);
    }
}

Base.prototype.onMouseDown = function(x, y) {
}

Base.prototype.onMouseUpSub = function(x, y) {
    this.onMouseUp(x, y);
    for (var i in this.childs) {
        if (this.childs[i].mouseLock || this.childs[i].hitTest(x, y))
            this.childs[i].onMouseUpSub(x, y);
    }
}

Base.prototype.onMouseUp = function(x, y) {
}

Base.prototype.onAttached = function(parent) {
}
