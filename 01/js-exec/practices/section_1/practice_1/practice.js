function collect_same_elements(collection_a, collection_b) {
  //在这里写入代码
  let result = collection_a.filter(item => collection_b.includes(item));
  return result;
}

module.exports = collect_same_elements;
