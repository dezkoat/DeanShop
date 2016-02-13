function quantize(imgData, N) {
    var result = [];
    var data = imgData.data;
    var color = [];
    for (var i = 0; i < data.length; i += 4)
        color.push([data[i + 0], data[i + 1], data[i + 2], i]);

    var queue = [[0, color]];

    var maxIter = 4096; // To prevent infinity looping
    var iter = 0;
    while (queue.length != 0) {
        var area = queue.shift();
        var idx = area[0];
        var arr = area[1];
        arr.sort(function(a, b) {
            if (a[idx] < b[idx])
                return 1;
            if (a[idx] > b[idx])
                return -1;
            return 0;
        });

        var medianValue = arr[Math.floor(arr.length / 2)][idx];
        var medianIndex = 0;
        while (medianIndex < arr.length && arr[medianIndex][idx] != medianValue)
            ++medianIndex;

        if (medianIndex == 0) {
            while (medianIndex < arr.length && arr[medianIndex][idx] == medianValue)
                ++medianIndex;
            --medianIndex;
        }

        if (medianIndex == (arr.length - 1)) {
            queue.push([
                (idx + 1) % 3,
                arr
            ]);
        } else {
            queue.push([
                (idx + 1) % 3,
                arr.slice(0, medianIndex)
            ]);

            queue.push([
                (idx + 1) % 3,
                arr.slice(medianIndex + 1)
            ]);
        }

        if (queue.length == N)
            break;

        queue.push();

        if (++iter > maxIter)
            break;
    }

    for (var i in queue) {
        var rgb = { r: 0, g: 0, b: 0 };
        for (var j in queue[i][1]) {
            rgb.r += queue[i][1][j][0];
            rgb.g += queue[i][1][j][1];
            rgb.b += queue[i][1][j][2];
        }

        rgb.r /= queue[i][1].length;
        rgb.g /= queue[i][1].length;
        rgb.b /= queue[i][1].length;

        for (var j in queue[i][1]) {
            data[queue[i][1][j][3] + 0] = rgb.r;
            data[queue[i][1][j][3] + 1] = rgb.g;
            data[queue[i][1][j][3] + 2] = rgb.b;
        }
    }

    return imgData;
}
