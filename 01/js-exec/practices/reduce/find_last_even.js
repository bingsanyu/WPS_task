'use strict';

function find_last_even(collection) {
  //在这里写入代码
  return collection.reverse().find(function (item) {
    return item % 2 === 0;
  });
}

module.exports = find_last_even;
