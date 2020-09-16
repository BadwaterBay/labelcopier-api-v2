import { expect } from 'chai';

import { validKinds, validateKindOrThrowError } from '../core/validateKind';

describe('Test validKinds', () => {
  describe('the return value', () => {
    it('should not be empty', () => {
      expect(validKinds).to.not.be.empty;
    });

    it('should have a size of 2', () => {
      expect(validKinds).to.have.lengthOf(2);
    });

    it("should contain 'labels'", () => {
      expect(validKinds).to.include('labels');
    });

    it("should contain 'milestones'", () => {
      expect(validKinds).to.include('milestones');
    });
  });

  describe('when tested against an invalid value', () => {
    it('should throw an error', () => {
      expect(validKinds).to.not.include('nonexistence-kind');
    });
  });
});

describe('Test validateKindOrThrowError', () => {
  describe("with 'labels", () => {
    it('should be valid', () => {
      const input = 'labels';
      const output = validateKindOrThrowError(input);
      expect(output).to.be.true;
    });
  });

  describe("with 'milestones'", () => {
    it('should be valid', () => {
      const input = 'milestones';
      const output = validateKindOrThrowError(input);
      expect(output).to.be.true;
    });
  });

  describe('with an invalid value', () => {
    it('should throw an error', () => {
      const input = 'nonexistence-kind';

      expect(() => validateKindOrThrowError(input)).to.throw();
    });
  });
});
