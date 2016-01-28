const expect = require('chai').expect;
const dao = require('../../dao/dao.prod');

describe('dao/dao.prod', () => {

  describe('getRunCountData()', () => {
    it('should return an object with 6 keys', (done) => {
      dao.getRunCountData()
        .then((runCounts) => {
          expect(runCounts).to.be.an('object').and.has.all.keys(
            ['thisYear', 'lastYear', 'thisMonth', 'lastMonth', 'thisWeek', 'lastWeek']
          );
          done();
        });
    });
  });

  describe('getBestRunData()', () => {
    it('should return an object with 6 keys', (done) => {
      dao.getBestRunData()
        .then((bestRuns) => {
          expect(bestRuns).to.be.an('object').and.has.all.keys(
            ['thisYear', 'lastYear', 'thisMonth', 'lastMonth', 'thisWeek', 'lastWeek']
          );
          done();
        });
    });
  });

  describe('getLifetimeTotalData()', () => {
    it('should return a integer greater than 1400', (done) => {
      dao.getLifetimeTotalData()
        .then((runTotal) => {
          expect(runTotal).to.be.a('Number').and.to.be.at.least(1400);
          done();
        });
    });
  });

  describe('getAllEntries()', () => {
    it('should return the entire run dataset', (done) => {
      dao.getAllEntries()
        .then((fullDataset) => {
          expect(fullDataset).to.be.an('array').and.have.length.above(1400);
          done();
        });
    });
  });

  describe.only('getAnnualMonthlyRIAvg', () => {
    it('should return an array with at least 72 entries', (done) => {
      dao.getAnnualMonthlyRIAvg()
        .then((avgMonthlyData) => {
          expect(avgMonthlyData).to.be.an('array').and.have.length.above(72);
          done();
        });
    });
  });

});
