function count_same_elements(collection) {
  //在这里写入代码
  let obj = collection.reduce((acc, item) => {
    let [key, count] = item.split('-');
    count = count ? parseInt(count) : 1;
    if (acc[key]) {
      acc[key] += count;
    } else {
      acc[key] = count;
    }
    return acc;
  }, {});

  return Object.entries(obj).map(([key, count]) => ({key, count}));
}

module.exports = count_same_elements;
