function create_updated_collection(collection_a, object_b) {
  //在这里写入代码
  let counts = {};
  collection_a.forEach(item => {
    if (!counts[item]) {
      counts[item] = 1;
    } else {
      counts[item]++;
    }
  });
  let collection_c = Object.keys(counts).map(key => ({ key: key, count: counts[key] }));
  collection_c.forEach(item => {
    if (object_b.value.includes(item.key)) {
      item.count -= Math.floor(item.count / 3);
    }
  });
  return collection_c;
}

module.exports = create_updated_collection;
