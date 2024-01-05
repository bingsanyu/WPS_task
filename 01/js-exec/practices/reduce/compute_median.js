'use strict';

function compute_median(collection) {
  //在这里写入代码
  collection.sort((a, b) => a - b);
  let median;
  if (collection.length % 2 === 0) {
      let midIndex = collection.length / 2;
      median = (collection[midIndex - 1] + collection[midIndex]) / 2;
  } else {
      median = collection[Math.floor(collection.length / 2)];
  }
  return median;
}

module.exports = compute_median;


