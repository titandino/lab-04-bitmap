'use strict';

const BMP = require('./lib/bitmapimage');

let bmp = new BMP();

bmp.load('bitmap.bmp', function() {
  bmp.createInvertedImage('inverted.bmp', function(err) {
    if (err) throw err;
    console.log('Done transforming and writing inverted image.');
  });
});
