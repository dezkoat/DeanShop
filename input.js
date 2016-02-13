function Mouse() {
    this.x = 0;
    this.y = 0;
    this.down  = false;
    this.cbmove = null;
    this.cbdown = null;
    this.cbup = null;

    var me = this;
    document.addEventListener('mousemove', function(e) {
        me.x = e.clientX;
        me.y = e.clientY;

        if (me.cbmove)
            me.cbmove(me.x, me.y);
    });

    document.addEventListener('mousedown', function(e) {
        me.down = true;
        if (me.cbdown)
            me.cbdown(me.x, me.y);
    });

    document.addEventListener('mouseup', function(e) {
        me.down = false;
        if (me.cbup)
            me.cbup(me.x, me.y);
    });
}

Mouse.prototype.setMouseMoveCallback = function(cb) {
    this.cbmove = cb;
}

Mouse.prototype.setMouseDownCallback = function(cb) {
    this.cbdown = cb;
}

Mouse.prototype.setMouseUpCallback = function(cb) {
    this.cbup = cb;
}

Mouse.prototype.isDown = function() {
    return this.down;
};

Mouse.prototype.clear = function() {
    this.down = false;
}

function Keyboard() {
    this.up   = [];
    this.down = [];

    var me = this;
    document.addEventListener('keydown', function(e) {
        var idd = me.down.indexOf(e.keyCode);
        if (idd == -1)
            me.down.push(e.keyCode);
        
        var idu = me.up.indexOf(e.keyCode);
        if (idu != -1)
            me.up.splice(idu, 1);
    });

    document.addEventListener('keyup', function(e) {
        var idx = me.down.indexOf(e.keyCode);
        if (idx != -1){
            me.down.splice(idx, 1);
            me.up.push(e.keyCode);
        }
    });
}

Keyboard.prototype.isDown = function(key) {
    var idx = this.down.indexOf(key);
    return (idx != -1);
}

Keyboard.prototype.isUp = function(key) {
    var idx = this.up.indexOf(key);
    return (idx != -1); 
}

Keyboard.prototype.clear = function(key) {
    var idu = this.up.indexOf(key);
    var idd = this.down.indexOf(key);
    if (idu != -1)
        this.splice(idu, 1);
    if (idd != -1)
        this.splice(idd, 1);
}

var keyLeft  = 37;
var keyRight = 39;
var keyUp    = 38;
var keyDown  = 40;
var keyShift = 16;
var keyCtrl  = 17;
var keyAlt   = 18;
var keyEnter = 13;
var keyBack  = 8;
var keyEsc   = 27;
var keySpace = 32;
var keyA     = 'A'.charCodeAt(0);
var keyB     = 'B'.charCodeAt(0);
var keyC     = 'C'.charCodeAt(0);
var keyD     = 'D'.charCodeAt(0);
var keyE     = 'E'.charCodeAt(0);
var keyF     = 'F'.charCodeAt(0);
var keyG     = 'G'.charCodeAt(0);
var keyH     = 'H'.charCodeAt(0);
var keyI     = 'I'.charCodeAt(0);
var keyJ     = 'J'.charCodeAt(0);
var keyK     = 'K'.charCodeAt(0);
var keyL     = 'L'.charCodeAt(0);
var keyM     = 'M'.charCodeAt(0);
var keyN     = 'N'.charCodeAt(0);
var keyO     = 'O'.charCodeAt(0);
var keyP     = 'P'.charCodeAt(0);
var keyQ     = 'Q'.charCodeAt(0);
var keyR     = 'R'.charCodeAt(0);
var keyS     = 'S'.charCodeAt(0);
var keyT     = 'T'.charCodeAt(0);
var keyU     = 'U'.charCodeAt(0);
var keyV     = 'V'.charCodeAt(0);
var keyW     = 'W'.charCodeAt(0);
var keyX     = 'X'.charCodeAt(0);
var keyY     = 'Y'.charCodeAt(0);
var keyZ     = 'Z'.charCodeAt(0);
var key1     = '1'.charCodeAt(0);
var key2     = '2'.charCodeAt(0);
var key3     = '3'.charCodeAt(0);
var key4     = '4'.charCodeAt(0);
var key5     = '5'.charCodeAt(0);
var key6     = '6'.charCodeAt(0);
var key7     = '7'.charCodeAt(0);
var key8     = '8'.charCodeAt(0);
var key9     = '9'.charCodeAt(0);
var key0     = '0'.charCodeAt(0);
