import { expect } from 'chai';

import {
  validKinds,
  validateKindOrThrowError,
} from '../../core/validations/kindValidation';

describe('Test kindValidation', function () {
  describe('Test validKinds', function () {
    describe('the return value', function () {
      it('should not be empty', function () {
        expect(validKinds).to.not.be.empty;
      });

      it('should have a size of 2', function () {
        expect(validKinds).to.have.lengthOf(2);
      });

      it("should contain 'labels'", function () {
        expect(validKinds).to.include('labels');
      });

      it("should contain 'milestones'", function () {
        expect(validKinds).to.include('milestones');
      });
    });

    describe('when tested against an invalid value', function () {
      it('should throw an error', function () {
        expect(validKinds).to.not.include('nonexistence-kind');
      });
    });
  });

  describe('Test validateKindOrThrowError', function () {
    describe("with 'labels'", function () {
      it('should be valid', function () {
        const input = 'labels';
        const output = validateKindOrThrowError(input);
        expect(output).to.be.true;
      });
    });

    describe("with 'milestones'", function () {
      it('should be valid', function () {
        const input = 'milestones';
        const output = validateKindOrThrowError(input);
        expect(output).to.be.true;
      });
    });

    describe('with an invalid value', function () {
      it('should throw an error', function () {
        const input = 'nonexistence-kind';
        expect(() => validateKindOrThrowError(input)).to.throw();
      });
    });
  });
});
