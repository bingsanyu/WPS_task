function count_same_elements(collection) {
  //在这里写入代码
  let obj = {};
  for (let item of collection) {
    let [name, count] = item.includes('-') ? item.split('-') : item.includes(':') ? item.split(':') : item.includes('[') ? item.split('[') : [item, '1'];
    if (String(count).includes(']')) {
      count = count.slice(0, -1);
    }
    count = parseInt(count, 10);
    obj[name] = (obj[name] || 0) + count;
  }
  return Object.entries(obj).map(([name, summary]) => ({ name, summary }));
}

module.exports = count_same_elements;
