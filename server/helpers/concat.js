// => flattens all posts into one array
const concat = data => data.reduce(
  (accum, { data: { posts } }) => accum.concat(posts),
  [],
);

module.exports = concat;
