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
