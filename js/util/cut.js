var mem = null;
function cut(imgData, x1, y1, x2, y2) {
    var data = imgData.data;
    mem = {};
    mem.width = x2 - x1;
    mem.height = y2 - y1;
    var save = [];

    for (var y = y1; y < y2; ++y) {
        for (var x = x1; x < x2; ++x) {
            var idx = (y * imgData.width + x) * 4;
            save.push([data[idx + 0], data[idx + 1], data[idx + 2]]);
            data[idx + 3] = 0;
        }
    }

    mem.data = save;

    return imgData;
}

function paste(imgData, x, y) {
    if (mem == null)
        return;

        console.log(mem);
    var data = imgData.data;
    var w = Math.min(imgData.width - x, mem.width);
    var h = Math.min(imgData.height - y, mem.height);
    for (var i = 0; i < h; ++i) {
        for (var j = 0; j < w; ++j) {
            var destidx = 4 * ((i + y) * imgData.width + (j + x));
            var srcidx = i * mem.width + j;
            data[destidx + 0] = mem.data[srcidx][0];
            data[destidx + 1] = mem.data[srcidx][1];
            data[destidx + 2] = mem.data[srcidx][2];
            data[destidx + 3] = 255;
        }
    }

    return imgData;
}
