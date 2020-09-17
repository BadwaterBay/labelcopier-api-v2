import { expect } from 'chai';

import { getRepoInfoFromLoginInfo } from '../core/getApiLoginInfo';
import {
  loadHomeRepoOwnerFromEnv,
  loadHomeRepoNameFromEnv,
  dummyLoginInfo,
} from './dummyData';

describe('Test getRepoInfoFromLoginInfo', function () {
  describe('with the first argument being loginInfo', function () {
    const loginInfo = dummyLoginInfo;

    const homeRepoOwner = loadHomeRepoOwnerFromEnv();
    const homeRepoName = loadHomeRepoNameFromEnv();
    const templateRepoOwner = 'template-repo-owner';
    const templateRepoName = 'template-repo-name';

    describe("with the second argument being 'owner'", function () {
      const ownerOrName = 'owner';

      describe("with the third argument being 'list'", function () {
        const mode = 'list';
        const output = getRepoInfoFromLoginInfo(loginInfo, ownerOrName, mode);

        it('should be a string', function () {
          expect(output).to.be.a('string');
        });

        it('should match the expected value', function () {
          expect(output).to.deep.equal(homeRepoOwner);
        });
      });

      describe("with the third argument being 'copy'", function () {
        const mode = 'copy';
        const output = getRepoInfoFromLoginInfo(loginInfo, ownerOrName, mode);

        it('should be a string', function () {
          expect(output).to.be.a('string');
        });

        it('should match the expected value', function () {
          expect(output).to.deep.equal(templateRepoOwner);
        });
      });
    });

    describe("with the second argument being 'owner'", function () {
      const ownerOrName = 'name';

      describe("with the third argument being 'list'", function () {
        const mode = 'list';
        const output = getRepoInfoFromLoginInfo(loginInfo, ownerOrName, mode);

        it('should be a string', function () {
          expect(output).to.be.a('string');
        });

        it('should match the expected value', function () {
          expect(output).to.deep.equal(homeRepoName);
        });
      });

      describe("with the third argument being 'copy'", function () {
        const mode = 'copy';
        const output = getRepoInfoFromLoginInfo(loginInfo, ownerOrName, mode);

        it('should be a string', function () {
          expect(output).to.be.a('string');
        });

        it('should match the expected value', function () {
          expect(output).to.deep.equal(templateRepoName);
        });
      });
    });
  });
});
