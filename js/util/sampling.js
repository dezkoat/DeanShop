function dsampling(srcImg, N) {
    var w = srcImg.width / N;
    var h = srcImg.height / N;
    var area = 1.0 * N * N;

    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    canvas.width = w;
    canvas.height = h;

    var destImg = context.getImageData(0, 0, w, h);
    var src = srcImg.data;
    var dest = destImg.data;

    for (var y = 0; y < h; ++y) {
        for (var x = 0; x < w; ++x) {
            var destidx = 4 * (y * destImg.width + x);
            for (var j = 0; j < N; ++j) {
                for (var i = 0; i < N; ++i) {
                    var realx = (x * N) + i;
                    var realy = (y * N) + j;
                    var srcidx = 4 * (realy * srcImg.width + realx);

                    dest[destidx + 0] += src[srcidx + 0] / area;
                    dest[destidx + 1] += src[srcidx + 1] / area;
                    dest[destidx + 2] += src[srcidx + 2] / area;
                    dest[destidx + 3] += src[srcidx + 3] / area;
                }
            }
        }
    }

    return destImg;
}

function usampling(srcImg, N) {
    var w = srcImg.width * N;
    var h = srcImg.height * N;

    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    canvas.width = w;
    canvas.height = h;

    var destImg = context.getImageData(0, 0, w, h);
    var src = srcImg.data;
    var dest = destImg.data;

    for (var y = 0; y < h; ++y) {
        for (var x = 0; x < w; ++x) {
            var realx = Math.floor(x / N);
            var realy = Math.floor(y / N);
            var srcidx = 4 * (realy * srcImg.width + realx);
            var destidx = 4 * (y * w + x);

            dest[destidx + 0] += src[srcidx + 0];
            dest[destidx + 1] += src[srcidx + 1];
            dest[destidx + 2] += src[srcidx + 2];
            dest[destidx + 3] += src[srcidx + 3];
        }
    }

    return destImg;
}
