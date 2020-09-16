import { expect } from 'chai';

import { validModes, validateModeOrThrowError } from '../core/validateMode';

describe('Test validModes', () => {
  describe('the return value', () => {
    it('should not be empty', () => {
      expect(validModes).to.not.be.empty;
    });

    it('should have a size of 2', () => {
      expect(validModes).to.have.lengthOf(2);
    });

    it("should contain 'list'", () => {
      expect(validModes).to.include('list');
    });

    it("should contain 'copy'", () => {
      expect(validModes).to.include('copy');
    });
  });

  describe('when tested against an invalid value', () => {
    it('should throw an error', () => {
      expect(validModes).to.not.include('nonexistence-mode');
    });
  });
});

describe('Test validateModeOrThrowError', () => {
  describe("with 'list'", () => {
    it('should be valid', () => {
      const input = 'list';
      const output = validateModeOrThrowError(input);
      expect(output).to.be.true;
    });
  });

  describe("with 'copy'", () => {
    it('should be valid', () => {
      const input = 'copy';
      const output = validateModeOrThrowError(input);
      expect(output).to.be.true;
    });
  });

  describe('with an invalid value', () => {
    it('should throw an error', () => {
      const input = 'nonexistence-mode';
      expect(() => validateModeOrThrowError(input)).to.throw();
    });
  });
});
