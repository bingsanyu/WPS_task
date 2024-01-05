function collect_same_elements(collection_a, collection_b) {
  //在这里写入代码
  let flat_collection_b = [].concat(...collection_b);
  let result = collection_a.filter(item => flat_collection_b.includes(item));
  return result;
}

module.exports = collect_same_elements;
