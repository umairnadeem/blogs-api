const { expect } = require('chai');

const { describe, it } = require('mocha');

const axios = require('axios');

const PORT = 3000;

const url = `http://localhost:${PORT}/api/reports`;

describe('CRUD Functionality of API', () => {
  it('should post reports to the db (valid POST)', (done) => {
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

    axios.post(url, postBody)
      .then((res) => {
        // Expect the response to have a 'type' of report
        expect(res.data.type).to.equal('report');

        // Expect the title to be the same
        expect(res.data.attributes.title).to.equal(postBody.attributes.title);

        // Expect the response to have a description
        expect(res.data.relationships.weakness.data.attributes.description).to.equal(postBody.relationships.weakness.data.attributes.description);

        // Expect the response to have a user
        expect(res.data.relationships.reporter.data.type).to.equal('user');

        // Expect the response to have a created_at timestamp
        expect(res.data.attributes.created_at).to.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/i);

        done();
      })
      .catch(err => console.error(err)); // eslint-disable-line no-console
  });
});
