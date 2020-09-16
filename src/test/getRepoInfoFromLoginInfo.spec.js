import { expect } from 'chai';

import { getRepoInfoFromLoginInfo } from '../core/getApiLoginInfo';
import {
  loadHomeRepoOwnerFromEnv,
  loadHomeRepoNameFromEnv,
  dummyLoginInfo,
} from './dummyData';

suite('Test getRepoInfoFromLoginInfo', () => {
  const loginInfo = dummyLoginInfo;
  const homeRepoOwner = loadHomeRepoOwnerFromEnv();
  const homeRepoName = loadHomeRepoNameFromEnv();

  suite("Test with argument (loginInfo, 'list', 'owner')", () => {
    const mode = 'list';
    const ownerOrName = 'owner';

    test('Return value is a string', () => {
      const output = getRepoInfoFromLoginInfo(loginInfo, ownerOrName, mode);
      expect(output).to.be.a('string');
    });

    test('Return value matches expected value', () => {
      const output = getRepoInfoFromLoginInfo(loginInfo, ownerOrName, mode);
      expect(output).to.deep.equal(homeRepoOwner);
    });
  });

  suite("Test with argument (loginInfo, 'list', 'name')", () => {
    const mode = 'list';
    const ownerOrName = 'name';

    test('Return value is a string', () => {
      const output = getRepoInfoFromLoginInfo(loginInfo, ownerOrName, mode);
      expect(output).to.be.a('string');
    });

    test('Return value matches expected value', () => {
      const output = getRepoInfoFromLoginInfo(loginInfo, ownerOrName, mode);
      expect(output).to.deep.equal(homeRepoName);
    });
  });

  suite("Test with argument (loginInfo, 'copy', 'owner')", () => {
    const mode = 'copy';
    const ownerOrName = 'owner';

    test('Return value is a string', () => {
      const output = getRepoInfoFromLoginInfo(loginInfo, ownerOrName, mode);
      expect(output).to.be.a('string');
    });

    test('Return value matches expected value', () => {
      const output = getRepoInfoFromLoginInfo(loginInfo, ownerOrName, mode);
      expect(output).to.deep.equal('template-repo-owner');
    });
  });

  suite("Test with argument (loginInfo, 'copy', 'name')", () => {
    const mode = 'copy';
    const ownerOrName = 'name';

    test('Return value is a string', () => {
      const output = getRepoInfoFromLoginInfo(loginInfo, ownerOrName, mode);
      expect(output).to.be.a('string');
    });

    test('Return value matches expected value', () => {
      const output = getRepoInfoFromLoginInfo(loginInfo, ownerOrName, mode);
      expect(output).to.deep.equal('template-repo-name');
    });
  });
});
