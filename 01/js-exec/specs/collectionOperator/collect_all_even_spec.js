"use strict";

let collect_all_even = require("../../practices/collectionOperator/collect_all_even.js");

describe("collect_all_even", function () {
  let collection_a = [1, 2, 3, 4, 5];
  let collection_b = [2, 4];

  it("选出给定区间中所有的偶数", function () {
    let result = collect_all_even(collection_a);
    expect(result).toEqual(collection_b);
  });
});
