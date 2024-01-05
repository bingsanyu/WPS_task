'use strict';
let calculate_average = function(collection){
  //在这里写入代码
  let evenSubscript = collection.filter(function (item, index) {
      return index % 2 !== 0;
  });
  return evenSubscript.reduce(function (prev, curr) {
      return prev + curr;
  }) / evenSubscript.length;
};
module.exports = calculate_average;
