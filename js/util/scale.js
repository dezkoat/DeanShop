function scale(imgData, sx, sy) {
    var w = imgData.width;
    var h = imgData.height;
    var xmid = w / 2;
    var ymid = h / 2;

    var w2 = Math.floor(w * sx);
    var h2 = Math.floor(h * sy);
    var offx = Math.floor((w2 - w) / 2);
    var offy = Math.floor((h2 - h) / 2);

    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    canvas.width = w2;
    canvas.height = h2;

    var destImg = context.getImageData(0, 0, w2, h2);
    var dest = destImg.data;
    var src = imgData.data;

    for (var y = 0; y < h2; ++y) {
        for (var x = 0; x < w2; ++x) {
            var idx = 4 * (y * w2 + x);
            var coord = scaleCoord(x, y, xmid, ymid, sx, sy);
            var xn = coord[0];
            var yn = coord[1];
            if (xn < 0 || xn >= w || yn < 0 || yn >= h)
                continue;

            var x1 = Math.floor(xn);
            var y1 = Math.floor(yn);
            var x2 = Math.floor(xn) + 1;
            var y2 = Math.floor(yn) + 1;

            var idxs = [ 4 * (y1 * w + x1),
                         4 * (y1 * w + x2),
                         4 * (y2 * w + x1),
                         4 * (y2 * w + x2) ];

            var dx = xn - x1;
            var dy = yn - y1;
            for (var i = 0; i < 4; ++i) {
                var rgb = [ src[idxs[0] + i], src[idxs[1] + i],
                            src[idxs[2] + i], src[idxs[3] + i] ];
                dest[idx + i] = bilinearInterpolate(src, rgb, dx, dy);
            }
        }
    }


    return destImg;
}

function scaleCoord(x, y, xmid, ymid, sx, sy) {
    var xn = x / sx;
    var yn = y / sy;
    return [ xn, yn ];
}
