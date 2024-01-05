"use strict";

let hybrid_operation_to_uneven = require("../../../practices/superposition_operation/collection_operation/practice_2.js");

describe("hybrid_operation_to_uneven", function () {
  let collection = [1, 5, 7, 12, 11, 35, 54, 67, 70];

  it("每一个奇数*3+2", function () {
    let result = hybrid_operation_to_uneven(collection);

    expect(result).toEqual([5, 17, 23, 35, 107, 203]);
  });
});
