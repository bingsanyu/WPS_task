'use strict';

function choose_no_repeat_number(collection) {

  //在这里写入代码
  return collection.filter(function (item, index, self) {
    return self.indexOf(item) === index;
  });
}

module.exports = choose_no_repeat_number;
