function start(f) {
    document.addEventListener("DOMContentLoaded", f, false);
}

function matMult(m1, m2) {
    var newMat = [];
    for (var i = 0; i < m1.length; ++i) {
        newMat.push([]);
        for (var j = 0; j < m2[0].length; ++j) {
            var total = 0;
            for (var k = 0; k < m1[0].length; ++k) {
                total += m1[i][k] * m2[k][j];
            }
            newMat[i].push(total);
        }
    }

    return newMat;
}

function dotProduct(v1, v2) {
    var sum = 0;
    for (var i = 0; i < v1.length; ++i)
        sum += v1[i] * v2[i];

    return sum;
}

function vectorLenSqr(v) {
    return dotProduct(v, v);
}

function vectorLen(v) {
    return Math.sqrt(vectorLenSqr(v));
}

function vectorDiff(v1, v2) {
    var v = [];
    for (var i = 0; i < v1.length; ++i)
        v.push(Math.abs(v1[i] - v2[i]));

    return v;
}

function bilinearInterpolate(src, rgb, dx, dy) {
    return rgb[0] * (1 - dx) * (1 - dy)
         + rgb[1] * (dx) * (1 - dy)
         + rgb[2] * (1 - dx) * (dy)
         + rgb[3] * (dx) * (dy);
}

function rgb2hsv(r, g, b) {
    var min, max, delta;
    min = r < g ? r : g;
    min = min < b ? min : b;

    max = r > g ? r : g;
    max = max > b ? max : b;

    var h, s, v;
    v = max;
    delta = max - min;
    if (delta < 0.00001)
        return [0, 0, v];
    if (max <= 0.0)
        return [NaN, 0, v];

    s = delta / max;
    if (r >= max)
        h = (g - b) / delta;
    else if (g >= max)
        h = 2.0 + (b - r) / delta;
    else
        h = 4.0 + (r - g) / delta;

    h *= 60;

    if (h < 0.0)
        h += 360.0;

    return [h, s, v];
}

function hsv2rgb(h, s, v) {
    var hh, p, q, t, ff;
    var i;
    var r, g, b;

    if (s <= 0.0)
        return [v, v, v];

    hh = h;
    if (hh >= 360.0)
        hh = 0.0;
    hh /= 60.0;
    i = Math.floor(hh);
    p = v * (1.0 - s);
    q = v * (1.0 - (s * ff));
    t = v * (1.0 - (s * (1.0 - ff)));

    switch (i) {
        case 0:
            r = v;
            g = t;
            b = p;
            break;
        case 1:
            r = q;
            g = v;
            b = p;
            break;
        case 2:
            r = p;
            g = v;
            b = t;
            break;
        case 3:
            r = p;
            g = q;
            b = v;
            break;
        case 4:
            r = t;
            g = p;
            b = v;
            break;
        case 5:
        default:
            r = v;
            g = p;
            b = q;
            break;
    }

    return [r, g, b];
}