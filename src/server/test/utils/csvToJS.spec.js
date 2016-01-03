const expect = require('chai').expect;
const rewire = require('rewire');

const csvToJS = rewire('../../utils/csvToJS');
const mockInput = require('./csvMock');

// Mock fs and path api
const fsStub = {
  readFile: (mockData, cb) => cb(null, mockData),
};

const pathStub = {
  join: (dir, path) => path,
};

describe('utils/csvToJS', () => {

  before(() => {
    csvToJS.__set__({
      fs: fsStub,
      path: pathStub,
    });
  });

  describe('Helper to convert a csv file to an array of JS objects', () => {

    it('should fail if the document is not a valid csv', (done) => {
      csvToJS(mockInput.notValid, (err) => {
        expect(err.message).to.be.a('string').and.equal('Not a valid csv file');
        done();
      });
    });

    it('should fail if the first field is blank (date not provided)', (done) => {
      csvToJS(mockInput.blankDate, (err) => {
        expect(err.message).to.be.a('string').and.equal('Date column must not be blank');
        done();
      });
    });

    it('should fail if the second field is blank (runningIndex not provided)', (done) => {
      csvToJS(mockInput.blankRunningIndex, (err) => {
        expect(err.message).to.be.a('string').and.equal('runningIndex column must not be blank');
        done();
      });
    });

    it('should fail if the first field is not of the date format: DD/MM/YYYY', (done) => {
      csvToJS(mockInput.incorrectDate, (err) => {
        expect(err.message).to.be.a('string').and.equal('Incorrect date format found. Must be DD/MM/YYYY');
        done();
      });
    });

    it('should fail if the second field is not an integer (runningIndex)', (done) => {
      csvToJS(mockInput.incorrectRI, (err) => {
        expect(err.message).to.be.a('string').and.equal('runningIndex must be an integer');
        done();
      });
    });

    it('should succeed with a correct csv', (done) => {
      csvToJS(mockInput.correct, (err, data) => {
        expect(data[2].location).to.be.a('string').and.equal('Penshurst');
        done();
      });
    });

  });


});
