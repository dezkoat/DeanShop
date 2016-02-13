EDGE1 = [[1, 0, -1], [0, 0, 0], [-1, 0, 1]];
EDGE2 = [[0, 1, 0], [1, -4, 1], [0, 1, 0]];
EDGE3 = [[-1, -1, -1], [-1, 8, -1], [-1, -1, -1]];
SHARPEN = [[0, -1, 0], [-1, 5, -1], [0, -1, 0]];
BLUR = [[1/9, 1/9, 1/9], [1/9, 1/9, 1/9], [1/9, 1/9, 1/9]];
GAUSSBLUR = [[1/16, 2/16, 1/16], [2/16, 4/16, 2/16], [1/16, 2/16, 1/16]];
MINIBLUR = [[2/81,4/81,2/81], [4/81,57/81,4/81],[2/81,4/81,2/81]];

function kernel(imgData, kernel) {
    var w = imgData.width;
    var h = imgData.height;

    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    canvas.width = w;
    canvas.height = h;

    var destImg = context.getImageData(0, 0, w, h);
    var dest = destImg.data;
    var src = imgData.data;

    for (var y = 1; y < h - 1; ++y) {
        for (var x = 1; x < w - 1; ++x) {
            var destidx = 4 * (y * w + x);
            var sum = [0, 0, 0, 255];
            for (var i = 0; i < 3; ++i) {
                for (var j = 0; j < 3; ++j) {
                    var idx = 4 * ((y + i - 1) * w + (x + j - 1));
                    sum[0] += src[idx + 0] * kernel[i][j];
                    sum[1] += src[idx + 1] * kernel[i][j];
                    sum[2] += src[idx + 2] * kernel[i][j];
                    // sum[3] += src[idx + 3] * kernel[i][j];
                }
            }

            dest[destidx + 0] = sum[0];
            dest[destidx + 1] = sum[1];
            dest[destidx + 2] = sum[2];
            dest[destidx + 3] = sum[3];
        }
    }

    return destImg;
}
