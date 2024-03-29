"use strict";

let find_first_even = require("../../practices/reduce/find_first_even.js");

describe("find_first_even", function () {
  let collection = [1, 11, 27, 20, 4, 9, 15];

  it("找出给定集合元素的第一个偶数", function () {
    let result = find_first_even(collection);

    expect(result).toEqual(20);
  });
});
