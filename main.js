start(function() {
    var body = document.getElementsByTagName("body")[0];
    var world = new World(body);
    var stage = new Stage();

    var open = new Button("Open");
    var save = new Button("Save");
    var close = new Button("Close");
    var gray = new Button("Grayscale");
    var ds2x = new Button("DSampling 2x");
    var ds4x = new Button("DSampling 4x");
    var ds8x = new Button("DSampling 8x");
    var quant8 = new Button("Quant 8");
    var quant4 = new Button("Quant 4");
    var quant1 = new Button("Quant 1");
    var mask = new Button("Masking");
    var us2x = new Button("USampling 2x");
    var us4x = new Button("USampling 4x");
    var us8x = new Button("USampling 8x");
    var bl25 = new Button("Blend 25%");
    var bl50 = new Button("Blend 50%");
    var bl75 = new Button("Blend 75%");
    var fliph = new Button("Flip H");
    var flipv = new Button("Flip V");
    var rot15 = new Button("Rotate 15");
    var rot30 = new Button("Rotate 30");
    var rot45 = new Button("Rotate 45");
    var rot90 = new Button("Rotate 90");
    var rot180 = new Button("Rotate 180");
    var cutb = new Button("Cut");
    var pasteb = new Button("Paste");
    var wrapb = new Button("Wrap");
    var kernelb = new Button("Kernel");
    var scale50 = new Button("Scale 50%/150%");
    var bfft = new Button("FFT");
    var bifft = new Button("iFFT");
    var histeqb = new Button("Hist Equalization");
    var btns = [save, close, gray, ds2x, ds4x, ds8x, wrapb, kernelb,
                quant8, quant4, quant1, us2x, us4x, us8x, bl25, bl50, bl75,
                mask, rot15, rot30, rot45, rot90, rot180, fliph, flipv, cutb,
                scale50, bfft, bifft, histeqb ];

    world.box.attach(open, 10, 10, 84, 24);
    world.box.attach(save, 104, 10, 84, 24);
    world.box.attach(close, 198, 10, 84, 24);
    world.box.attach(gray, 292, 10, 84, 24);
    world.box.attach(ds2x, 386, 10, 84, 24);
    world.box.attach(ds4x, 480, 10, 84, 24);
    world.box.attach(ds8x, 574, 10, 84, 24);
    world.box.attach(scale50, 668, 10, 84, 24);

    world.box.attach(quant8, 10, 44, 84, 24);
    world.box.attach(quant4, 104, 44, 84, 24);
    world.box.attach(quant1, 198, 44, 84, 24);
    world.box.attach(mask, 292, 44, 84, 24);
    world.box.attach(us2x, 386, 44, 84, 24);
    world.box.attach(us4x, 480, 44, 84, 24);
    world.box.attach(us8x, 574, 44, 84, 24);
    world.box.attach(bfft, 668, 44, 84, 24);

    world.box.attach(bl25, 10, 78, 84, 24);
    world.box.attach(bl50, 104, 78, 84, 24);
    world.box.attach(bl75, 198, 78, 84, 24);
    world.box.attach(fliph, 292, 78, 84, 24);
    world.box.attach(flipv, 386, 78, 84, 24);
    world.box.attach(cutb, 480, 78, 84, 24);
    world.box.attach(pasteb, 574, 78, 84, 24);
    world.box.attach(bifft, 668, 78, 84, 24);

    world.box.attach(rot15, 10, 112, 84, 24);
    world.box.attach(rot30, 104, 112, 84, 24);
    world.box.attach(rot45, 198, 112, 84, 24);
    world.box.attach(rot90, 292, 112, 84, 24);
    world.box.attach(rot180, 386, 112, 84, 24);
    world.box.attach(kernelb, 480, 112, 84, 24);
    world.box.attach(wrapb, 574, 112, 84, 24);
    world.box.attach(histeqb, 668, 112, 84, 24);

    world.box.attach(stage, 10, 148, 640, 480);

    pasteb.setEnabled(false);
    for (var i in btns)
        btns[i].setEnabled(false);

    open.setCallback(function() {
        fileOpen(fileShow);
    });

    save.setCallback(function() {
        var a = document.createElement("a");
        a.href = stage.canvas.toDataURL();
        a.download = "hasil.png";

        var clickEvent = new MouseEvent("click", {
            "view": window,
            "bubbles": true,
            "cancelable": false
        });

        a.dispatchEvent(clickEvent);
    });

    close.setCallback(function() {
        open.setEnabled(true);
        for (var i in btns)
            btns[i].setEnabled(false);
        pasteb.setEnabled(false);
        stage.clear();
    });

    gray.setCallback(function() {
        stage.setImage(rgb2gray(stage.getImage()));
    });

    ds2x.setCallback(function() {
        stage.setImage(dsampling(stage.getImage(), 2));
    });

    ds4x.setCallback(function() {
        stage.setImage(dsampling(stage.getImage(), 4));
    });

    ds8x.setCallback(function() {
        stage.setImage(dsampling(stage.getImage(), 8));
    });

    us2x.setCallback(function() {
        stage.setImage(usampling(stage.getImage(), 2));
    });

    us4x.setCallback(function() {
        stage.setImage(usampling(stage.getImage(), 4));
    });

    us8x.setCallback(function() {
        stage.setImage(usampling(stage.getImage(), 8));
    });

    quant8.setCallback(function() {
        stage.setImage(quantize(stage.getImage(), 256));
    });

    quant4.setCallback(function() {
        stage.setImage(quantize(stage.getImage(), 16));
    });

    quant1.setCallback(function() {
        stage.setImage(quantize(stage.getImage(), 2));
    });

    bl25.setCallback(function() {
        fileOpen(fileBlend25);
    });

    bl50.setCallback(function() {
        fileOpen(fileBlend50);
    });

    bl75.setCallback(function() {
        fileOpen(fileBlend75);
    });

    fliph.setCallback(function() {
        stage.setImage(flip(stage.getImage(), HORIZONTAL));
    });

    flipv.setCallback(function() {
        stage.setImage(flip(stage.getImage(), VERTICAL));
    });

    mask.setCallback(function() {
        fileOpen(fileMask);
    });

    rot15.setCallback(function() {
        stage.setImage(rot(stage.getImage(), 15));
    });

    rot30.setCallback(function() {
        stage.setImage(rot(stage.getImage(), 30));
    });

    rot45.setCallback(function() {
        stage.setImage(rot(stage.getImage(), 45));
    });

    rot90.setCallback(function() {
        stage.setImage(rot(stage.getImage(), 90));
    });

    rot180.setCallback(function() {
        stage.setImage(rot(stage.getImage(), 180));
    });

    cutb.setCallback(function() {
        stage.setImage(cut(stage.getImage(), 30, 20, 220, 200));
        pasteb.setEnabled(true);
    });

    pasteb.setCallback(function() {
        stage.setImage(paste(stage.getImage(), 20, 20));
    });

    kernelb.setCallback(function() {
        stage.setImage(kernel(stage.getImage(), EDGE3));
    });

    wrapb.setCallback(function() {
        stage.setImage(wrap(stage.getImage()));
    });

    scale50.setCallback(function() {
        stage.setImage(scale(stage.getImage(), 0.5, 1.5));
    });

    bfft.setCallback(function() {
        stage.setImage(imfft(stage.getImage()));
    });

    bifft.setCallback(function() {
        stage.setImage(imifft(stage.getImage()));
    });

    histeqb.setCallback(function() {
        stage.setImage(histeq(stage.getImage(), 1.5, 0.5));
    });

    var input = null;
    function fileOpen(arg) {
        input = document.createElement("input");
        input.addEventListener("change", arg, false);
        input.type = "file";
        input.click();
    }

    function fileShow(e) {
        input.removeEventListener("change", fileShow, false);
        stage.loadImage(URL.createObjectURL(e.target.files[0]));

        open.setEnabled(false);
        for (var i in btns)
            btns[i].setEnabled(true);

        if (mem)
            pasteb.setEnabled(true);
    }

    function fileBlend25(e) {
        fileBlend(e, 0.25);
    }

    function fileBlend50(e) {
        fileBlend(e, 0.5);
    }

    function fileBlend75(e) {
        fileBlend(e, 0.75);
    }

    function fileBlend(e, val) {
        input.removeEventListener("change", fileBlend, false);

        var image = new Image();
        image.src = URL.createObjectURL(e.target.files[0]);

        image.onload = function() {
            var canvas = document.createElement("canvas");
            var context = canvas.getContext("2d");
            canvas.width = image.width;
            canvas.height = image.height;
            context.drawImage(image, 0, 0, canvas.width, canvas.height);

            var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
            stage.setImage(blend(stage.getImage(), imgData, val));
        }
    }

    function fileMask(e) {
        input.removeEventListener("change", fileMask, false);

        var image = new Image();
        image.src = URL.createObjectURL(e.target.files[0]);

        image.onload = function() {
            var canvas = document.createElement("canvas");
            var context = canvas.getContext("2d");
            canvas.width = image.width;
            canvas.height = image.height;
            context.drawImage(image, 0, 0, canvas.width, canvas.height);

            var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
            stage.setImage(masking(stage.getImage(), imgData));
        }
    }
});
