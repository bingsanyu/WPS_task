'use strict';
let number_map_to_word_over_26 = function(collection){
  return collection.map(num => {
    let remainder = num % 26;
    let quotient = Math.floor(num / 26);
    return (quotient > 0 ? String.fromCharCode(quotient + 96) : '') + String.fromCharCode(remainder + 96);
  });
};

module.exports = number_map_to_word_over_26;
