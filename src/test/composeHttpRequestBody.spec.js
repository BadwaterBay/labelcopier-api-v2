import { expect } from 'chai';

import { composeHttpRequestBody } from '../core/composeHttpRequestBody';

const getParsedBody = (kind) => {
  const stringifiedBody = composeHttpRequestBody(kind);
  const parsedBody = JSON.parse(stringifiedBody);
  return parsedBody;
};

describe('Test composeHttpRequestBody', () => {
  describe("with argument 'labels'", () => {
    describe('the return value as a whole', () => {
      it('should not be null', () => {
        const body = composeHttpRequestBody('labels');
        expect(body).to.not.be.a('null');
      });

      it('should be a string', () => {
        const body = composeHttpRequestBody('labels');
        expect(body).to.be.a('string');
      });
    });

    describe("a key called 'name' in the request body", () => {
      it('should exist', () => {
        const parsedBody = getParsedBody('labels');
        const keyNameExists = 'name' in parsedBody;
        expect(keyNameExists).to.be.true;
      });
    });

    describe("the value of key 'name'", () => {
      it('should be a string', () => {
        const parsedBody = getParsedBody('labels');
        const nameValue = parsedBody.name;
        expect(nameValue).to.be.a('string');
      });

      it('should have a length greater than 0', () => {
        const parsedBody = getParsedBody('labels');
        const nameValue = parsedBody.name;
        expect(nameValue).to.have.lengthOf.above(0);
      });
    });

    describe("a key called 'color' in the request body", () => {
      it('should exist', () => {
        const parsedBody = getParsedBody('labels');
        const colorExists = 'color' in parsedBody;
        expect(colorExists).to.be.true;
      });
    });

    describe("the value of key 'color'", () => {
      it('should be a string', () => {
        const parsedBody = getParsedBody('labels');
        const colorValue = parsedBody.color;
        expect(colorValue).to.be.a('string');
      });

      it('should have a length > 0', () => {
        const parsedBody = getParsedBody('labels');
        const colorValue = parsedBody.color;
        expect(colorValue).to.have.lengthOf.above(0);
      });

      it('should have a length of 6', () => {
        const parsedBody = getParsedBody('labels');
        const colorValue = parsedBody.color;
        expect(colorValue).to.have.lengthOf(6);
      });

      it('should be a valid hexadecimal color code without the leading hash', () => {
        const parsedBody = getParsedBody('labels');
        const hexColorCode = parsedBody.color;
        const hexColorCodeRegex = /^[0-9a-fA-F]{6}$/;
        expect(hexColorCode).to.match(hexColorCodeRegex);
      });
    });

    describe("a key called 'description' in the request body", () => {
      it('should exist', () => {
        const parsedBody = getParsedBody('labels');
        const descriptionExists = 'description' in parsedBody;
        expect(descriptionExists).to.be.true;
      });
    });

    describe("the value of key 'description'", () => {
      it('should be a string', () => {
        const parsedBody = getParsedBody('labels');
        const descriptionValue = parsedBody.description;
        expect(descriptionValue).to.be.a('string');
      });
    });
  });

  describe("with argument 'milestones'", () => {
    describe('the return value as a whole', () => {
      it('should not be null', () => {
        const body = composeHttpRequestBody('milestones');
        expect(body).to.not.be.a('null');
      });

      it('should be a string', () => {
        const body = composeHttpRequestBody('milestones');
        expect(body).to.be.a('string');
      });
    });

    describe("a key called 'title' in the request body", () => {
      it('should exist', () => {
        const parsedBody = getParsedBody('milestones');
        const titleExists = 'title' in parsedBody;
        expect(titleExists).to.be.true;
      });
    });

    describe("the value of key 'title'", () => {
      it('should be a string', () => {
        const parsedBody = getParsedBody('milestones');
        const titleValue = parsedBody.title;
        expect(titleValue).to.be.a('string');
      });

      it('should have a length > 0', () => {
        const parsedBody = getParsedBody('milestones');
        const titleValue = parsedBody.title;
        expect(titleValue).to.have.lengthOf.above(0);
      });
    });

    describe("a key called 'state' in the request body", () => {
      it('should exist', () => {
        const parsedBody = getParsedBody('milestones');
        const stateExists = 'state' in parsedBody;
        expect(stateExists).to.be.true;
      });
    });

    describe("the value of key 'state'", () => {
      it('should be a string', () => {
        const parsedBody = getParsedBody('milestones');
        const stateValue = parsedBody.state;
        expect(stateValue).to.be.a('string');
      });

      it('should have a length > 0', () => {
        const parsedBody = getParsedBody('milestones');
        const stateValue = parsedBody.state;
        expect(stateValue).to.have.lengthOf.above(0);
      });

      it('should have a length > 3', () => {
        const parsedBody = getParsedBody('milestones');
        const stateValue = parsedBody.state;
        expect(stateValue).to.have.lengthOf.above(3);
      });

      it('should have a length < 7', () => {
        const parsedBody = getParsedBody('milestones');
        const stateValue = parsedBody.state;
        expect(stateValue).to.have.lengthOf.below(7);
      });

      it("should be either either 'open' or 'closed'", () => {
        const parsedBody = getParsedBody('milestones');
        const stateValue = parsedBody.state;
        expect(stateValue).to.match(/^open$|^closed$/);
      });
    });

    describe("a key called 'description' in the request body", () => {
      it('should exist', () => {
        const parsedBody = getParsedBody('milestones');
        const descriptionExists = 'description' in parsedBody;
        expect(descriptionExists).to.be.true;
      });
    });

    describe("the value of key 'description'", () => {
      it('should be a string', () => {
        const parsedBody = getParsedBody('milestones');
        const descriptionValue = parsedBody.description;
        expect(descriptionValue).to.be.a('string');
      });
    });

    describe("a key called 'due_on' in the request body", () => {
      it('should exist', () => {
        const parsedBody = getParsedBody('milestones');
        const dueOnExists = 'due_on' in parsedBody;
        expect(dueOnExists).to.be.true;
      });
    });

    describe("the value of key 'due_on'", () => {
      it('should be a string', () => {
        const parsedBody = getParsedBody('milestones');
        const dueOnValue = parsedBody.due_on;
        expect(dueOnValue).to.be.a('string');
      });

      it('should be in ISO 8601 format: YYYY-MM-DDThh:mm:ssZ', () => {
        const parsedBody = getParsedBody('milestones');
        const dueOnValue = parsedBody.due_on;
        const datetimeRegex = /^([12]\d{3})-(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])T([01]\d|2[0-3]):([0-5]\d):([0-5]\d)Z$/;
        expect(dueOnValue).to.match(datetimeRegex);
      });
    });
  });
});
