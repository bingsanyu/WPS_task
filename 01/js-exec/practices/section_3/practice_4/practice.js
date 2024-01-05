function create_updated_collection(collection_a, object_b) {
  //在这里写入代码
  let counts = {};
  collection_a.forEach(item => {
    let [key, count] = item.split('-');
    count = parseInt(count) || 1;
    if (!counts[key]) {
      counts[key] = count;
    } else {
      counts[key] += count;
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
