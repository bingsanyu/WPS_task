'use strict';

function grouping_count(collection) {

  //在这里写入代码
  let result = {};
  collection.forEach(function (item) {
    if (result[item]) {
      result[item]++;
    } else {
      result[item] = 1;
    }
  });
  return result;
}

module.exports = grouping_count;
