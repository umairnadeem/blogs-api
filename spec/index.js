const { expect } = require('chai');

const { describe, it } = require('mocha');

const axios = require('axios');

const PORT = 3000;

const url = `http://localhost:${PORT}/api/reports`;

describe('CRUD Functionality of API', () => {
  it('should post reports to the db', (done) => {
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

        done();
      })
      .catch(err => console.error(err)); // eslint-disable-line no-console
  });
});
