const models = require('../models');

const postBody = {
  type: 'report',
  attributes: {
    title: 'XSS in login form',
  },
  relationships: {
    reporter: {
      data: {
        type: 'user',
        attributes: {
          username: 'api-example',
          name: 'API Example',
        },
      },
    },
    weakness: {
      data: {
        type: 'weakness',
        attributes: {
          name: 'Cross-Site Request Forgery (CSRF)',
          description: 'The web application does not, or can not, sufficiently verify whether a well-formed, valid, consistent request was intentionally provided by the user who submitted the request.',
        },
      },
    },
  },
};

module.exports = {
  reports: {
    post: (req, res) => {
      models.Report.create(req.body)
        .then(data => res.status(201).send({ data }))
        .catch(err => res.status(404).send(err));
    },
    get: (req, res) => {
      models.Report.find(req.query)
        .then(data => res.status(200).send({ data }))
        .catch(err => res.status(404).send(err));
    },
    put: (req, res) => {
      models.Report.updateOne(req.query)
        .then(data => res.status(200).send({ data }))
        .catch(err => res.status(204).send(err));
    },
    delete: (req, res) => {
      models.Report.deleteOne(req.query)
        .then(data => res.status(204).send({ data }))
        .catch(err => res.status(405).send(err));
    },
  },
};
