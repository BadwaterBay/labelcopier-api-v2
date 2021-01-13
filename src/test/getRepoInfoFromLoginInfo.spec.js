import { expect } from 'chai';

import { getRepoInfoFromLoginInfo } from '../core/loginInfo';
import {
  loadHomeRepoOwnerFromDotEnv,
  loadHomeRepoNameFromDotEnv,
  loadTemplateRepoOwnerFromDotEnv,
  loadTemplateRepoNameFromDotEnv,
} from './dummyData/dummyLoginInfo.setup.test';

describe('Test getRepoInfoFromLoginInfo', function () {
  let repoOwnerOrRepoName;
  let homeRepoOrTemplateRepo;
  let output;

  beforeEach(function () {
    output = getRepoInfoFromLoginInfo(repoOwnerOrRepoName, homeRepoOrTemplateRepo);
  });

  describe("with the first argument being 'owner'", function () {
    before(function () {
      repoOwnerOrRepoName = 'owner';
    });

    describe("with the second argument being 'home'", function () {
      before(function () {
        homeRepoOrTemplateRepo = 'home';
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
        homeRepoOrTemplateRepo = 'other';
      });

      it('should be a string', function () {
        expect(output).to.be.a('string');
      });

      it('should match the expected value', function () {
        const answerKey = loadTemplateRepoOwnerFromDotEnv();
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
        homeRepoOrTemplateRepo = 'home';
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
        homeRepoOrTemplateRepo = 'other';
      });

      it('should be a string', function () {
        expect(output).to.be.a('string');
      });

      it('should match the expected value', function () {
        const answerKey = loadTemplateRepoNameFromDotEnv();
        expect(output).to.deep.equal(answerKey);
      });
    });
  });
});
