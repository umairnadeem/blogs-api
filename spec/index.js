const { expect } = require('chai');

const { describe, it } = require('mocha');

const axios = require('axios');

const PORT = 3000;

const url = `http://localhost:${PORT}/api/v1/reports`;

describe('CRUD Functionality of API', () => {
  const postBody = {
    type: 'report',
    attributes: {
      title: 'XSS in login form',
    },
    relationships: {
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
  it('should persist reports to the db upon POST request', () => axios.post(url, postBody)
    .then((res) => {
      const response = res.data.data;
      const { weakness, reporter } = response.relationships;

      // Expect the response to have a 'type' of report
      expect(response.type).to.equal('report');

      // Expect the title to be the same
      expect(response.attributes.title).to.equal(postBody.attributes.title);

      // Expect the response to have a description
      expect(weakness.data.attributes.description).to.equal(postBody.relationships.weakness.data.attributes.description);

      // Expect the response to have a user
      expect(reporter.data.type).to.equal('user');

      // Expect the response to have a created_at timestamp
      expect(response.attributes.created_at).to.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/i);
    }).catch(err => console.error(err)));

  it('should respond with Report objects upon GET request', () => axios.get(url)
    .then((res) => {
      const response = res.data.data[res.data.data.length - 1];
      const { weakness, reporter } = response.relationships;

      // Expect the response to have a 'type' of report
      expect(response.type).to.equal('report');

      // Expect the title to be the same
      expect(response.attributes.title).to.equal(postBody.attributes.title);

      // Expect the response to have a description
      expect(weakness.data.attributes.description).to.equal(postBody.relationships.weakness.data.attributes.description);

      // Expect the response to have a user
      expect(reporter.data.type).to.equal('user');

      // Expect the response to have a created_at timestamp
      expect(response.attributes.created_at).to.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/i);
    }));
});
