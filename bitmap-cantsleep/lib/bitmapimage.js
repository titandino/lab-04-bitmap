'use strict';

const fs = require('fs');
const os = require('os');

function BitmapImage() {
  this.loaded = false;
}

BitmapImage.prototype.load = function(file, onLoad) {
  this.file = file;
  fs.readFile(file, (err, data) => {
    if (err) throw err;
    let LE = os.endianness() === 'LE';
    this.type = (String.fromCharCode(data[0]) + String.fromCharCode(data[1]));
    this.size = LE ? data.readUInt32LE(2) : data.readUInt32BE(2);
    this.dataOffset = LE ? data.readUInt32LE(10) : data.readUInt32BE(10);
    console.log('Image loaded: ' + this.type + ', ' + this.size + ', ' + this.dataOffset);
    this.loaded = true;
    onLoad(this);
  });
};

module.exports = BitmapImage;
