'use strict';

function average_to_letter(collection) {
    //在这里写入代码
    return String.fromCharCode(Math.ceil(collection.reduce(function (a, b) {
      return a + b;
    }) / collection.length) + 96);
}

module.exports = average_to_letter;

