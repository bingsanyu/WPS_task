'use strict';

function calculate_elements_sum(collection) {
  //在这里写入代码
  return collection.reduce(function (acc, cur) {
    return acc + cur;
  });
}

module.exports = calculate_elements_sum;

