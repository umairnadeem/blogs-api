/* eslint-disable no-console */
const mongoose = require('mongoose');

const schemas = require('./schemas');

const mongoURI = 'mongodb://localhost:27017/hackerone-api';

const db = mongoose.connect(mongoURI, { useNewUrlParser: true });

db
  .then(() => console.log(`Connected to: ${mongoURI}`))
  .catch((err) => {
    console.log(`There was a problem connecting to mongo at: ${mongoURI}`);
    console.log(err);
  });

/* Mongoose models */
const Attribute = mongoose.model('Attribute', schemas.attributeSchema);
const Reporter = mongoose.model('Reporter', schemas.reporterSchema);
const Weakness = mongoose.model('Weakness', schemas.weaknessSchema);
const Relationship = mongoose.model('Relationship', schemas.relationshipSchema);
const Report = mongoose.model('Report', schemas.reportSchema);

module.exports = {
  db,
  Attribute,
  Reporter,
  Weakness,
  Relationship,
  Report,
};
