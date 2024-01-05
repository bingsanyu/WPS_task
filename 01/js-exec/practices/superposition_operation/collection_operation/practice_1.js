'use strict';

function hybrid_operation(collection) {
  //在这里写入代码
  return collection.map(function (item) {
    return item * 3 + 2;
  }).reduce(function (a, b) {
    return a + b;
  });
}

module.exports = hybrid_operation;

