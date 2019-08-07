/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */

const { expect } = require('chai');

const { describe, it } = require('mocha');

const axios = require('axios');

const PORT = process.env.PORT || 3000;

const url = `http://localhost:${PORT}/api/`;

// Customize axios to not reject promises on 400-level requests
const request = axios.create({
  validateStatus: status => status >= 200 && status <= 503,
});

describe('Basic functionality of API', () => {
  it('should return 200 response on ping', () => request.get(`${url}/ping`)
    .then((res) => {
      const { data } = res;

      // Expect the response to have a 200 status code
      expect(res.status).to.equal(200);

      // Expect the response to have a success property
      expect(data.success).to.equal(true);
    }));

  it('should return an error when tags not specified', () => request(`${url}/posts`)
    .then((res) => {
      const { data } = res;
      const error = 'The tags parameter is required';

      // Expect the response to have a 200 status code
      expect(res.status).to.equal(400);

      // Expect the response to have a success property
      expect(data.error).to.equal(error);
    }));

  it('should return list of posts when tag is specified', () => request(`${url}/posts?tags=tech`)
    .then((res) => {
      const { data } = res;
      const { posts } = data;

      // Expect the response to have a 200 status code
      expect(res.status).to.equal(200);

      // Expect 28 posts to be returned
      expect(posts.length).to.equal(28);

      // Expect all posts to have the tech tag
      posts.forEach(({ tags }) => expect(tags).to.include('tech'));
    }));
});

describe('Advanced functionality of API', () => {
  it('should sort all posts by id in ascending order by default', () => request(`${url}/posts?tags=tech`)
    .then((res) => {
      const { data } = res;
      const { posts } = data;

      // Expect posts to be ordered by id
      posts.reduce((a, b) => {
        expect(+b.id).to.be.above(+a.id);
        return b;
      }, { id: 0 });
    }));

  it('should allow multiple tags and properly filter/order them', () => request(`${url}/posts?tags=tech,health,history,culture`)
    .then((res) => {
      const { data } = res;
      const { posts } = data;

      // Expect the response to have a 200 status code
      expect(res.status).to.equal(200);

      // Expect 77 posts to be returned
      expect(posts.length).to.equal(77);

      // Expect all posts to have the tech tag
      posts.forEach(({ tags }) => {
        const memo = {}; // Initialize HashMap

        // Initalize each tag as false
        tags.forEach(tag => memo[tag] = false); // eslint-disable-line no-return-assign

        // Expect the keys to include at least one of the specified keys
        expect(memo).to.have.any.keys('tech', 'health', 'history', 'culture');
      });
    }));

  it('should properly filter and order multiple tags', () => request(`${url}/posts?tags=tech,health,history,culture`)
    .then((res) => {
      const { data } = res;
      const { posts } = data;

      // Expect posts to be ordered by id
      posts.reduce((a, b) => {
        expect(+b.id).to.be.above(+a.id);
        return b;
      }, { id: -1 });
    }));

  it('should allow sorting by popularity', () => request(`${url}/posts?tags=history,culture&sortBy=popularity`)
    .then((res) => {
      const { data } = res;
      const { posts } = data;

      // Expect the response to have a 200 status code
      expect(res.status).to.equal(200);

      // Expect exactly 43 posts to be returned
      expect(posts.length).to.equal(43);

      // Expect posts to be ordered by popularity
      posts.reduce((a, b) => {
        expect(+b.popularity).to.be.at.least(+a.popularity);
        return b;
      }, { popularity: -1 });
    }));

  it('should allow sorting by likes', () => request(`${url}/posts?tags=history,culture&sortBy=likes`)
    .then((res) => {
      const { data } = res;
      const { posts } = data;

      // Expect the response to have a 200 status code
      expect(res.status).to.equal(200);

      // Expect exactly 43 posts to be returned
      expect(posts.length).to.equal(43);

      // Expect posts to be ordered by likes
      posts.reduce((a, b) => {
        expect(+b.likes).to.be.at.least(+a.likes);
        return b;
      }, { likes: -1 });
    }));

  it('should allow sorting by reads', () => request(`${url}/posts?tags=history,culture&sortBy=reads`)
    .then((res) => {
      const { data } = res;
      const { posts } = data;

      // Expect the response to have a 200 status code
      expect(res.status).to.equal(200);

      // Expect exactly 43 posts to be returned
      expect(posts.length).to.equal(43);

      // Expect posts to be ordered by reads
      posts.reduce((a, b) => {
        expect(+b.reads).to.be.at.least(+a.reads);
        return b;
      }, { reads: -1 });
    }));

  it('should allow sorting by ID', () => request(`${url}/posts?tags=history,culture&sortBy=id`)
    .then((res) => {
      const { data } = res;
      const { posts } = data;

      // Expect the response to have a 200 status code
      expect(res.status).to.equal(200);

      // Expect exactly 43 posts to be returned
      expect(posts.length).to.equal(43);

      // Expect posts to be ordered by id
      posts.reduce((a, b) => {
        expect(+b.id).to.be.at.least(+a.id);
        return b;
      }, { id: -1 });
    }));

  it('should throw an error if sortBy field is invalid', () => request(`${url}/posts?tags=history,culture&sortBy=invalid`)
    .then((res) => {
      const { data } = res;
      const error = 'sortBy parameter is invalid';

      // Expect the response to have a 200 status code
      expect(res.status).to.equal(400);

      // Expect the response to have a success property
      expect(data.error).to.equal(error);
    }));

  it('should allow sorting id by descending order', () => request(`${url}/posts?tags=history,culture&direction=desc`)
    .then((res) => {
      const { data } = res;
      const { posts } = data;

      // Expect the response to have a 200 status code
      expect(res.status).to.equal(200);

      // Expect exactly 43 posts to be returned
      expect(posts.length).to.equal(43);

      // Expect posts to be ordered by id
      posts.reduce((a, b) => {
        expect(+a.id).to.be.at.least(+b.id);
        return b;
      }, { id: Infinity });
    }));

  it('should allow sorting likes by descending order', () => request(`${url}/posts?tags=history,culture&sortBy=likes&direction=desc`)
    .then((res) => {
      const { data } = res;
      const { posts } = data;

      // Expect the response to have a 200 status code
      expect(res.status).to.equal(200);

      // Expect exactly 43 posts to be returned
      expect(posts.length).to.equal(43);

      // Expect posts to be ordered by id
      posts.reduce((a, b) => {
        expect(+a.likes).to.be.at.least(+b.likes);
        return b;
      }, { likes: Infinity });
    }));

  it('should throw an error upon invalid direction', () => request(`${url}/posts?tags=history,culture&sortBy=likes&direction=lolwut`)
    .then((res) => {
      const { data } = res;
      const error = 'direction parameter is invalid';

      // Expect the response to have a 200 status code
      expect(res.status).to.equal(400);

      // Expect the response to have a success property
      expect(data.error).to.equal(error);
    }));
});
