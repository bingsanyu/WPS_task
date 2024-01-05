"use strict";

let collect_same_elements = require("../../practices/section_1/practice_3/practice.js");

describe("practice-1-3", function () {
  let collection_a = ["a", "e", "h", "t", "f", "c", "g", "b", "d"];
  let collection_b = { value: ["a", "d", "e", "f"] };

  it("选出A集合中跟B对象中value属性中的元素相同的元素", function () {
    let result = collect_same_elements(collection_a, collection_b);

    expect(result).toEqual(["a", "e", "f", "d"]);
  });
});
