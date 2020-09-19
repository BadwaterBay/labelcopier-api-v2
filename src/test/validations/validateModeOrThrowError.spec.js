import { expect } from 'chai';

import {
  validModes,
  validateModeOrThrowError,
} from '../../core/validations/modeValidation';

describe('Test modeValidation', function () {
  describe('Test validModes', function () {
    describe('the return value', function () {
      it('should not be empty', function () {
        expect(validModes).to.not.be.empty;
      });

      it('should have a size of 3', function () {
        expect(validModes).to.have.lengthOf(3);
      });

      it("should contain 'list'", function () {
        expect(validModes).to.include('list');
      });

      it("should contain 'copy'", function () {
        expect(validModes).to.include('copy');
      });
    });

    describe('when tested against an invalid value', function () {
      it('should throw an error', function () {
        expect(validModes).to.not.include('nonexistence-mode');
      });
    });
  });

  describe('Test validateModeOrThrowError', function () {
    describe("with 'list'", function () {
      it('should be valid', function () {
        const input = 'list';
        const output = validateModeOrThrowError(input);
        expect(output).to.be.true;
      });
    });

    describe("with 'copy'", function () {
      it('should be valid', function () {
        const input = 'copy';
        const output = validateModeOrThrowError(input);
        expect(output).to.be.true;
      });
    });

    describe('with an invalid value', function () {
      it('should throw an error', function () {
        const input = 'nonexistence-mode';
        expect(() => validateModeOrThrowError(input)).to.throw();
      });
    });
  });
});
