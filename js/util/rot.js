function rot(imgData, d) {
    d = -Math.PI * d / 180;
    var w = imgData.width;
    var h = imgData.height;
    var xmid = w / 2;
    var ymid = h / 2;
    var topright = rotateCoord(w, 0, xmid, ymid, d);
    var topleft = rotateCoord(0, 0, xmid, ymid, d);
    var bottomright = rotateCoord(w, h, xmid, ymid, d);
    var bottomleft = rotateCoord(0, h, xmid, ymid, d);

    var ymin = Math.min(Math.min(topright[1], topleft[1]),
                        Math.min(bottomright[1], bottomleft[1]));
    var ymax = Math.max(Math.max(topright[1], topleft[1]),
                        Math.max(bottomright[1], bottomleft[1]));
    var xmin = Math.min(Math.min(topright[0], topleft[0]),
                        Math.min(bottomright[0], bottomleft[0]));
    var xmax = Math.max(Math.max(topright[0], topleft[0]),
                        Math.max(bottomright[0], bottomleft[0]));

    var offx = Math.floor(-xmin);
    var offy = Math.floor(-ymin);
    var w2 = Math.ceil(xmax - xmin);
    var h2 = Math.ceil(ymax - ymin);

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
            var coord = rotateCoord(x - offx, y - offy, xmid, ymid, d);
            var xn = coord[0];
            var yn = coord[1];
            if (xn < 0 || xn >= w || yn < 0 || yn >= h)
                continue;

            var x1 = Math.floor(xn);
            var x2 = Math.floor(xn) + 1;
            var y1 = Math.floor(yn);
            var y2 = Math.floor(yn) + 1;

            var idxs = [ 4 * (y1 * w + x1),
                         4 * (y1 * w + x2),
                         4 * (y2 * w + x1),
                         4 * (y2 * w + x2) ];

            var dists = [ Math.max(0, 1 - euclidDist(xn, yn, x1, y1)),
                          Math.max(0, 1 - euclidDist(xn, yn, x2, y1)),
                          Math.max(0, 1 - euclidDist(xn, yn, x1, y2)),
                          Math.max(0, 1 - euclidDist(xn, yn, x2, y2)) ];

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

function rotateCoord(x, y, xmid, ymid, d) {
    var xn = (x - xmid) * Math.cos(d) - (y - ymid) * Math.sin(d) + xmid;
    var yn = (y - ymid) * Math.cos(d) + (x - xmid) * Math.sin(d) + ymid;
    return [ xn, yn ];
}

function euclidDist(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}
