'use strict';

function spilt_to_zero(number, interval) {
  //在这里写入代码
  let result = [];
  let i = 0;
  while (number > 0) {
    result[i] = number;
    number = parseFloat((number - interval).toFixed(1));
    i++;
  }
  result[i] = number;
  return result;
}

module.exports = spilt_to_zero;
