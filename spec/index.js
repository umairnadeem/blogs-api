/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */

const { expect } = require('chai');

const { describe, it } = require('mocha');

const axios = require('axios');

const PORT = 3000;

let id;

const url = `http://localhost:${PORT}/api/v1/reports`;

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

describe('Basic CRUD Functionality of API', () => {
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
    }));

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

  it('should update an entry by ID upon a PUT request after POST', () => axios.post(url, postBody)
    .then((res) => {
      const { data } = res.data;

      id = data._id;

      const putData = Object.assign({}, data, {
        attributes: {
          title: 'CSRF vulnerability',
        },
      });

      return axios.put(url, putData);
    })
    .then((res) => {
      const { data } = res.data;

      // 200 response code should be returned
      expect(res.status).to.equal(200);

      // Only 1 entry should be modified
      expect(data.nModified).to.equal(1);
    }));

  it('should delete an entry by ID upon a DELETE request after POST', () => axios.post(url, postBody)
    .then((res) => {
      const { resData } = res.data;

      const data = Object.assign({}, resData);

      return axios.delete(url, { data });
    })
    .then((res) => {
      const { data } = res;

      // 204 response code should be returned
      expect(res.status).to.equal(204);

      // No content should be returned
      expect(data).to.equal('');
    }));
});

describe('Extended CRUD functionality of API', () => {
  it('should support URL query string for GET request', () => axios.get(`${url}?_id=${id}`)
    .then((res) => {
      const response = res.data.data[res.data.data.length - 1];
      const { weakness, reporter } = response.relationships;

      // Expect the response to have a 'type' of report
      expect(response.type).to.equal('report');

      // Expect the response to have a description
      expect(weakness.data.attributes.description).to.equal(postBody.relationships.weakness.data.attributes.description);

      // Expect the response to have a user
      expect(reporter.data.type).to.equal('user');

      // Expect the response to have a created_at timestamp
      expect(response.attributes.created_at).to.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/i);
    }));

  it('should support URL query string for a PUT request after POST', () => axios.post(url, postBody)
    .then((res) => {
      const { data } = res.data;

      const putData = Object.assign({}, data, {
        attributes: {
          title: 'CSRF vulnerability',
        },
      });

      return axios.put(`${url}/${putData._id}`, putData);
    })
    .then((res) => {
      const { data } = res.data;

      // 200 response code should be returned
      expect(res.status).to.equal(200);

      // Should return updated document instead of original
      expect(data.attributes.title).to.equal('CSRF vulnerability');
    }));
});
