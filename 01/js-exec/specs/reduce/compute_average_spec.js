"use strict";
let compute_average = require("../../practices/reduce/compute_average.js");

describe("compute_average", function () {
  let collection = [1, 3, 5, 98, 67, 453];

  it("计算给定数字集合元素的平均值", function () {
    let result = compute_average(collection);
    expect(result).toEqual(104.5);
  });
});
