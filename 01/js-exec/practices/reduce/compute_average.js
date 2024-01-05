'use strict';

function compute_average(collection) {
  //在这里写入代码
  return collection.reduce(function (a, b) {
    return a + b;
  }) / collection.length;
}

module.exports = compute_average;

