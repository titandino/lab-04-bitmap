'use strict';

const fs = require('fs');

function BitmapImage() {
  this.loaded = false;
}

BitmapImage.prototype.load = function(file, onLoad) {
  this.file = file;
  fs.readFile(file, (err, data) => {
    if (err) throw err;
    this.type = (String.fromCharCode(data[0]) + String.fromCharCode(data[1]));
    if (this.type != 'BM') {
      throw new Error('Invalid bitmap type.');
    }
    this.size = data.readUInt32LE(2);
    this.dataOffset = data.readUInt32LE(10);
    this.width = data.readUInt32LE(18);
    this.height = data.readUInt32LE(22);
    this.bpp = data.readUInt32LE(28);
    this.data = data;
    this.loaded = true;
    onLoad(this);
  });
};

module.exports = BitmapImage;
