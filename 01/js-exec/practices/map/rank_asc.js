'use strict';
let rank_asc = function(collection){
  return collection.sort((a, b) => b - a);
};

module.exports = rank_asc;
