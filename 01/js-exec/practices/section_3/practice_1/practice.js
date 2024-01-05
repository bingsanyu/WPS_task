function create_updated_collection(collection_a, object_b) {
  //在这里写入代码
  collection_a.forEach(item => {
    if (object_b.value.includes(item.key)) {
      item.count--;
    }
  });
  return collection_a;
}

module.exports = create_updated_collection;
