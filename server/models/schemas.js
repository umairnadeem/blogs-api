const mongoose = require('mongoose');

/* Mongoose Schemas */
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

const reportSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['report'],
    default: 'report',
  },
  attributes: {
    title: String,
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  relationships: {
    reporter: {
      data: {
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
      },
    },
    weakness: {
      data: {
        type: weaknessSchema,
      },
    },
  },
});

module.exports = {
  weaknessSchema,
  reportSchema,
};
