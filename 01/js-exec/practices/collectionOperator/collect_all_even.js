"use strict";

function collect_all_even(collection) {
  //在这里写入代码
  return collection.filter(function (item) {
    return item % 2 === 0;
  });
}

module.exports = collect_all_even;
