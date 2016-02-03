const config = require('config');
const expect = require('chai').expect;
const request = require('superagent');
const Entry = require('../../models').Entry;

describe('routes/api', () => {

  describe('Posting a safe entry', () => {
    let safeEntry;
    before(() => {
      safeEntry = {
        date: new Date().toISOString(),
        runningIndex: '80',
        location: 'safeEntry',
        securityToken: '1',
      };
    });

    after((done) => {
      Entry.destroy({where: {
        location: 'safeEntry',
      }});
      done();
    });

    it('should return a 201 status code (entry added)', (done) => {
      request
        .post(config.endpoints.api + '/entries')
        .send(safeEntry)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    });
  });

  describe.only('Posting a safe entry with an empty location', () => {
    let safeEntry;
    before(() => {
      safeEntry = {
        date: new Date().toISOString(),
        runningIndex: '100',
        location: '',
        securityToken: '1',
      };
    });

    after((done) => {
      Entry.destroy({where: {
        runningIndex: '100',
      }});
      done();
    });

    it('should return a 201 status code (entry added)', (done) => {
      request
        .post(config.endpoints.api + '/entries')
        .send(safeEntry)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    });
  });

  describe('Posting an entry with an incorrect securityToken', () => {
    let malicousEntry;
    before(() => {
      malicousEntry = {
        date: new Date().toISOString(),
        runningIndex: '10',
        location: 'Sydney',
        securityToken: '2',
      };
    });

    it('should return a 401 status code (unauthorised)', (done) => {
      request
        .post(config.endpoints.api + '/entries')
        .send(malicousEntry)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });
  });

  describe('Posting a malicous entry that is still valid after sanitisation', () => {
    let malicousEntry;
    before(() => {
      malicousEntry = {
        date: new Date().toISOString(),
        runningIndex: '    <script>alert(10)</script>   1   ',
        location: '   <script>eval(console.log("Malicous Mal"))</script>   sanitised',
        securityToken: '1',
      };
    });

    after((done) => {
      Entry.destroy({where: {
        location: 'sanitised',
      }});
      done();
    });

    it('should return a 201 status code (entry added)', (done) => {
      request
        .post(config.endpoints.api + '/entries')
        .send(malicousEntry)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    });
  });

  describe('Posting a malicous entry', () => {
    let malicousEntry;
    before(() => {
      malicousEntry = {
        date: new Date().toISOString(),
        runningIndex: '<script>alert(10)</script>',
        location: '<script>eval(console.log("Malicous Mal"))</script>',
        securityToken: '1',
      };
    });

    it('should return a 400 status code (invalid entry params)', (done) => {
      request
        .post(config.endpoints.api + '/entries')
        .send(malicousEntry)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
  });


});
