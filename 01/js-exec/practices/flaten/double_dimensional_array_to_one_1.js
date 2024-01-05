'use strict';

function double_to_one(collection) {

  //在这里写入代码
  let result = [];
  collection.forEach(function (item) {
    if (typeof item === 'number') {
      result.push(item);
    } else {
      item.forEach(function (item) {
        result.push(item);
      });
    }
  });
  return result;
}

module.exports = double_to_one;
