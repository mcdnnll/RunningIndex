const expect = require('chai').expect;

describe('models/entry', () => {

  let Entry;

  beforeEach(() => {
    Entry = require('../../models').Entry;
  });

  describe('create', () => {

    after(() => {
      Entry.destroy({where: {
        location: 'testCreate',
      }});
    });

    it('creates a new entry with a location of "testCreate", then deletes it.', () => {
      const newEntry = Entry.build({
        date: new Date(),
        runningIndex: 1,
        location: 'testCreate',
      });

      newEntry.save().then((entry) => {
        expect(entry.location).to.equal('testCreate');
      });
    });
  });


  describe('update', () => {

    before(() => {
      Entry.create({
        date: new Date(),
        runningIndex: 1,
        location: 'testUpdateBefore',
      });
    });

    after(() => {
      Entry.destroy({where: {
        location: 'testUpdateAfter',
      }});
    });

    it('creates a new entry, updates the location to "testUpdateAfter", then deletes it.', () => {

      Entry.findOne({where: {location: 'testUpdateBefore'}})
        .then((retEntry) => {
          retEntry.update({location: 'testUpdateAfter'})
            .then((updatedEntry) => {
              expect(updatedEntry.location).to.equal('testUpdateAfter');
            });
        });
    });
  });

  describe('delete', () => {

    before(() => {
      Entry.create({
        date: new Date(),
        runningIndex: 1,
        location: 'testDelete',
      });
    });

    it('creates a new entry with a location of "testDelete", then deletes it.', () => {

      Entry.destroy({where: {
        location: 'testDelete',
      }})
      .then((deletedEntries) => {
        expect(deletedEntries).to.equal(1);
      });

    });
  });
});
