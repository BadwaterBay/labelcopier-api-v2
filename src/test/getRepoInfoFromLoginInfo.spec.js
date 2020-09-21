import { expect } from 'chai';

import { getRepoInfoFromLoginInfo } from '../core/loginInfo';
import {
  loadHomeRepoOwnerFromDotEnv,
  loadHomeRepoNameFromDotEnv,
  loadOtherRepoOwnerFromDotEnv,
  loadOtherRepoNameFromDotEnv,
} from './dummyData/dummyLoginInfo';

describe('Test getRepoInfoFromLoginInfo', function () {
  let repoOwnerOrRepoName;
  let homeRepoOrOtherRepo;
  let output;

  beforeEach(function () {
    output = getRepoInfoFromLoginInfo(repoOwnerOrRepoName, homeRepoOrOtherRepo);
  });

  describe("with the first argument being 'owner'", function () {
    before(function () {
      repoOwnerOrRepoName = 'owner';
    });

    describe("with the second argument being 'home'", function () {
      before(function () {
        homeRepoOrOtherRepo = 'home';
      });

      it('should be a string', function () {
        expect(output).to.be.a('string');
      });

      it('should match the expected value', function () {
        const answerKey = loadHomeRepoOwnerFromDotEnv();
        expect(output).to.deep.equal(answerKey);
      });
    });

    describe("with the second argument being 'other'", function () {
      before(function () {
        homeRepoOrOtherRepo = 'other';
      });

      it('should be a string', function () {
        expect(output).to.be.a('string');
      });

      it('should match the expected value', function () {
        const answerKey = loadOtherRepoOwnerFromDotEnv();
        expect(output).to.deep.equal(answerKey);
      });
    });
  });

  describe("with the first argument being 'name'", function () {
    before(function () {
      repoOwnerOrRepoName = 'name';
    });

    describe("with the second argument being 'home'", function () {
      before(function () {
        homeRepoOrOtherRepo = 'home';
      });

      it('should be a string', function () {
        expect(output).to.be.a('string');
      });

      it('should match the expected value', function () {
        const answerKey = loadHomeRepoNameFromDotEnv();
        expect(output).to.deep.equal(answerKey);
      });
    });

    describe("with the second argument being 'other'", function () {
      before(function () {
        homeRepoOrOtherRepo = 'other';
      });

      it('should be a string', function () {
        expect(output).to.be.a('string');
      });

      it('should match the expected value', function () {
        const answerKey = loadOtherRepoNameFromDotEnv();
        expect(output).to.deep.equal(answerKey);
      });
    });
  });
});
