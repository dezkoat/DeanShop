function histeq(imgData) {
    var data = imgData.data;
    var npix = imgData.width * imgData.height;

    var hist = [];
    for (var i = 0; i < 256; ++i) 
        hist[i] = [ 0, 0, 0 ];


    for (var i = 0; i < data.length; i += 4) {
        ++hist[data[i + 0]][0];
        ++hist[data[i + 1]][1];
        ++hist[data[i + 2]][2];
    }

    for (var i = 1; i < 256; ++i) {
        hist[i][0] += hist[i - 1][0];
        hist[i][1] += hist[i - 1][1];
        hist[i][2] += hist[i - 1][2];
    }

    for (var i = 0; i < data.length; i += 4) {
        data[i + 0] = 255.0 * hist[data[i + 0]][0] / npix;
        data[i + 1] = 255.0 * hist[data[i + 1]][1] / npix;
        data[i + 2] = 255.0 * hist[data[i + 2]][2] / npix;
    }

    return imgData;
}

// Histgram on v plane (HSV)
function histeq2(imgData) {
    var data = imgData.data;
    var npix = imgData.width * imgData.height;

    var hsv  = [];
    for (var i = 0; i < npix; ++i)
        hsv[i] = rgb2hsv(data[i * 4 + 0], data[i * 4 + 1], data[i * 4 + 2]);

    var hist = [];
    for (var i = 0; i < 256; ++i) 
        hist[i] = 0;

    for (var i = 0; i < npix; ++i)
        ++hist[hsv[i][2]]

    for (var i = 1; i < 256; ++i)
        hist[i] += hist[i - 1];

    for (var i = 0; i < npix; ++i)
        hsv[i][2] = hist[hsv[i][2]] * 255.0 / npix;

    for (var i = 0; i < npix; ++i) {
        rgb = hsv2rgb(hsv[i][0], hsv[i][1], hsv[i][2])
        data[i * 4 + 0] = rgb[0];
        data[i * 4 + 1] = rgb[1];
        data[i * 4 + 2] = rgb[2];
    }

    return imgData;
}