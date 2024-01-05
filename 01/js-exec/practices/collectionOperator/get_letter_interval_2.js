'use strict';

function get_letter_interval_2(number_a, number_b) {
  //在这里写入代码
  function toLetters(num) {
    let result = '';
    while (num > 0) {
      let mod = (num - 1) % 26;
      result = String.fromCharCode(97 + mod) + result;
      num = Math.floor((num - mod) / 26);
    }
    return result;
  }

  let result = [];
  if (number_a <= number_b) {
    for (let i = number_a; i <= number_b; i++) {
      result.push(toLetters(i));
    }
  } else {
    for (let i = number_a; i >= number_b; i--) {
      result.push(toLetters(i));
    }
  }
  return result;
}

module.exports = get_letter_interval_2;

