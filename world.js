function World(container) {
    this.box = new SolidBox(this);
    this.container = container;
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");
    this.mouse = new Mouse();
    this.keyboard = new Keyboard();
    this.baseX = 0;
    this.baseY = 0;

    // Constructor
    this.container.appendChild(this.canvas);
    this.onResize();

    var me = this;

    // Handle resize event
    this.container.onresize = function(e) {
        me.onResize();
    };

    // Handle mouse event
    this.mouse.setMouseMoveCallback(function(x, y) {
        var rect = me.canvas.getBoundingClientRect();
        me.box.onMouseMoveSub(x - rect.left, y - rect.top);
    });

    this.mouse.setMouseDownCallback(function(x, y) {
        me.box.onMouseDownSub(x, y);
    });

    this.mouse.setMouseUpCallback(function(x, y) {
        me.box.onMouseUpSub(x, y);
    });
}

World.prototype = new Base();
World.prototype.constructor = World;
World.prototype.onResize = function() {
    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight;

    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.onRedraw();
    this.box.onResize();
}

World.prototype.onRedraw = function () {
    this.context.fillStyle = "#AAA";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
}

World.prototype.getWorld = function() {
    return this;
};

World.prototype.getContext = function() {
    return this.context;
}

