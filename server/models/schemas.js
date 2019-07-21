const mongoose = require('mongoose');

/* Mongoose Schemas */
const attributeSchema = new mongoose.Schema({
  title: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const reporterSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['user'],
    default: 'user',
  },
  attributes: {
    username: {
      type: String,
      default: 'root',
    },
    name: {
      type: String,
      default: 'root-user',
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
});

const weaknessSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['weakness'],
    default: 'weakness',
  },
  attributes: {
    name: String,
    description: String,
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
});

const relationshipSchema = new mongoose.Schema({
  reporter: {
    data: {
      type: reporterSchema,
    },
  },
  weakness: {
    data: {
      type: weaknessSchema,
    },
  },
});

const reportSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['report'],
    default: 'report',
  },
  attributes: {
    type: attributeSchema,
  },
  relationships: {
    type: relationshipSchema,
  },
});

module.exports = {
  attributeSchema,
  reporterSchema,
  weaknessSchema,
  relationshipSchema,
  reportSchema,
};
