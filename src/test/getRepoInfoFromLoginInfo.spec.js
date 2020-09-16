import { expect } from 'chai';

import { getRepoInfoFromLoginInfo } from '../core/getApiLoginInfo';
import {
  loadHomeRepoOwnerFromEnv,
  loadHomeRepoNameFromEnv,
  dummyLoginInfo,
} from './dummyData';

describe('Test getRepoInfoFromLoginInfo', () => {
  describe('with the first argument being loginInfo', () => {
    const loginInfo = dummyLoginInfo;

    const homeRepoOwner = loadHomeRepoOwnerFromEnv();
    const homeRepoName = loadHomeRepoNameFromEnv();

    const templateRepoOwner = 'template-repo-owner';
    const templateRepoName = 'template-repo-name';

    describe("with the second argument being 'owner'", () => {
      const ownerOrName = 'owner';

      describe("with the third argument being 'list'", () => {
        const mode = 'list';

        it('should be a string', () => {
          const output = getRepoInfoFromLoginInfo(loginInfo, ownerOrName, mode);
          expect(output).to.be.a('string');
        });

        it('should match the expected value', () => {
          const output = getRepoInfoFromLoginInfo(loginInfo, ownerOrName, mode);
          expect(output).to.deep.equal(homeRepoOwner);
        });
      });

      describe("with the third argument being 'copy'", () => {
        const mode = 'copy';

        it('should be a string', () => {
          const output = getRepoInfoFromLoginInfo(loginInfo, ownerOrName, mode);
          expect(output).to.be.a('string');
        });

        it('should match the expected value', () => {
          const output = getRepoInfoFromLoginInfo(loginInfo, ownerOrName, mode);
          expect(output).to.deep.equal(templateRepoOwner);
        });
      });
    });
    describe("with the second argument being 'owner'", () => {
      const ownerOrName = 'name';

      describe("with the third argument being 'list'", () => {
        const mode = 'list';

        it('should be a string', () => {
          const output = getRepoInfoFromLoginInfo(loginInfo, ownerOrName, mode);
          expect(output).to.be.a('string');
        });

        it('should match the expected value', () => {
          const output = getRepoInfoFromLoginInfo(loginInfo, ownerOrName, mode);
          expect(output).to.deep.equal(homeRepoName);
        });
      });

      describe("with the third argument being 'copy'", () => {
        const mode = 'copy';

        it('should be a string', () => {
          const output = getRepoInfoFromLoginInfo(loginInfo, ownerOrName, mode);
          expect(output).to.be.a('string');
        });

        it('should match the expected value', () => {
          const output = getRepoInfoFromLoginInfo(loginInfo, ownerOrName, mode);
          expect(output).to.deep.equal(templateRepoName);
        });
      });
    });
  });
});
