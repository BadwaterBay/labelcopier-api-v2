import { expect } from 'chai';

import { generateDefaultLabel } from '../../core/defaultEntries';

describe('Test generateDefaultLabel', function () {
  let output;

  before(function () {
    output = generateDefaultLabel();
  });

  describe('id', function () {
    it('should be a string', function () {
      expect(output.id).to.be.a('string');
    });
  });

  describe('name', function () {
    it('should be a string', function () {
      expect(output.name).to.be.a('string');
    });
  });

  describe('description', function () {
    it('should be a string', function () {
      expect(output.description).to.be.a('string');
    });
  });

  describe('color', function () {
    it('should be a string', function () {
      expect(output.color).to.be.a('string');
    });

    it('should be a valid hex color code', function () {
      const hexColorRegex = /^#[0-9A-F]{6}$/i;
      const isValid = hexColorRegex.test(output.color);
      expect(isValid).to.be.true;
    });
  });

  describe('originalName', function () {
    it('should be a string', function () {
      expect(output.originalName).to.be.a('string');
    });

    it('should be an empty string', function () {
      expect(output.originalName).to.deep.equal('');
    });
  });

  describe('originalDescription', function () {
    it('should be a string', function () {
      expect(output.originalDescription).to.be.a('string');
    });

    it('should be an empty string', function () {
      expect(output.originalDescription).to.deep.equal('');
    });
  });

  describe('originalColor', function () {
    it('should be a string', function () {
      expect(output.originalColor).to.be.a('string');
    });

    it('should be an empty string', function () {
      expect(output.originalColor).to.deep.equal('');
    });
  });

  describe('action', function () {
    it('should be a string', function () {
      expect(output.action).to.be.a('string');
    });

    it("should be 'create'", function () {
      expect(output.action).to.deep.equal('create');
    });
  });

  describe('validation', function () {
    it('should be a string', function () {
      expect(output.validation).to.be.a('string');
    });

    it("should be 'valid'", function () {
      expect(output.validation).to.deep.equal('valid');
    });
  });
});
