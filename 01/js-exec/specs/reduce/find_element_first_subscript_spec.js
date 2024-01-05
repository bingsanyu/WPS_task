"use strict";

let find_element_first_subscript = require("../../practices/reduce/find_element_first_subscript.js");

describe("find_element_first_subscript", function () {
  let collection = [1, 11, 27, 20, 4, 9, 15, 4, 1, 11];
  let element = 4;

  it("找出某元素在给定集合中的第一个下标", function () {
    let result = find_element_first_subscript(collection, element);

    expect(result).toEqual(4);
  });
});
