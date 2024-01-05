'use strict';
let even_group_calculate_average = function(collection){
  let evenIndexElements = collection.filter((_, index) => index % 2 !== 0);
  let evenNumbers = evenIndexElements.filter(num => num % 2 === 0);
  if (evenNumbers.length === 0) {
      return [0];
  }
  let grouped = evenNumbers.reduce((acc, num) => {
      let digits = num.toString().length;
      if (!acc[digits]) {
          acc[digits] = [];
      }
      acc[digits].push(num);
      return acc;
  }, {});
  let result = [];
  for (let key in grouped) {
      let group = grouped[key];
      let average = group.reduce((sum, num) => sum + num, 0) / group.length;
      result.push(average);
  }
  return result.length === 0 ? [0] : result;
}
module.exports = even_group_calculate_average;
