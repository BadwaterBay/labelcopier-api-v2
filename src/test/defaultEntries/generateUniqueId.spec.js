import { expect } from 'chai';

import generateUniqueId from '../../core/defaultEntries/generateUniqueId';

describe('Test generateUniqueId', function () {
  const numOfTests = 100000;

  it('should be a string', function () {
    const output = generateUniqueId();
    expect(output).to.be.a('string');
  });

  describe(`when ${numOfTests} random IDs are generated consecutively, each ID...`, function () {
    it('should be unique', function () {
      const randomIds = new Array(numOfTests).fill().map(() => generateUniqueId());
      const numOfIds = randomIds.length;

      const set = new Set(randomIds);
      const numOfUniqueIds = set.size;

      expect(numOfIds).to.deep.equal(numOfUniqueIds);
    });
  });
});
