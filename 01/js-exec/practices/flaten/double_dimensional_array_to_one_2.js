'use strict';

function double_to_one(collection) {

  //在这里写入代码
  return collection.reduce((result, arr) => {
    return result.concat(arr.filter(item => !result.includes(item)));
  }, []);
}

module.exports = double_to_one;
