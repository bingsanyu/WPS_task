"use strict";

let double_to_one = require("../../practices/flaten/double_dimensional_array_to_one_1.js");

describe("double_to_one", function () {
  let collection = [1, [2], [3, 4]];

  it("把二维数组变成一维数组", function () {
    let result = double_to_one(collection);

    expect(result).toEqual([1, 2, 3, 4]);
  });
});
