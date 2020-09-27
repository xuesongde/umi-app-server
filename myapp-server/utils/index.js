const getDataIndex = (obj, excludes) =>
  Object.keys(obj).reduce((accumulator, item) => {
    if (!excludes.includes(item)) {
      accumulator.push({ dataIndex: item, title: item });
    }
    return accumulator;
  }, []);

module.exports = { getDataIndex };
