import { expect } from 'chai';

import { buildHttpRequestBody } from '../../../../core/apiCalls/httpRequests/httpRequestBodyBuilder';
import { getDummyLoginInfo } from '../../../dummyData/dummyLoginInfo.setup.test';
import { getDummyNewLabel } from '../../../dummyData/dummyLabel.setup.test';
import { getDummyNewMilestone } from '../../../dummyData/dummyMilestone.setup.test';

describe('Test buildHttpRequestBody', function () {
  let loginInfo;

  before(function () {
    loginInfo = getDummyLoginInfo();
  });

  describe("with entryType being 'labels'", function () {
    let dummyLabel;
    let body;

    before(function () {
      dummyLabel = getDummyNewLabel();
      body = buildHttpRequestBody(loginInfo, 'labels', dummyLabel);
    });

    describe('the return value', function () {
      it('should not be null', function () {
        expect(body).to.not.be.null;
      });

      it('should not be stringified', function () {
        expect(body).to.not.be.a('string');
      });
    });

    describe("in the key-value pair whose key is 'name'", function () {
      it('the key should exist', function () {
        const keyExists = 'name' in body;
        expect(keyExists).to.be.true;
      });

      describe('the value', function () {
        let nameValue;

        before(function () {
          nameValue = body.name;
        });

        it('should be a string', function () {
          expect(nameValue).to.be.a('string');
        });

        it('should have a length greater than 0', function () {
          expect(nameValue).to.have.lengthOf.above(0);
        });
      });
    });

    describe("in the key-value pair whose key is 'color'", function () {
      it('the key should exist', function () {
        const keyExists = 'color' in body;
        expect(keyExists).to.be.true;
      });

      describe('the value', function () {
        let hexColorCode;

        before(function () {
          hexColorCode = body.color;
        });

        it('should be a string', function () {
          expect(hexColorCode).to.be.a('string');
        });

        it('should be a valid hexadecimal color code without the leading hash', function () {
          const hexColorCodeRegex = /^[0-9a-fA-F]{6}$/;
          expect(hexColorCode).to.match(hexColorCodeRegex);
        });
      });
    });

    describe("in the key-value pair whose key is 'description'", function () {
      it('the key should exist', function () {
        const keyExists = 'description' in body;
        expect(keyExists).to.be.true;
      });

      it('the value should be a string', function () {
        const descriptionValue = body.description;
        expect(descriptionValue).to.be.a('string');
      });
    });
  });

  describe("with argument 'milestones'", function () {
    let dummyMilestone;
    let body;

    before(function () {
      dummyMilestone = getDummyNewMilestone();
      body = buildHttpRequestBody(loginInfo, 'milestones', dummyMilestone);
    });

    describe('the return value', function () {
      it('should not be null', function () {
        expect(body).to.not.be.null;
      });

      it('should not be stringified', function () {
        expect(body).to.not.be.a('string');
      });
    });

    describe("a key-value pair whose key is 'title'", function () {
      it('the key should exist', function () {
        const keyExists = 'title' in body;
        expect(keyExists).to.be.true;
      });

      describe('the value', function () {
        let titleValue;

        before(function () {
          titleValue = body.title;
        });

        it('should be a string', function () {
          expect(titleValue).to.be.a('string');
        });

        it('should have a length > 0', function () {
          expect(titleValue).to.have.lengthOf.above(0);
        });
      });
    });

    describe("a key-value pair whose key is 'state'", function () {
      it('the key exist', function () {
        const keyExists = 'state' in body;
        expect(keyExists).to.be.true;
      });

      describe('the value', function () {
        let stateValue;

        before(function () {
          stateValue = body.state;
        });

        it('should be a string', function () {
          expect(stateValue).to.be.a('string');
        });

        it("should be either either 'open' or 'closed'", function () {
          expect(stateValue).to.match(/^open$|^closed$/);
        });
      });
    });

    describe("a key-value pair whose key is 'description'", function () {
      it('the key should exist', function () {
        const keyExists = 'description' in body;
        expect(keyExists).to.be.true;
      });

      it('the value should be a string', function () {
        const descriptionValue = body.description;
        expect(descriptionValue).to.be.a('string');
      });
    });

    describe("a key-value pair whose key is 'due_on'", function () {
      it('the key should exist', function () {
        const keyExists = 'due_on' in body;
        expect(keyExists).to.be.true;
      });

      describe('the value', function () {
        let dueOnValue;

        before(function () {
          dueOnValue = body.due_on;
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
