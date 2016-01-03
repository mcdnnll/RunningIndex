const expect = require('chai').expect;

describe('models/index', () => {

  it('should return the entry model', () => {
    const models = require('../../models');
    expect(models.Entry).to.be.ok;
  });
});
