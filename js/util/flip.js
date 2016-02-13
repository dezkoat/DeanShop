HORIZONTAL = [[-1, 0], [0, 1]];
VERTICAL = [[1, 0], [0, -1]];

function flip(imgData, type) {
    var w = imgData.width;
    var h = imgData.height;
    var xmid = w / 2;
    var ymid = h / 2;

    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    canvas.width = w;
    canvas.height = h;

    var destImg = context.getImageData(0, 0, w, h);
    var dest = destImg.data;
    var src = imgData.data;

    for (var y = 0; y < h; ++y) {
        for (var x = 0; x < w; ++x) {
            var xn = (x - xmid) * type[0][0] + (y - ymid) * type[1][0] + xmid;
            var yn = (x - xmid) * type[0][1] + (y - ymid) * type[1][1] + ymid;
            var srcidx = 4 * (y * w + x);
            var destidx = 4 * (yn * w + xn);

            dest[destidx + 0] = src[srcidx + 0];
            dest[destidx + 1] = src[srcidx + 1];
            dest[destidx + 2] = src[srcidx + 2];
            dest[destidx + 3] = src[srcidx + 3];
        }
    }

    return destImg;
}
