const getStringFilter = (query: Record<string, string>) => {
  return Object.keys(query).reduce((acc, key) => {
    if (query[key]) {
      Object.assign(acc, { [key]: { $regex: query[key], $options: "i" } });
    }
    return acc;
  }, {});
};

const getArrayFilter = (query: Record<string, string[]>) => {
  return Object.keys(query).reduce((acc, key) => {
    if (query[key]) {
      Object.assign(acc, { [key]: { $elemMatch: { $regex: query[key], $options: "i" } } });
    }
    return acc;
  }, {});
};

export default {
  getStringFilter,
  getArrayFilter,
};
