import { expect } from 'chai';

import {
  getValidEntryTypes,
  validateEntryTypeOrThrow,
} from '../../core/validations/validationOfEntryType';

describe('Test module validationOfEntryType', function () {
  describe('Test getValidEntryTypes', function () {
    describe('the return value', function () {
      it('should not be empty', function () {
        expect(getValidEntryTypes()).to.not.be.empty;
      });

      it('should have a size of 2', function () {
        expect(getValidEntryTypes()).to.have.lengthOf(2);
      });

      it("should contain 'labels'", function () {
        expect(getValidEntryTypes()).to.include('labels');
      });

      it("should contain 'milestones'", function () {
        expect(getValidEntryTypes()).to.include('milestones');
      });
    });

    describe('when tested against an invalid value', function () {
      it('should throw an error', function () {
        expect(getValidEntryTypes()).to.not.include('nonexistence-entryType');
      });
    });
  });

  describe('Test validateEntryTypeOrThrow', function () {
    describe("with 'labels'", function () {
      it('should be valid', function () {
        const input = 'labels';
        const output = validateEntryTypeOrThrow(input);
        expect(output).to.be.true;
      });
    });

    describe("with 'milestones'", function () {
      it('should be valid', function () {
        const input = 'milestones';
        const output = validateEntryTypeOrThrow(input);
        expect(output).to.be.true;
      });
    });

    describe('with an invalid value', function () {
      it('should throw an error', function () {
        const input = 'nonexistence-entryType';
        expect(() => validateEntryTypeOrThrow(input)).to.throw();
      });
    });
  });
});
