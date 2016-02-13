start(function() {
    var body = document.getElementsByTagName("body")[0];
    var world = new World(body);
    var stage = new Stage();

    var open = new Button("Open");
    var save = new Button("Save");
    var close = new Button("Close");
    var gray = new Button("Grayscale");
    var s2x = new Button("Sampling 2x");
    var s4x = new Button("Sampling 4x");
    var s8x = new Button("Sampling 8x");
    var quant8 = new Button("Quant 8");
    var quant4 = new Button("Quant 4");
    var quant2 = new Button("Quant 2");

    world.box.attach(open, 10, 10, 84, 24);
    world.box.attach(save, 104, 10, 84, 24);
    world.box.attach(close, 198, 10, 84, 24);
    world.box.attach(gray, 292, 10, 84, 24);
    world.box.attach(s2x, 386, 10, 84, 24);
    world.box.attach(s4x, 480, 10, 84, 24);
    world.box.attach(s8x, 574, 10, 84, 24);

    world.box.attach(quant8, 10, 44, 84, 24);
    world.box.attach(quant4, 104, 44, 84, 24);
    world.box.attach(quant2, 198, 44, 84, 24);

    world.box.attach(stage, 10, 100, 640, 480);

    save.setEnabled(false);
    close.setEnabled(false);
    gray.setEnabled(false);
    s2x.setEnabled(false);
    s4x.setEnabled(false);
    s8x.setEnabled(false);

    open.setCallback(function() {
        fileOpen();
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
        save.setEnabled(false);
        close.setEnabled(false);
        gray.setEnabled(false);
        s2x.setEnabled(false);
        s4x.setEnabled(false);
        s8x.setEnabled(false);
        stage.clear();
    });

    gray.setCallback(function() {
        stage.setImage(rgb2gray(stage.getImage()));
    });

    s2x.setCallback(function() {
        stage.setImage(sampling(stage.getImage(), 2));
    });

    s4x.setCallback(function() {
        stage.setImage(sampling(stage.getImage(), 4));
    });

    s8x.setCallback(function() {
        stage.setImage(sampling(stage.getImage(), 8));
    });

    quant8.setCallback(function() {
        var opts = {
            colors: 256,             // desired palette size
            method: 2,               // histogram method, 2: min-population threshold within subregions; 1: global top-population
            boxSize: [64,64],        // subregion dims (if method = 2)
            boxPxls: 2,              // min-population threshold (if method = 2)
            initColors: 4096,        // # of top-occurring colors  to start with (if method = 1)
            minHueCols: 0,           // # of colors per hue group to evaluate regardless of counts, to retain low-count hues
            dithKern: null,          // dithering kernel name, see available kernels in docs below
            dithDelta: 0,            // dithering threshhold (0-1) e.g: 0.05 will not dither colors with <= 5% difference
            dithSerp: false,         // enable serpentine pattern dithering
            palette: [],             // a predefined palette to start with in r,g,b tuple format: [[r,g,b],[r,g,b]...]
            reIndex: false,          // affects predefined palettes only. if true, allows compacting of sparsed palette once target palette size is reached. also enables palette sorting.
            useCache: true,          // enables caching for perf usually, but can reduce perf in some cases, like pre-def palettes
            cacheFreq: 10,           // min color occurance count needed to qualify for caching
            colorDist: "euclidean",  // method used to determine color distance, can also be "manhattan"
        };

        var q = new RgbQuant(opts);

        var img = stage.getImage();
        q.sample(stage.canvas);
        var pal = q.palette(true);
        var out = q.reduce(stage.canvas);
        var data = img.data;
        for (var i = 0; i < data.length; ++i)
            data[i] = out[i];

        stage.setImage(img);
    });

    quant4.setCallback(function() {
        var opts = {
            colors: 16,             // desired palette size
            method: 2,               // histogram method, 2: min-population threshold within subregions; 1: global top-population
            boxSize: [64,64],        // subregion dims (if method = 2)
            boxPxls: 2,              // min-population threshold (if method = 2)
            initColors: 4096,        // # of top-occurring colors  to start with (if method = 1)
            minHueCols: 0,           // # of colors per hue group to evaluate regardless of counts, to retain low-count hues
            dithKern: null,          // dithering kernel name, see available kernels in docs below
            dithDelta: 0,            // dithering threshhold (0-1) e.g: 0.05 will not dither colors with <= 5% difference
            dithSerp: false,         // enable serpentine pattern dithering
            palette: [],             // a predefined palette to start with in r,g,b tuple format: [[r,g,b],[r,g,b]...]
            reIndex: false,          // affects predefined palettes only. if true, allows compacting of sparsed palette once target palette size is reached. also enables palette sorting.
            useCache: true,          // enables caching for perf usually, but can reduce perf in some cases, like pre-def palettes
            cacheFreq: 10,           // min color occurance count needed to qualify for caching
            colorDist: "euclidean",  // method used to determine color distance, can also be "manhattan"
        };

        var q = new RgbQuant(opts);

        var img = stage.getImage();
        q.sample(stage.canvas);
        var pal = q.palette(true);
        var out = q.reduce(stage.canvas);
        var data = img.data;
        for (var i = 0; i < data.length; ++i)
            data[i] = out[i];

        stage.setImage(img);
    });

    quant2.setCallback(function() {
        var opts = {
            colors: 2,             // desired palette size
            method: 2,               // histogram method, 2: min-population threshold within subregions; 1: global top-population
            boxSize: [64,64],        // subregion dims (if method = 2)
            boxPxls: 2,              // min-population threshold (if method = 2)
            initColors: 4096,        // # of top-occurring colors  to start with (if method = 1)
            minHueCols: 0,           // # of colors per hue group to evaluate regardless of counts, to retain low-count hues
            dithKern: null,          // dithering kernel name, see available kernels in docs below
            dithDelta: 0,            // dithering threshhold (0-1) e.g: 0.05 will not dither colors with <= 5% difference
            dithSerp: false,         // enable serpentine pattern dithering
            palette: [],             // a predefined palette to start with in r,g,b tuple format: [[r,g,b],[r,g,b]...]
            reIndex: false,          // affects predefined palettes only. if true, allows compacting of sparsed palette once target palette size is reached. also enables palette sorting.
            useCache: true,          // enables caching for perf usually, but can reduce perf in some cases, like pre-def palettes
            cacheFreq: 10,           // min color occurance count needed to qualify for caching
            colorDist: "euclidean",  // method used to determine color distance, can also be "manhattan"
        };

        var q = new RgbQuant(opts);

        var img = stage.getImage();
        q.sample(stage.canvas);
        var pal = q.palette(true);
        var out = q.reduce(stage.canvas);
        var data = img.data;
        for (var i = 0; i < data.length; ++i)
            data[i] = out[i];

        stage.setImage(img);
    });

    var input = null;
    function fileOpen() {
        input = document.createElement("input");
        input.addEventListener("change", loadURL, false);
        input.type = "file";
        input.click();
    }

    function loadURL(e) {
        input.removeEventListener("change", loadURL, false);
        stage.loadImage(URL.createObjectURL(e.target.files[0]));

        open.setEnabled(false);
        save.setEnabled(true);
        close.setEnabled(true);
        gray.setEnabled(true);
        s2x.setEnabled(true);
        s4x.setEnabled(true);
        s8x.setEnabled(true);
    }
});
