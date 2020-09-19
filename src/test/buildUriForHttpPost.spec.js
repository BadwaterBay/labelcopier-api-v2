import { expect } from 'chai';

import { apiUriBaseRepos } from '../core/apiCallOptions';
import { buildUriForHttpPost } from '../core/apiCallToCreate';
import {
  loadHomeRepoOwnerFromEnv,
  loadHomeRepoNameFromEnv,
} from './dummyData/dummyLoginInfo';

describe('Test buildUriForHttpPost', function () {
  let kind;
  let uri;
  let answerKey;
  let homeRepoOwner;
  let homeRepoName;

  before(function () {
    homeRepoOwner = loadHomeRepoOwnerFromEnv();
    homeRepoName = loadHomeRepoNameFromEnv();
  });

  beforeEach(function () {
    uri = buildUriForHttpPost(kind);
    answerKey = `${apiUriBaseRepos}/${homeRepoOwner}/${homeRepoName}/${kind || 'labels'}`;
  });

  afterEach(function () {
    uri = undefined;
    answerKey = undefined;
  });

  describe('with no arguments specified', function () {
    before(function () {
      kind = undefined;
    });

    after(function () {
      kind = undefined;
    });

    describe('the return value', function () {
      it('should be a string', function () {
        expect(uri).to.be.a('string');
      });

      it('should have a length > 42', function () {
        expect(uri).to.have.lengthOf.above(42);
      });

      it('should match the expected value', function () {
        expect(uri).to.deep.equal(answerKey);
      });
    });
  });

  describe("with argument 'labels'", function () {
    before(function () {
      kind = 'labels';
    });

    after(function () {
      kind = undefined;
    });

    describe('the return value', function () {
      it('should match the expected value', function () {
        expect(uri).to.deep.equal(answerKey);
      });
    });
  });

  describe("with argument 'milestones'", function () {
    before(function () {
      kind = 'milestones';
    });

    describe('the return value', function () {
      it('should match the expected value', function () {
        expect(uri).to.deep.equal(answerKey);
      });
    });
  });
});
