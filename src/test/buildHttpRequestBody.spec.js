import { expect } from 'chai';

import { buildHttpRequestBody } from '../core/httpRequestBodyBuilder';

describe('Test buildHttpRequestBody', function () {
  const getParsedBody = (kind) => {
    const stringifiedBody = buildHttpRequestBody(kind);
    return JSON.parse(stringifiedBody);
  };

  describe("with argument 'labels'", function () {
    describe('the return value as a whole', function () {
      let body;

      before(function () {
        body = buildHttpRequestBody('labels');
      });

      it('should not be null', function () {
        expect(body).to.not.be.a('null');
      });

      it('should be a string', function () {
        expect(body).to.be.a('string');
      });
    });

    describe('the parsed body', function () {
      let parsedBody;

      before(function () {
        parsedBody = getParsedBody('labels');
      });

      describe("a key called 'name' in the request body", function () {
        it('should exist', function () {
          const keyNameExists = 'name' in parsedBody;
          expect(keyNameExists).to.be.true;
        });
      });

      describe("the value of key 'name'", function () {
        let nameValue;

        before(function () {
          nameValue = parsedBody.name;
        });

        it('should be a string', function () {
          expect(nameValue).to.be.a('string');
        });

        it('should have a length greater than 0', function () {
          expect(nameValue).to.have.lengthOf.above(0);
        });
      });

      describe("a key called 'color' in the request body", function () {
        it('should exist', function () {
          const colorExists = 'color' in parsedBody;
          expect(colorExists).to.be.true;
        });
      });

      describe("the value of key 'color'", function () {
        let hexColorCode;

        before(function () {
          hexColorCode = parsedBody.color;
        });

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
        it('should exist', function () {
          const descriptionExists = 'description' in parsedBody;
          expect(descriptionExists).to.be.true;
        });
      });

      describe("the value of key 'description'", function () {
        it('should be a string', function () {
          const descriptionValue = parsedBody.description;
          expect(descriptionValue).to.be.a('string');
        });
      });
    });
  });

  describe("with argument 'milestones'", function () {
    describe('the return value as a whole', function () {
      let body;

      before(function () {
        body = buildHttpRequestBody('milestones');
      });

      it('should not be null', function () {
        expect(body).to.not.be.a('null');
      });

      it('should be a string', function () {
        expect(body).to.be.a('string');
      });
    });

    describe('the parsed body', function () {
      let parsedBody;

      before(function () {
        parsedBody = getParsedBody('milestones');
      });

      describe("a key called 'title' in the request body", function () {
        it('should exist', function () {
          const titleExists = 'title' in parsedBody;
          expect(titleExists).to.be.true;
        });
      });

      describe("the value of key 'title'", function () {
        let titleValue;

        before(function () {
          titleValue = parsedBody.title;
        });

        it('should be a string', function () {
          expect(titleValue).to.be.a('string');
        });

        it('should have a length > 0', function () {
          expect(titleValue).to.have.lengthOf.above(0);
        });
      });

      describe("a key called 'state' in the request body", function () {
        it('should exist', function () {
          const stateExists = 'state' in parsedBody;
          expect(stateExists).to.be.true;
        });
      });

      describe("the value of key 'state'", function () {
        let stateValue;

        before(function () {
          stateValue = parsedBody.state;
        });

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
        it('should exist', function () {
          const descriptionExists = 'description' in parsedBody;
          expect(descriptionExists).to.be.true;
        });
      });

      describe("the value of key 'description'", function () {
        it('should be a string', function () {
          const descriptionValue = parsedBody.description;
          expect(descriptionValue).to.be.a('string');
        });
      });

      describe("a key called 'due_on' in the request body", function () {
        it('should exist', function () {
          const dueOnExists = 'due_on' in parsedBody;
          expect(dueOnExists).to.be.true;
        });
      });

      describe("the value of key 'due_on'", function () {
        let dueOnValue;

        before(function () {
          dueOnValue = parsedBody.due_on;
        });

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
