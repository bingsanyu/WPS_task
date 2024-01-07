'use strict';
function one_add_next_multiply_three(collection){
  let result = [];
  for(let i = 0; i < collection.length - 1; i++){
    result.push((collection[i] + collection[i + 1]) * 3);
  }
  return result;
}
module.exports = one_add_next_multiply_three;
