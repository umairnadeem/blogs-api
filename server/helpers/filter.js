// => filters out duplicate posts in O(n) time
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

module.exports = filter;