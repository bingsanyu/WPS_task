function collect_same_elements(collection_a, object_b) {
  //在这里写入代码
  result = collection_a.filter(item => object_b.value.includes(item.key)).map(item => item.key);
  return result;
}

module.exports = collect_same_elements;
