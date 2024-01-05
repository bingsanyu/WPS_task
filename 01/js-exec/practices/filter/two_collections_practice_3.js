'use strict';

function choose_divisible_integer(collection_a, collection_b) {

  //在这里写入代码
  return collection_a.filter(function (item) {
    return collection_b.some(function (element) {
      return item % element === 0;
    });
  });
}

module.exports = choose_divisible_integer;
