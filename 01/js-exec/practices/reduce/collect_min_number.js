'use strict';

function collect_min_number(collection) {
  //在这里写入代码
  return collection.reduce(function (a, b) {
    return a < b ? a : b;
  });
}

module.exports = collect_min_number;

