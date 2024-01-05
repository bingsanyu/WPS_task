function count_same_elements(collection) {
  //在这里写入代码
  let obj = collection.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});

  let result = Object.entries(obj).map(([key, count]) => ({key, count}));

  return result;
}

module.exports = count_same_elements;
