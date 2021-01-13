import { expect } from 'chai';

import generateUniqueId from '../../core/defaultEntries/generateUniqueId';

describe('Test generateUniqueId', function () {
  it('should be a string', function () {
    const output = generateUniqueId();
    expect(output).to.be.a('string');
  });

  describe('when 100000 random IDs are generated, each ID...', function () {
    it('should be unique', function () {
      const output = new Array(100000).fill().map(() => generateUniqueId());
      const arrayLength = output.length;

      const set = new Set(output);
      const setSize = set.size;

      expect(arrayLength).to.deep.equal(setSize);
    });
  });
});
