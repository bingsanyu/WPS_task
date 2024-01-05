'use strict';

function amount_even(collection) {
  //在这里写入代码
  return collection.filter(function (item) {
    return item % 2 === 0;
  }).reduce(function (prev, curr) {
    return prev + curr;
  });
}

module.exports = amount_even;
