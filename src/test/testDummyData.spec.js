import { expect } from 'chai';
import sinon from 'sinon';

import { loadHomeRepoOwnerFromEnv, loadHomeRepoNameFromEnv } from './dummyData';
import * as loadEnvVarsModule from './loadEnvVars';

describe('Test loadHomeRepoOwnerFromEnv', () => {
  describe('when .env file is absent', () => {
    let stubLoadEnvVarsModule;

    before(() => {
      const stubEnvVars = {
        error: {},
      };

      stubLoadEnvVarsModule = sinon.stub(loadEnvVarsModule, 'default');
      stubLoadEnvVarsModule.returns(stubEnvVars);
    });

    after(() => {
      stubLoadEnvVarsModule.restore();
    });

    it('should return its fallback value', () => {
      const output = loadHomeRepoOwnerFromEnv();
      const answerKey = 'home-repo-owner';
      expect(output).to.deep.equal(answerKey);
    });
  });

  describe('when .env file is present', () => {
    let stubLoadEnvVarsModule;
    const homeRepoOwner = 'dummy-home-repo-owner';

    before(() => {
      const stubEnvVars = {
        parsed: {
          HOME_REPO_OWNER: homeRepoOwner,
        },
      };

      stubLoadEnvVarsModule = sinon.stub(loadEnvVarsModule, 'default');
      stubLoadEnvVarsModule.returns(stubEnvVars);
    });

    after(() => {
      stubLoadEnvVarsModule.restore();
    });

    it('should return the stubbed value', () => {
      const output = loadHomeRepoOwnerFromEnv();
      const answerKey = homeRepoOwner;
      expect(output).to.deep.equal(answerKey);
    });
  });
});

describe('Test loadHomeRepoNameFromEnv', () => {
  describe('when .env file is absent', () => {
    let stubLoadEnvVarsModule;

    before(() => {
      const stubEnvVars = {
        error: {},
      };

      stubLoadEnvVarsModule = sinon.stub(loadEnvVarsModule, 'default');
      stubLoadEnvVarsModule.returns(stubEnvVars);
    });

    after(() => {
      stubLoadEnvVarsModule.restore();
    });

    it('should return its fallback value', () => {
      const output = loadHomeRepoNameFromEnv();
      const answerKey = 'home-repo-name';
      expect(output).to.deep.equal(answerKey);
    });
  });

  describe('when .env file is present', () => {
    let stubLoadEnvVarsModule;
    const homeRepoName = 'dummy-home-repo-name';

    before(() => {
      const stubEnvVars = {
        parsed: {
          HOME_REPO_NAME: homeRepoName,
        },
      };

      stubLoadEnvVarsModule = sinon.stub(loadEnvVarsModule, 'default');
      stubLoadEnvVarsModule.returns(stubEnvVars);
    });

    after(() => {
      stubLoadEnvVarsModule.restore();
    });

    it('should return the stubbed value', () => {
      const output = loadHomeRepoNameFromEnv();
      const answerKey = homeRepoName;
      expect(output).to.deep.equal(answerKey);
    });
  });
});
