const filter = (posts) => {
  const memo = {}; // Initialize HashMap
  const output = [];

  posts.forEach((post) => {
    const { id } = post;

    // If post hasn't already been pushed to output
    if (!memo[id]) {
      output.push(post);
    }

    memo[id] = true;
  });
  return output;
};

const sort = (data, sortBy, direction) => data.sort((a, b) => {
  const x = a[sortBy];
  const y = b[sortBy];
  return direction === 'asc' ? x - y : y - x;
});

const concat = data => data.reduce(
  (accum, { data: { posts } }) => accum.concat(posts),
  [],
);

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

module.exports = {
  filter,
  concat,
  validate,
  sort,
};
