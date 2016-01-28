const config = require('config');
const expect = require('chai').expect;
const request = require('superagent');

describe('routes/web', () => {

  describe('dashboard: initial page load', () => {

    // TODO: Use mock stub instead of actual superagent call
    it('should make an ajax call to retrieve the initial page state', function(done) {
      this.timeout(5000);
      request
        .get(config.endpoints.api + '/dashboard')
        .end((err, res) => {
          done();
        });
    });
  });
});
