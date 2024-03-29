"use strict";

let find_last_even = require("../../practices/reduce/find_last_even.js");

describe("find_last_even", function () {
  let collection = [1, 11, 27, 20, 4, 9, 15];

  it("找出给定集合元素的最后一个偶数", function () {
    let result = find_last_even(collection);

    expect(result).toEqual(4);
  });
});
