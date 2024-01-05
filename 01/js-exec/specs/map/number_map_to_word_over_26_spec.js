"use strict";

let number_map_to_word_over_26 = require("../../practices/map/number_map_to_word_over_26.js");

describe("number_map_to_word_over_26", function () {
  let collection_a = [1, 13, 27, 30, 25, 27];
  let collection_b = ["a", "m", "aa", "ad", "y", "aa"];

  it("字母表映射2", function () {
    let result = number_map_to_word_over_26(collection_a);
    expect(result).toEqual(collection_b);
  });
});
