"use strict";

let compute_elements_sum = require("../../practices/reduce/compute_sum.js");

describe("compute_elements_sum", function () {
  let collection = [1, 2, 3, 4, 5];

  it("计算给定集合元素的总和", function () {
    let result = compute_elements_sum(collection);

    expect(result).toEqual(15);
  });
});
