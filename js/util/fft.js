var isFFT = false;
var real = null;
var imag = null;

function imfft(imgData) {
    isFFT = true;

    var data = imgData.data;
    var w = imgData.width;
    var h = imgData.height;

    real = new Array(w * h);
    imag = new Array(w * h);

    for (var i = 0; i < w * h; ++i)
        real[i] = data[i * 4];

    var row = new complex_array.ComplexArray(w);
    for (var i = 0; i < h; ++i) {
        row.map(function(value, j, n) {
            value.real = real[i * w + j];
            value.imag = 0.0;
        });

        row.FFT();

        row.map(function(value, j, n) {
            var index = i * w + ((j + Math.floor(w / 2)) % w);
            real[index] = value.real;
            imag[index] = value.imag;
        });
    }

    var col = new complex_array.ComplexArray(h);
    for (var i = 0; i < w; ++i) {
        col.map(function(value, j, n) {
            value.real = real[j * w + i];
            value.imag = imag[j * w + i];
        });

        col.FFT();

        col.map(function(value, j, n) {
            var index = ((j + Math.floor(h / 2)) % h) * w + i;
            real[index] = value.real;
            imag[index] = value.imag;
        });
    }

    for (var i = 0; i < w * h; ++i) {
        var val = Math.sqrt(real[i] * real[i] + imag[i] * imag[i]);
        data[i * 4 + 0] = val;
        data[i * 4 + 1] = val;
        data[i * 4 + 2] = val;
        data[i * 4 + 3] = 255;
    }

    return imgData;
}

function imifft(imgData) {
    isFFT = false;

    var data = imgData.data;
    var w = imgData.width;
    var h = imgData.height;

    var col = new complex_array.ComplexArray(h);
    for (var i = 0; i < w; ++i) {
        col.map(function(value, j, n) {
            value.real = real[j * w + i];
            value.imag = imag[j * w + i];
        });

        col.InvFFT();

        col.map(function(value, j, n) {
            real[j * w + i] = value.real;
            imag[j * w + i] = value.imag;
        });
    }

    var row = new complex_array.ComplexArray(w);
    for (var i = 0; i < h; ++i) {
        row.map(function(value, j, n) {
            value.real = real[i * w + j];
            value.imag = imag[i * w + j];
        });

        row.InvFFT();

        row.map(function(value, j, n) {
            real[i * w + j] = value.real;
            imag[i * w + j] = value.imag;
        });
    }

    for (var i = 0; i < w * h; ++i) {
        var val = Math.sqrt(real[i] * real[i] + imag[i] * imag[i]);
        data[i * 4 + 0] = val;
        data[i * 4 + 1] = val;
        data[i * 4 + 2] = val;
        data[i * 4 + 3] = 255;
    }

    return imgData;
}