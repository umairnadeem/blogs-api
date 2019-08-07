// => sorts the input data by sortBy field and direction
const sort = (data, sortBy, direction) => data.sort((a, b) => {
  const x = a[sortBy];
  const y = b[sortBy];
  return direction === 'asc' ? x - y : y - x;
});

module.exports = sort;
