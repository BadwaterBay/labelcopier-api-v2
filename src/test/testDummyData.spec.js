import { expect } from 'chai';
import sinon from 'sinon';

import { loadHomeRepoOwnerFromEnv, loadHomeRepoNameFromEnv } from './dummyData';
import * as loadEnvVars from './loadEnvVars';

describe('Test loadHomeRepoOwnerFromEnv', function () {
  describe('when .env file is absent', function () {
    let stubloadEnvVars;

    before(function () {
      const stubEnvVars = {
        error: {},
      };

      stubloadEnvVars = sinon.stub(loadEnvVars, 'default');
      stubloadEnvVars.returns(stubEnvVars);
    });

    after(function () {
      stubloadEnvVars.restore();
    });

    it('should return its fallback value', function () {
      const output = loadHomeRepoOwnerFromEnv();
      const answerKey = 'home-repo-owner';
      expect(output).to.deep.equal(answerKey);
    });
  });

  describe('when .env file is present', function () {
    let stubloadEnvVars;
    const homeRepoOwner = 'dummy-home-repo-owner';

    before(function () {
      const stubEnvVars = {
        parsed: {
          HOME_REPO_OWNER: homeRepoOwner,
        },
      };

      stubloadEnvVars = sinon.stub(loadEnvVars, 'default');
      stubloadEnvVars.returns(stubEnvVars);
    });

    after(function () {
      stubloadEnvVars.restore();
    });

    it('should return the stubbed value', function () {
      const output = loadHomeRepoOwnerFromEnv();
      const answerKey = homeRepoOwner;
      expect(output).to.deep.equal(answerKey);
    });
  });
});

describe('Test loadHomeRepoNameFromEnv', function () {
  describe('when .env file is absent', function () {
    let stubloadEnvVars;

    before(function () {
      const stubEnvVars = {
        error: {},
      };

      stubloadEnvVars = sinon.stub(loadEnvVars, 'default');
      stubloadEnvVars.returns(stubEnvVars);
    });

    after(function () {
      stubloadEnvVars.restore();
    });

    it('should return its fallback value', function () {
      const output = loadHomeRepoNameFromEnv();
      const answerKey = 'home-repo-name';
      expect(output).to.deep.equal(answerKey);
    });
  });

  describe('when .env file is present', function () {
    let stubloadEnvVars;
    const homeRepoName = 'dummy-home-repo-name';

    before(function () {
      const stubEnvVars = {
        parsed: {
          HOME_REPO_NAME: homeRepoName,
        },
      };

      stubloadEnvVars = sinon.stub(loadEnvVars, 'default');
      stubloadEnvVars.returns(stubEnvVars);
    });

    after(function () {
      stubloadEnvVars.restore();
    });

    it('should return the stubbed value', function () {
      const output = loadHomeRepoNameFromEnv();
      const answerKey = homeRepoName;
      expect(output).to.deep.equal(answerKey);
    });
  });
});
