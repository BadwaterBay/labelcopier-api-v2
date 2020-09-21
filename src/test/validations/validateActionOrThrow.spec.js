import { expect } from 'chai';

import {
  getValidActions,
  validateActionOrThrow,
} from '../../core/validations/validationOfAction';

describe('Test module validationOfAction', function () {
  describe('Test getValidActions', function () {
    describe('the return value', function () {
      it('should not be empty', function () {
        expect(getValidActions()).to.not.be.empty;
      });

      it('should have a size of 3', function () {
        expect(getValidActions()).to.have.lengthOf(4);
      });

      it("should contain 'list'", function () {
        expect(getValidActions()).to.include('list');
      });

      it("should contain 'copy'", function () {
        expect(getValidActions()).to.include('copy');
      });

      it("should contain 'create'", function () {
        expect(getValidActions()).to.include('create');
      });

      it("should contain 'update'", function () {
        expect(getValidActions()).to.include('update');
      });
    });

    describe('when tested against an invalid value', function () {
      it('should throw an error', function () {
        expect(getValidActions()).to.not.include('nonexistence-action');
      });
    });
  });

  describe('Test validateActionOrThrow', function () {
    it("'list' should be valid", function () {
      const action = 'list';
      const output = validateActionOrThrow(action);
      expect(output).to.be.true;
    });

    it("'copy' should be valid", function () {
      const action = 'copy';
      const output = validateActionOrThrow(action);
      expect(output).to.be.true;
    });

    it("'create' should be valid", function () {
      const action = 'create';
      const output = validateActionOrThrow(action);
      expect(output).to.be.true;
    });

    it("'update' should be valid", function () {
      const action = 'update';
      const output = validateActionOrThrow(action);
      expect(output).to.be.true;
    });

    it('should throw an error', function () {
      const action = 'nonexistence-action';
      expect(() => validateActionOrThrow(action)).to.throw();
    });
  });
});
