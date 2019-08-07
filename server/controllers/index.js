const models = require('../models');

module.exports = {
  posts: {
    get: (req, res) => {
      const { query: { tags, sortBy, direction } } = req;
      res.header('Content-Type', 'application/json');

      if (!tags) {
        // If tag parameter not specified return 400 error
        res.status(400).send({ error: 'The tags parameter is required' });
      } else {
        models.get(tags, sortBy, direction)
          .then(posts => res.status(200).send(JSON.stringify({ posts }, null, 2)))
          .catch(({ message }) => res.status(400).send({ error: message }));
      }
    },
  },
  ping: {
    get: (req, res) => res.status(200).send({ success: true }),
  },
};
