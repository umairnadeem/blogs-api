const sort = require('./sort');

// => validates sortBy and direction fields, throws error if invalid
const validate = (data, sortBy, direction) => {
  const validFields = ['id', 'reads', 'likes', 'popularity']; // Valid sortBy fields

  if (!validFields.includes(sortBy)) {
    // If sortBy field is invalid, throw error
    return Promise.reject(new Error('sortBy parameter is invalid'));
  }
  if (direction !== 'asc' && direction !== 'desc') {
    // If direction field is invalid, throw error
    return Promise.reject(new Error('direction parameter is invalid'));
  }

  return sort(data, sortBy, direction); // Return the sorted result
};

module.exports = validate;
