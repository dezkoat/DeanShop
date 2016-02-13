function sampling(imgData, step) {
    var data = imgData.data;
    for (var y = 0; y < imgData.height; y += step) {
        for (var x = 0; x < imgData.width; x += step) {
            var sum = [0, 0, 0];
            for (var y2 = 0; y2 < step; ++y2) {
                for (var x2 = 0; x2 < step; ++x2) {
                    var idx = 4 * (Math.min(imgData.height - 1, y + y2) * imgData.width
                                + Math.min(imgData.width - 1, x + x2));

                    sum[0] += data[idx + 0];
                    sum[1] += data[idx + 1];
                    sum[2] += data[idx + 2];
                }
            }

            var stepsq = step * step;
            sum = [sum[0] / stepsq, sum[1] / stepsq, sum[2] / stepsq];

            for (var y2 = 0; y2 < step; ++y2) {
                for (var x2 = 0; x2 < step; ++x2) {
                    var idx = 4 * (Math.min(imgData.height - 1, y + y2) * imgData.width
                                + Math.min(imgData.width - 1, x + x2));

                    data[idx + 0] = sum[0];
                    data[idx + 1] = sum[1];
                    data[idx + 2] = sum[2];
                }
            }
        }
    }

    return imgData;
}
