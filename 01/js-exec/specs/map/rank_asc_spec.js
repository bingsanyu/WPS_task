"use strict";
let rank_asc = require("../../practices/map/rank_asc.js");

describe("rank by asc", function () {
  let collection_a = [3, 2, 4, 5, 6];
  let collection_b = [6, 5, 4, 3, 2];

  it("从大到小排序", function () {
    let result = rank_asc(collection_a);
    expect(result).toEqual(collection_b);
  });
});
