'use strict';

function compare_collections(collection_a, collection_b) {
  //在这里写入代码
  return collection_a.reduce(function (a, b) {
    return a + b;
  }) === collection_b.reduce(function (a, b) {
    return a + b;
  });
}

module.exports = compare_collections;


