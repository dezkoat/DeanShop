function masking(imgData1, imgData2) {
    var data1 = imgData1.data;
    var data2 = imgData2.data;

    var w = Math.min(imgData1.width, imgData2.width);
    var h = Math.min(imgData1.height, imgData2.height);

    for (var y = 0; y < h; ++y) {
        for (var x = 0; x < w; ++x) {
            var idx1 = 4 * (y * imgData1.width + x);
            var idx2 = 4 * (y * imgData2.width + x);
            var gray = data2[idx2 + 0] * 0.2989
                     + data2[idx2 + 1] * 0.5870
                     + data2[idx2 + 2] * 0.1140;
            data1[idx1 + 3] = 255 - gray;
        }
    }

    return imgData1;
}
