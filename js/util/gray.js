function rgb2gray(imgData) {
    var data = imgData.data;
    for (var y = 0; y < imgData.height; ++y) {
        for (var x = 0; x < imgData.width; ++x) {
            var idx = (y * imgData.width + x) * 4;
            var gray = data[idx + 0] * 0.2989 + data[idx + 1] * 0.5870 + data[idx + 2] * 0.1140;
            data[idx + 0] = gray;
            data[idx + 1] = gray;
            data[idx + 2] = gray;
            data[idx + 3] = data[idx + 3];
        }
    }

    return imgData;
}
