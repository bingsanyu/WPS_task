'use strict';

function compute_chain_median(collection) {
  //在这里写入代码
  let arr = collection.split('->').map(function (item) {
    return parseInt(item);
  }).sort(function (a, b) {
    return a - b;
  });
  let len = arr.length;
  if (len % 2 === 0) {
    return (arr[len / 2 - 1] + arr[len / 2]) / 2;
  } else {
    return arr[(len - 1) / 2];
  }
}

module.exports = compute_chain_median;
