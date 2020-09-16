import { expect } from 'chai';
import sinon from 'sinon';

import { loadHomeRepoOwnerFromEnv, loadHomeRepoNameFromEnv } from './dummyData';
import * as loadEnvVarsModule from './loadEnvVars';

describe('Test loadHomeRepoOwnerFromEnv', () => {
  describe('When environmental variables are absent', () => {
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

    it('Expect fallback value to be returned', () => {
      const output = loadHomeRepoOwnerFromEnv();
      const answerKey = 'home-repo-owner';
      expect(output).to.deep.equal(answerKey);
    });
  });

  describe('When environmental variables are present', () => {
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

    it('Expect stub value to be returned', () => {
      const output = loadHomeRepoOwnerFromEnv();
      const answerKey = homeRepoOwner;
      expect(output).to.deep.equal(answerKey);
    });
  });
});

describe('Test loadHomeRepoNameFromEnv', () => {
  describe('When environmental variables are absent', () => {
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

    it('Expect fallback value to be returned', () => {
      const output = loadHomeRepoNameFromEnv();
      const answerKey = 'home-repo-name';
      expect(output).to.deep.equal(answerKey);
    });
  });

  describe('When environmental variables are present', () => {
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

    it('Expect stub value to be returned', () => {
      const output = loadHomeRepoNameFromEnv();
      const answerKey = homeRepoName;
      expect(output).to.deep.equal(answerKey);
    });
  });
});
