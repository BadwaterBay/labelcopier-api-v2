import { expect } from 'chai';

import { composeHttpRequestBody } from '../core/composeHttpRequestBody';

describe('Test composeHttpRequestBody', function () {
  const getParsedBody = (kind) => {
    const stringifiedBody = composeHttpRequestBody(kind);
    const parsedBody = JSON.parse(stringifiedBody);
    return parsedBody;
  };

  describe("with argument 'labels'", function () {
    describe('the return value as a whole', function () {
      const body = composeHttpRequestBody('labels');

      it('should not be null', function () {
        expect(body).to.not.be.a('null');
      });

      it('should be a string', function () {
        expect(body).to.be.a('string');
      });
    });

    describe('the parsed body', function () {
      const parsedBody = getParsedBody('labels');

      describe("a key called 'name' in the request body", function () {
        const keyNameExists = 'name' in parsedBody;

        it('should exist', function () {
          expect(keyNameExists).to.be.true;
        });
      });

      describe("the value of key 'name'", function () {
        const nameValue = parsedBody.name;

        it('should be a string', function () {
          expect(nameValue).to.be.a('string');
        });

        it('should have a length greater than 0', function () {
          expect(nameValue).to.have.lengthOf.above(0);
        });
      });

      describe("a key called 'color' in the request body", function () {
        const colorExists = 'color' in parsedBody;

        it('should exist', function () {
          expect(colorExists).to.be.true;
        });
      });

      describe("the value of key 'color'", function () {
        const hexColorCode = parsedBody.color;

        it('should be a string', function () {
          expect(hexColorCode).to.be.a('string');
        });

        it('should have a length > 0', function () {
          expect(hexColorCode).to.have.lengthOf.above(0);
        });

        it('should have a length of 6', function () {
          expect(hexColorCode).to.have.lengthOf(6);
        });

        it('should be a valid hexadecimal color code without the leading hash', function () {
          const hexColorCodeRegex = /^[0-9a-fA-F]{6}$/;
          expect(hexColorCode).to.match(hexColorCodeRegex);
        });
      });

      describe("a key called 'description' in the request body", function () {
        const descriptionExists = 'description' in parsedBody;

        it('should exist', function () {
          expect(descriptionExists).to.be.true;
        });
      });

      describe("the value of key 'description'", function () {
        const descriptionValue = parsedBody.description;

        it('should be a string', function () {
          expect(descriptionValue).to.be.a('string');
        });
      });
    });
  });

  describe("with argument 'milestones'", function () {
    describe('the return value as a whole', function () {
      const body = composeHttpRequestBody('milestones');

      it('should not be null', function () {
        expect(body).to.not.be.a('null');
      });

      it('should be a string', function () {
        expect(body).to.be.a('string');
      });
    });

    describe('the parsed body', function () {
      const parsedBody = getParsedBody('milestones');

      describe("a key called 'title' in the request body", function () {
        const titleExists = 'title' in parsedBody;

        it('should exist', function () {
          expect(titleExists).to.be.true;
        });
      });

      describe("the value of key 'title'", function () {
        const titleValue = parsedBody.title;

        it('should be a string', function () {
          expect(titleValue).to.be.a('string');
        });

        it('should have a length > 0', function () {
          expect(titleValue).to.have.lengthOf.above(0);
        });
      });

      describe("a key called 'state' in the request body", function () {
        const stateExists = 'state' in parsedBody;

        it('should exist', function () {
          expect(stateExists).to.be.true;
        });
      });

      describe("the value of key 'state'", function () {
        const stateValue = parsedBody.state;

        it('should be a string', function () {
          expect(stateValue).to.be.a('string');
        });

        it('should have a length > 0', function () {
          expect(stateValue).to.have.lengthOf.above(0);
        });

        it('should have a length of 4 or 6', function () {
          expect(stateValue).to.match(/^.{4}$|^.{6}$/);
        });

        it("should be either either 'open' or 'closed'", function () {
          expect(stateValue).to.match(/^open$|^closed$/);
        });
      });

      describe("a key called 'description' in the request body", function () {
        const descriptionExists = 'description' in parsedBody;

        it('should exist', function () {
          expect(descriptionExists).to.be.true;
        });
      });

      describe("the value of key 'description'", function () {
        const descriptionValue = parsedBody.description;

        it('should be a string', function () {
          expect(descriptionValue).to.be.a('string');
        });
      });

      describe("a key called 'due_on' in the request body", function () {
        const dueOnExists = 'due_on' in parsedBody;

        it('should exist', function () {
          expect(dueOnExists).to.be.true;
        });
      });

      describe("the value of key 'due_on'", function () {
        const dueOnValue = parsedBody.due_on;

        it('should be a string', function () {
          expect(dueOnValue).to.be.a('string');
        });

        it('should be in ISO 8601 format: YYYY-MM-DDThh:mm:ssZ', function () {
          const datetimeRegex = /^([12]\d{3})-(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])T([01]\d|2[0-3]):([0-5]\d):([0-5]\d)Z$/;

          expect(dueOnValue).to.match(datetimeRegex);
        });
      });
    });
  });
});
