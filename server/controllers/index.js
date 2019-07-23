/* eslint-disable no-underscore-dangle */

const models = require('../models');

module.exports = {
  reports: {
    post: (req, res) => {
      models.Report.create(req.body)
        .then(data => res.status(201).send({ data }))
        .catch(err => res.status(404).send(err));
    },
    getOne: (req, res) => {
      models.Report.findOne({ _id: req.params.id })
        .then(data => res.status(200).send({ data }))
        .catch(err => res.status(404).send(err));
    },
    getAll: (req, res) => {
      models.Report.find(req.query)
        .then(data => res.status(200).send({ data }))
        .catch(err => res.status(404).send(err));
    },
    put: (req, res) => {
      models.Report.updateOne({ _id: req.body._id }, req.body)
        .then(data => res.status(200).send({ data }))
        .catch(err => res.status(404).send(err));
    },
    putId: (req, res) => {
      models.Report.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(data => res.status(200).send({ data }))
        .catch(err => res.status(404).send(err));
    },
    delete: (req, res) => {
      models.Report.deleteOne({ _id: req.body._id })
        .then(() => res.status(204).send()) // Empty body (204 No Content)
        .catch(err => res.status(404).send(err));
    },
    deleteId: (req, res) => {
      models.Report.findByIdAndDelete(req.params.id)
        .then(() => res.status(204).send()) // Empty body (204 No Content)
        .catch(err => res.status(404).send(err));
    },
  },
};
