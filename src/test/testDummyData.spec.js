import { expect } from 'chai';
import sinon from 'sinon';

import { loadHomeRepoOwnerFromEnv, loadHomeRepoNameFromEnv } from './dummyData';
import * as loadEnvVarsModule from './loadEnvVars';

suite('Test loadHomeRepoOwnerFromEnv', () => {
  suite('When environmental variables are absent', () => {
    let stubLoadEnvVarsModule;

    suiteSetup(() => {
      const stubEnvVars = {
        error: {},
      };

      stubLoadEnvVarsModule = sinon.stub(loadEnvVarsModule, 'default');
      stubLoadEnvVarsModule.returns(stubEnvVars);
    });

    suiteTeardown(() => {
      stubLoadEnvVarsModule.restore();
    });

    test('Expect fallback value to be returned', () => {
      const output = loadHomeRepoOwnerFromEnv();
      const answerKey = 'home-repo-owner';
      expect(output).to.deep.equal(answerKey);
    });
  });

  suite('When environmental variables are present', () => {
    let stubLoadEnvVarsModule;
    const homeRepoOwner = 'dummy-home-repo-owner';

    suiteSetup(() => {
      const stubEnvVars = {
        parsed: {
          HOME_REPO_OWNER: homeRepoOwner,
        },
      };

      stubLoadEnvVarsModule = sinon.stub(loadEnvVarsModule, 'default');
      stubLoadEnvVarsModule.returns(stubEnvVars);
    });

    suiteTeardown(() => {
      stubLoadEnvVarsModule.restore();
    });

    test('Expect stub value to be returned', () => {
      const output = loadHomeRepoOwnerFromEnv();
      const answerKey = homeRepoOwner;
      expect(output).to.deep.equal(answerKey);
    });
  });
});

suite('Test loadHomeRepoNameFromEnv', () => {
  suite('When environmental variables are absent', () => {
    let stubLoadEnvVarsModule;

    suiteSetup(() => {
      const stubEnvVars = {
        error: {},
      };

      stubLoadEnvVarsModule = sinon.stub(loadEnvVarsModule, 'default');
      stubLoadEnvVarsModule.returns(stubEnvVars);
    });

    suiteTeardown(() => {
      stubLoadEnvVarsModule.restore();
    });

    test('Expect fallback value to be returned', () => {
      const output = loadHomeRepoNameFromEnv();
      const answerKey = 'home-repo-name';
      expect(output).to.deep.equal(answerKey);
    });
  });

  suite('When environmental variables are present', () => {
    let stubLoadEnvVarsModule;
    const homeRepoName = 'dummy-home-repo-name';

    suiteSetup(() => {
      const stubEnvVars = {
        parsed: {
          HOME_REPO_NAME: homeRepoName,
        },
      };

      stubLoadEnvVarsModule = sinon.stub(loadEnvVarsModule, 'default');
      stubLoadEnvVarsModule.returns(stubEnvVars);
    });

    suiteTeardown(() => {
      stubLoadEnvVarsModule.restore();
    });

    test('Expect stub value to be returned', () => {
      const output = loadHomeRepoNameFromEnv();
      const answerKey = homeRepoName;
      expect(output).to.deep.equal(answerKey);
    });
  });
});
