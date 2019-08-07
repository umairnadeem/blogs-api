const axios = require('axios');
const helpers = require('../helpers');

module.exports = {
  get: (tags, sortBy = 'id', direction = 'asc') => {
    const tagsArr = tags.split(','); // Convert the tags into an array
    const promises = [];
    const url = 'SOME API';

    tagsArr.forEach((tag) => {
      promises.push(

        // Push each promise into the array
        axios.get(`${url}?tag=${tag}`),
      );
    });

    return Promise.all(promises)
      .then(
        posts => helpers.concat(posts), // Concatenate all posts
      ).then(
        posts => helpers.filter(posts), // Filter by ID in O(n) time
      )
      .then(
        posts => helpers.validate(posts, sortBy, direction), // Validate query params
      );
  },
};
