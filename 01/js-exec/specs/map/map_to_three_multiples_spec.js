"use strict";
let map_to_three_multiples = require("../../practices/map/map_to_three_multiples.js");

describe("map to three multiples", function () {
  let collection_a = [1, 3, 5, 4, 9];
  let collection_b = [3, 9, 15, 12, 27];

  it("三倍映射", function () {
    let result = map_to_three_multiples(collection_a);
    expect(result).toEqual(collection_b);
  });
});
