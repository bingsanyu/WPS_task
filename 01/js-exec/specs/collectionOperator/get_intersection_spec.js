"use strict";

let get_intersection = require("../../practices/collectionOperator/get_intersection.js");

describe("get_intersection", function () {
  let collection_a = [10, 27, 28, 19, 5];
  let collection_b = [5, 78, 28, 19, 23];
  let collection_c = [5, 28, 19];

  it("弹出两个集合的交集", function () {
    let result = get_intersection(collection_a, collection_b);
    expect(result).toEqual(collection_c);
  });
});
