'use strict';

function even_to_letter(collection) {
    //在这里写入代码
    return collection.filter(function (item) {
      return item % 2 === 0;
    }).map(function (item) {
      return String.fromCharCode(96 + item);
    });
}

module.exports = even_to_letter;
