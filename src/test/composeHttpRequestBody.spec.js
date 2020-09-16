import { expect } from 'chai';

import { composeHttpRequestBody } from '../core/composeHttpRequestBody';

const getParsedBody = (kind) => {
  const stringifiedBody = composeHttpRequestBody(kind);
  const parsedBody = JSON.parse(stringifiedBody);
  return parsedBody;
};

suite('Test composeHttpRequestBody with labels', () => {
  suite('Test return value as a whole', () => {
    test('Returns a non-null value', () => {
      const body = composeHttpRequestBody('labels');
      expect(body).to.not.be.a('null');
    });

    test('Returns a string', () => {
      const body = composeHttpRequestBody('labels');
      expect(body).to.be.a('string');
    });
  });

  suite("Test key 'name' in the request body", () => {
    test("'name' exists in request body", () => {
      const parsedBody = getParsedBody('labels');
      const keyNameExists = 'name' in parsedBody;
      expect(keyNameExists).to.be.true;
    });

    test("The value of 'name' is a string", () => {
      const parsedBody = getParsedBody('labels');
      const nameValue = parsedBody.name;
      expect(nameValue).to.be.a('string');
    });

    test("The value of 'name' has a length greater than 0", () => {
      const parsedBody = getParsedBody('labels');
      const nameValue = parsedBody.name;
      expect(nameValue).to.have.lengthOf.above(0);
    });
  });

  suite("Test key 'color' in the request body", () => {
    test("Key 'color' exists in request body", () => {
      const parsedBody = getParsedBody('labels');
      const colorExists = 'color' in parsedBody;
      expect(colorExists).to.be.true;
    });

    test("The value of key 'color' is a string", () => {
      const parsedBody = getParsedBody('labels');
      const colorValue = parsedBody.color;
      expect(colorValue).to.be.a('string');
    });

    test("The value of 'color' has a length greater than 0", () => {
      const parsedBody = getParsedBody('labels');
      const colorValue = parsedBody.color;
      expect(colorValue).to.have.lengthOf.above(0);
    });

    test("The value of 'color' has a length of 6", () => {
      const parsedBody = getParsedBody('labels');
      const colorValue = parsedBody.color;
      expect(colorValue).to.have.lengthOf(6);
    });

    test("The value of 'color' is a valid hexadecimal color code without the leading hash", () => {
      const parsedBody = getParsedBody('labels');
      const colorValue = parsedBody.color;
      expect(colorValue).to.match(/^[0-9a-fA-F]{6}$/);
    });
  });

  suite("Test key 'description' in the request body", () => {
    test("Key 'description' exists in request body", () => {
      const parsedBody = getParsedBody('labels');
      const descriptionExists = 'description' in parsedBody;
      expect(descriptionExists).to.be.true;
    });

    test("The value of key 'description' is a string", () => {
      const parsedBody = getParsedBody('labels');
      const descriptionValue = parsedBody.description;
      expect(descriptionValue).to.be.a('string');
    });
  });
});

suite('Test composeHttpRequestBody with milestones', () => {
  suite('Test return value as a whole', () => {
    test('Returns a non-null value', () => {
      const body = composeHttpRequestBody('milestones');
      expect(body).to.not.be.a('null');
    });

    test('Returns a string', () => {
      const body = composeHttpRequestBody('milestones');
      expect(body).to.be.a('string');
    });
  });

  suite("Test key 'title' in the request body", () => {
    test("'title' exists in request body", () => {
      const parsedBody = getParsedBody('milestones');
      const titleExists = 'title' in parsedBody;
      expect(titleExists).to.be.true;
    });

    test("The value of 'title' is a string", () => {
      const parsedBody = getParsedBody('milestones');
      const titleValue = parsedBody.title;
      expect(titleValue).to.be.a('string');
    });

    test("The value of 'title' has a length greater than 0", () => {
      const parsedBody = getParsedBody('milestones');
      const titleValue = parsedBody.title;
      expect(titleValue).to.have.lengthOf.above(0);
    });
  });

  suite("Test key 'state' in the request body", () => {
    test("Key 'state' exists in request body", () => {
      const parsedBody = getParsedBody('milestones');
      const stateExists = 'state' in parsedBody;
      expect(stateExists).to.be.true;
    });

    test("The value of key 'state' is a string", () => {
      const parsedBody = getParsedBody('milestones');
      const stateValue = parsedBody.state;
      expect(stateValue).to.be.a('string');
    });

    test("The value of 'state' has a length greater than 0", () => {
      const parsedBody = getParsedBody('milestones');
      const stateValue = parsedBody.state;
      expect(stateValue).to.have.lengthOf.above(0);
    });

    test("The value of 'state' has a length greater than 3", () => {
      const parsedBody = getParsedBody('milestones');
      const stateValue = parsedBody.state;
      expect(stateValue).to.have.lengthOf.above(3);
    });

    test("The value of 'state' has a length less than 7", () => {
      const parsedBody = getParsedBody('milestones');
      const stateValue = parsedBody.state;
      expect(stateValue).to.have.lengthOf.below(7);
    });

    test("The value of 'state' is either 'open' or 'closed'", () => {
      const parsedBody = getParsedBody('milestones');
      const stateValue = parsedBody.state;
      expect(stateValue).to.match(/^open$|^closed$/);
    });
  });

  suite("Test key 'description' in the request body", () => {
    test("Key 'description' exists in request body", () => {
      const parsedBody = getParsedBody('milestones');
      const descriptionExists = 'description' in parsedBody;
      expect(descriptionExists).to.be.true;
    });

    test("The value of key 'description' is a string", () => {
      const parsedBody = getParsedBody('milestones');
      const descriptionValue = parsedBody.description;
      expect(descriptionValue).to.be.a('string');
    });
  });

  suite("Test key 'due_on' in the request body", () => {
    test("Key 'due_on' exists in request body", () => {
      const parsedBody = getParsedBody('milestones');
      const dueOnExists = 'due_on' in parsedBody;
      expect(dueOnExists).to.be.true;
    });

    test("The value of key 'due_on' is a string", () => {
      const parsedBody = getParsedBody('milestones');
      const dueOnValue = parsedBody.due_on;
      expect(dueOnValue).to.be.a('string');
    });

    test("The value of key 'due_on' is in ISO 8601 format: YYYY-MM-DDThh:mm:ssZ", () => {
      const parsedBody = getParsedBody('milestones');
      const dueOnValue = parsedBody.due_on;
      const datetimeRegex = /^([12]\d{3})-(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])T([01]\d|2[0-3]):([0-5]\d):([0-5]\d)Z$/;
      expect(dueOnValue).to.match(datetimeRegex);
    });
  });
});
