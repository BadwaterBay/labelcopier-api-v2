import { expect } from 'chai';

import { getRepoInfoFromLoginInfo } from '../core/loginInfo';
import {
  loadHomeRepoOwnerFromEnv,
  loadHomeRepoNameFromEnv,
  dummyLoginInfo,
} from './dummyData/dummyLoginInfo';

describe('Test getRepoInfoFromLoginInfo', function () {
  describe('with the first argument being loginInfo', function () {
    const loginInfo = dummyLoginInfo;

    describe("with the second argument being 'owner'", function () {
      const ownerOrName = 'owner';

      describe("with the third argument being 'list'", function () {
        const mode = 'list';
        let homeRepoOwner;

        before(function () {
          homeRepoOwner = getRepoInfoFromLoginInfo(loginInfo, ownerOrName, mode);
        });

        it('should be a string', function () {
          expect(homeRepoOwner).to.be.a('string');
        });

        it('should match the expected value', function () {
          const answerKey = loadHomeRepoOwnerFromEnv();
          expect(homeRepoOwner).to.deep.equal(answerKey);
        });
      });

      describe("with the third argument being 'copy'", function () {
        const mode = 'copy';
        let templateRepoOwner;

        before(function () {
          templateRepoOwner = getRepoInfoFromLoginInfo(loginInfo, ownerOrName, mode);
        });

        it('should be a string', function () {
          expect(templateRepoOwner).to.be.a('string');
        });

        it('should match the expected value', function () {
          const answerKey = 'template-repo-owner';
          expect(templateRepoOwner).to.deep.equal(answerKey);
        });
      });
    });

    describe("with the second argument being 'name'", function () {
      const ownerOrName = 'name';

      describe("with the third argument being 'list'", function () {
        const mode = 'list';
        let homeRepoName;

        before(function () {
          homeRepoName = getRepoInfoFromLoginInfo(loginInfo, ownerOrName, mode);
        });

        it('should be a string', function () {
          expect(homeRepoName).to.be.a('string');
        });

        it('should match the expected value', function () {
          const answerKey = loadHomeRepoNameFromEnv();
          expect(homeRepoName).to.deep.equal(answerKey);
        });
      });

      describe("with the third argument being 'copy'", function () {
        const mode = 'copy';
        let templateRepoName;

        before(function () {
          templateRepoName = getRepoInfoFromLoginInfo(loginInfo, ownerOrName, mode);
        });

        it('should be a string', function () {
          expect(templateRepoName).to.be.a('string');
        });

        it('should match the expected value', function () {
          const answerKey = 'template-repo-name';
          expect(templateRepoName).to.deep.equal(answerKey);
        });
      });
    });
  });
});
