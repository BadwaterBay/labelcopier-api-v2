import { expect } from 'chai';

import { parseLinkHeader } from '../core/linkHeaderParser';

describe('Test linkHeaderParser', function () {
  describe('when passed with an valid Link header', function () {
    let parsedLinkHeader;

    beforeEach(function () {
      const linkHeader =
        '<https://api.github.com/repositories/295931557/labels?per_page=3&page=2>; rel="next", <https://api.github.com/repositories/295931557/labels?per_page=3&page=3>; rel="last"';

      parsedLinkHeader = parseLinkHeader(linkHeader);
    });

    it('should return an object', function () {
      expect(parsedLinkHeader).to.be.an('object');
    });

    it('should contain at least one key', function () {
      const keys = Object.keys(parsedLinkHeader);
      expect(keys).to.have.lengthOf.above(0);
    });
  });

  describe('when passed with an invalid Link header', function () {
    let parsedLinkHeader;
    let linkHeader;

    beforeEach(function () {
      parsedLinkHeader = parseLinkHeader(linkHeader);
    });

    it('should return an object', function () {
      linkHeader = '';
      expect(parsedLinkHeader).to.be.an('object');
    });

    it('should return an empty object', function () {
      linkHeader =
        '<https://api.github.com/repositories/295931557/labels?per_page=3&page=2>';

      const keys = Object.keys(parsedLinkHeader);
      expect(keys).to.have.lengthOf(0);
    });
  });
});
