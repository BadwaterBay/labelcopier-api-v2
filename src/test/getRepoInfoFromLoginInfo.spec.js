import { expect } from 'chai';

import { getRepoInfoFromLoginInfo } from '../core/loginInfo';
import {
  loadHomeRepoOwnerFromEnv,
  loadHomeRepoNameFromEnv,
  loadTemplateRepoOwnerFromEnv,
  loadTemplateRepoNameFromEnv,
} from './dummyData/dummyLoginInfo';

describe('Test getRepoInfoFromLoginInfo', function () {
  let ownerOrName;
  let homeOrTemplateRepo;
  let output;

  beforeEach(function () {
    output = getRepoInfoFromLoginInfo(ownerOrName, homeOrTemplateRepo);
  });

  afterEach(function () {
    output = undefined;
  });

  describe("with the first argument being 'owner'", function () {
    before(function () {
      ownerOrName = 'owner';
    });

    after(function () {
      ownerOrName = undefined;
    });

    describe("with the second argument being 'home'", function () {
      before(function () {
        homeOrTemplateRepo = 'home';
      });

      after(function () {
        homeOrTemplateRepo = undefined;
      });

      it('should be a string', function () {
        expect(output).to.be.a('string');
      });

      it('should match the expected value', function () {
        const answerKey = loadHomeRepoOwnerFromEnv();
        expect(output).to.deep.equal(answerKey);
      });
    });

    describe("with the second argument being 'template'", function () {
      before(function () {
        homeOrTemplateRepo = 'template';
      });

      after(function () {
        homeOrTemplateRepo = undefined;
      });

      it('should be a string', function () {
        expect(output).to.be.a('string');
      });

      it('should match the expected value', function () {
        const answerKey = loadTemplateRepoOwnerFromEnv();
        expect(output).to.deep.equal(answerKey);
      });
    });
  });

  describe("with the first argument being 'name'", function () {
    before(function () {
      ownerOrName = 'name';
    });

    describe("with the second argument being 'home'", function () {
      before(function () {
        homeOrTemplateRepo = 'home';
      });

      after(function () {
        homeOrTemplateRepo = undefined;
      });

      it('should be a string', function () {
        expect(output).to.be.a('string');
      });

      it('should match the expected value', function () {
        const answerKey = loadHomeRepoNameFromEnv();
        expect(output).to.deep.equal(answerKey);
      });
    });

    describe("with the second argument being 'template'", function () {
      before(function () {
        homeOrTemplateRepo = 'template';
      });

      it('should be a string', function () {
        expect(output).to.be.a('string');
      });

      it('should match the expected value', function () {
        const answerKey = loadTemplateRepoNameFromEnv();
        expect(output).to.deep.equal(answerKey);
      });
    });
  });
});
