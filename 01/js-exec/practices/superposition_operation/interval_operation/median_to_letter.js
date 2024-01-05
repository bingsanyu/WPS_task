'use strict';

function median_to_letter(collection) {
    //在这里写入代码
    let median = Math.ceil(collection.reduce(function (a, b) {
      return a + b;
    }) / collection.length);
    let letter = '';
    if (median <= 26) {
      letter = String.fromCharCode(96 + median);
    } else {
      letter = String.fromCharCode(96 + Math.floor(median / 26)) + String.fromCharCode(96 + median % 26);
    }
    return letter;
}

module.exports = median_to_letter;
