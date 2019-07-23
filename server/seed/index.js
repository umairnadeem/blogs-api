const faker = require('faker');

const models = require('../models');

const sentence = maxLength => faker.lorem.sentence(Math.ceil(Math.random() * maxLength + 2));

const entry = () => ({
  type: 'report',
  attributes: {
    title: sentence(4),
  },
  relationships: {
    weakness: {
      data: {
        type: 'weakness',
        attributes: {
          name: sentence(7),
          description: sentence(15),
        },
      },
    },
  },
});

((length) => {
  const entries = [];
  for (let i = 0; i < length; i += 1) {
    entries.push(entry());
  }
  console.log('Begin seeding...'); // eslint-disable-line no-console
  models.Report.create(entries)
    .then(() => {
      models.mongoose.connection.close();
      console.log(`Seeded ${length} entries`); // eslint-disable-line no-console
    });
})(1000);
