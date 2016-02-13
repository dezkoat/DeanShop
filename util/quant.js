function multithresh(imgData, N) {
    var data = imgData.data;
    var pdf = getpdf(data, 256);
    var mu = new Array(256).fill(0);
    for (var i = 1; i < 256; ++i) {
        mu[i] = pdf.p[i] * (i + 1);
        pdf.p[i] += pdf.p[i - 1];
    }

    mu[0] = pdf.p[0];
    for (var i = 1; i < 256; ++i)
        mu[i] += mu[i - 1];

    var mu_t = mu[255];
}

function getpdf(data, numbins) {
    var minA = numbins;
    var maxA = 0;

    for (var i = 0; i < data.length; ++i) {
        if (i % 4 == 3) // skip alpha channel
            continue;

        if (data[i] > maxA)
            maxA = data[i];
        if (data[i] < minA)
            minA = data[i];
    }

    var imhist = new Array(numbins).fill(0);
    var total = 0;
    for (var i = 0; i < data.length; ++i) {
        if (i % 4 == 3) // skip alpha channel
            continue;

        var x;
        x = (data[i] - minA) / (maxA - minA);
        x = Math.floor(255.0 * x);
        x = Math.max(0, Math.min(255, x));
        data[i] = x;

        ++imhist[x];
        ++total;
    }

    for (var i = 0; i < numbins; ++i)
        imhist[i] = imhist[i] / total;

    return { p: imhist, minA: minA, maxA: maxA };
}
