'use strict';
let calculate_median = function(collection){
  //在这里写入代码
  return collection.filter(function (a, index) {
      return index % 2 !== 0;
  }).reduce(function (a, b) {
      return a + b;
  }) / collection.filter(function (a, index) {
      return index % 2 !== 0;
  }).length;
};
module.exports = calculate_median;
