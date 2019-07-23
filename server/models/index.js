/* eslint-disable no-console */
const mongoose = require('mongoose');

const autoIncrement = require('mongoose-auto-increment');

const schemas = require('./schemas');

const mongoURI = 'mongodb://localhost:27017/hackerone-api';

const db = mongoose.connect(mongoURI, { useNewUrlParser: true });

autoIncrement.initialize(mongoose.connection);

db
  .then(() => console.log(`Connected to: ${mongoURI}`))
  .catch((err) => {
    console.log(`There was a problem connecting to mongo at: ${mongoURI}`);
    console.log(err);
  });

schemas.reportSchema.plugin(autoIncrement.plugin, 'Report');
schemas.weaknessSchema.plugin(autoIncrement.plugin, 'Weakness');
schemas.reporterSchema.plugin(autoIncrement.plugin, 'Reporter');

/* Mongoose models */
const Reporter = mongoose.model('Reporter', schemas.reporterSchema);
const Weakness = mongoose.model('Weakness', schemas.weaknessSchema);
const Report = mongoose.model('Report', schemas.reportSchema);

module.exports = {
  db,
  Reporter,
  Weakness,
  Report,
  mongoose,
};
