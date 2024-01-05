'use strict';

function average_uneven(collection) {
  //在这里写入代码
  return collection.filter(function (a) {
    return a % 2 !== 0;
  }).reduce(function (a, b) {
    return a + b;
  }) / collection.filter(function (a) {
    return a % 2 !== 0;
  }).length;
}

module.exports = average_uneven;
