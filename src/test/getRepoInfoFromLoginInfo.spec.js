import { expect } from 'chai';

import { getRepoInfoFromLoginInfo } from '../core/getApiLoginInfo';
import {
  loadHomeRepoOwnerFromEnv,
  loadHomeRepoNameFromEnv,
  dummyLoginInfo,
} from './dummyData';

describe('Test getRepoInfoFromLoginInfo', () => {
  const loginInfo = dummyLoginInfo;
  const homeRepoOwner = loadHomeRepoOwnerFromEnv();
  const homeRepoName = loadHomeRepoNameFromEnv();

  describe("Test with argument (loginInfo, 'list', 'owner')", () => {
    const mode = 'list';
    const ownerOrName = 'owner';

    it('Return value is a string', () => {
      const output = getRepoInfoFromLoginInfo(loginInfo, ownerOrName, mode);
      expect(output).to.be.a('string');
    });

    it('Return value matches expected value', () => {
      const output = getRepoInfoFromLoginInfo(loginInfo, ownerOrName, mode);
      expect(output).to.deep.equal(homeRepoOwner);
    });
  });

  describe("Test with argument (loginInfo, 'list', 'name')", () => {
    const mode = 'list';
    const ownerOrName = 'name';

    it('Return value is a string', () => {
      const output = getRepoInfoFromLoginInfo(loginInfo, ownerOrName, mode);
      expect(output).to.be.a('string');
    });

    it('Return value matches expected value', () => {
      const output = getRepoInfoFromLoginInfo(loginInfo, ownerOrName, mode);
      expect(output).to.deep.equal(homeRepoName);
    });
  });

  describe("Test with argument (loginInfo, 'copy', 'owner')", () => {
    const mode = 'copy';
    const ownerOrName = 'owner';

    it('Return value is a string', () => {
      const output = getRepoInfoFromLoginInfo(loginInfo, ownerOrName, mode);
      expect(output).to.be.a('string');
    });

    it('Return value matches expected value', () => {
      const output = getRepoInfoFromLoginInfo(loginInfo, ownerOrName, mode);
      expect(output).to.deep.equal('template-repo-owner');
    });
  });

  describe("Test with argument (loginInfo, 'copy', 'name')", () => {
    const mode = 'copy';
    const ownerOrName = 'name';

    it('Return value is a string', () => {
      const output = getRepoInfoFromLoginInfo(loginInfo, ownerOrName, mode);
      expect(output).to.be.a('string');
    });

    it('Return value matches expected value', () => {
      const output = getRepoInfoFromLoginInfo(loginInfo, ownerOrName, mode);
      expect(output).to.deep.equal('template-repo-name');
    });
  });
});
