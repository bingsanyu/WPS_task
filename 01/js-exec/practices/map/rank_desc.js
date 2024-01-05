'use strict';
let rank_desc = function(collection){
  return collection.sort((a, b) => a - b);
};

module.exports = rank_desc;
