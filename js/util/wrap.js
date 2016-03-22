function wrap(imgData) {
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
            var idx = 4 * (y * w + x);
            var coord = wrapping(x, y, xmid, ymid);
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

function wrapping(x, y, xmid, ymid) {
    var ro = vectorLen(vectorDiff([x, y], [xmid, ymid]));
    var th = Math.PI * ro * 0.005;

    var xn = (x - xmid) * Math.cos(th) - (y - ymid) * Math.sin(th) + xmid;
    var yn = (y - ymid) * Math.cos(th) + (x - xmid) * Math.sin(th) + ymid;
    return [ xn, yn ];
}
