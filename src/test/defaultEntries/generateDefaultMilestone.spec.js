import { expect } from 'chai';

import { generateDefaultMilestone } from '../../core/defaultEntries';

describe('Test generateDefaultMilestone', function () {
  let output;

  before(function () {
    output = generateDefaultMilestone();
  });

  describe('id', function () {
    it('should be a string', function () {
      expect(output.id).to.be.a('string');
    });
  });

  describe('title', function () {
    it('should be a string', function () {
      expect(output.title).to.be.a('string');
    });
  });

  describe('description', function () {
    it('should be a string', function () {
      expect(output.description).to.be.a('string');
    });
  });

  describe('state', function () {
    it('should be a string', function () {
      expect(output.state).to.be.a('string');
    });

    it("should be 'open'", function () {
      expect(output.state).to.deep.equal('open');
    });
  });

  describe('dueOn', function () {
    it('should be a string', function () {
      expect(output.dueOn).to.be.a('string');
    });

    it('should be an empty string', function () {
      expect(output.originalTitle).to.deep.equal('');
    });
  });

  describe('originalTitle', function () {
    it('should be a string', function () {
      expect(output.originalTitle).to.be.a('string');
    });

    it('should be an empty string', function () {
      expect(output.originalTitle).to.deep.equal('');
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

  describe('originalState', function () {
    it('should be a string', function () {
      expect(output.originalState).to.be.a('string');
    });

    it('should be an empty string', function () {
      expect(output.originalState).to.deep.equal('');
    });
  });

  describe('originalDueOn', function () {
    it('should be a string', function () {
      expect(output.originalDueOn).to.be.a('string');
    });

    it('should be an empty string', function () {
      expect(output.originalDueOn).to.deep.equal('');
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
