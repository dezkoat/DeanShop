function blend(imgData1, imgData2, value) {
    var data1 = imgData1.data;
    var data2 = imgData2.data;

    var w = Math.max(imgData1.width, imgData2.width);
    var h = Math.max(imgData1.height, imgData2.height);

    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    canvas.width = w;
    canvas.height = h;
    var destImg = context.getImageData(0, 0, w, h);
    var dest = destImg.data;

    for (var y = 0; y < h; ++y) {
        for (var x = 0; x < w; ++x) {
            var idx = 4 * (y * w + x);
            if (y < imgData1.height && x < imgData1.width) {
                var idxsrc = 4 * (y * imgData1.width + x);
                dest[idx + 0] += data1[idxsrc + 0] * (1.0 - value);
                dest[idx + 1] += data1[idxsrc + 1] * (1.0 - value);
                dest[idx + 2] += data1[idxsrc + 2] * (1.0 - value);
                dest[idx + 3] += data1[idxsrc + 3] * (1.0 - value);
            }
            if (y < imgData2.height && x < imgData2.width) {
                var idxsrc = 4 * (y * imgData2.width + x);
                dest[idx + 0] += data2[idxsrc + 0] * value;
                dest[idx + 1] += data2[idxsrc + 1] * value;
                dest[idx + 2] += data2[idxsrc + 2] * value;
                dest[idx + 3] += data2[idxsrc + 3] * value;
            }
        }
    }

    return destImg;
}
