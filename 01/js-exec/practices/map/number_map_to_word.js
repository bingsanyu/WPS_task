'use strict';
let number_map_to_word = function(collection){
  return collection.map(num => String.fromCharCode(num + 96));
};

module.exports = number_map_to_word;
