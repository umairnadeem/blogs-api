const axios = require('axios');
const config = require('./config');
const { concat, filter, validate } = require('../helpers');

module.exports = {
  get: (tags, sortBy = 'id', direction = 'asc') => {
    const tagsArr = tags.split(','); // Convert the tags into an array
    const promises = [];
    const url = config.API;

    tagsArr.forEach((tag) => {
      promises.push(

        // Push each promise into the array
        axios.get(`${url}?tag=${tag}`),
      );
    });

    return Promise.all(promises)
      .then(
        posts => concat(posts), // Concatenate all posts
      ).then(
        posts => filter(posts), // Filter by ID in O(n) time
      ).then(
        posts => validate(posts, sortBy, direction), // Validate query params
      );
  },
};
