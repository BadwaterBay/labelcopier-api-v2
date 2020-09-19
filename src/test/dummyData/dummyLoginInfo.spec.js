import { expect } from 'chai';
import sinon from 'sinon';

import {
  loadHomeRepoOwnerFromEnv,
  loadHomeRepoNameFromEnv,
  loadTokenFromEnv,
} from './dummyLoginInfo';
import * as loadDotEnv from './loadDotEnv';

describe('Test dummyLoginInfo', function () {
  describe('Test loadHomeRepoOwnerFromEnv', function () {
    describe('when .env file is absent', function () {
      it('should return its fallback value', function () {
        const stubEnvVars = {
          error: {},
        };

        const stubloadDotEnv = sinon.stub(loadDotEnv, 'default');
        stubloadDotEnv.returns(stubEnvVars);

        const output = loadHomeRepoOwnerFromEnv();
        const answerKey = 'home-repo-owner';
        expect(output).to.deep.equal(answerKey);

        stubloadDotEnv.restore();
      });
    });

    describe('when .env file is present', function () {
      it('should return the stubbed value', function () {
        const homeRepoOwner = 'dummy-home-repo-owner';

        const stubEnvVars = {
          parsed: {
            HOME_REPO_OWNER: homeRepoOwner,
          },
        };

        const stubloadDotEnv = sinon.stub(loadDotEnv, 'default');
        stubloadDotEnv.returns(stubEnvVars);

        const output = loadHomeRepoOwnerFromEnv();
        const answerKey = homeRepoOwner;
        expect(output).to.deep.equal(answerKey);

        stubloadDotEnv.restore();
      });
    });
  });

  describe('Test loadHomeRepoNameFromEnv', function () {
    describe('when .env file is absent', function () {
      it('should return its fallback value', function () {
        const stubEnvVars = {
          error: {},
        };

        const stubloadDotEnv = sinon.stub(loadDotEnv, 'default');
        stubloadDotEnv.returns(stubEnvVars);

        const output = loadHomeRepoNameFromEnv();
        const answerKey = 'home-repo-name';
        expect(output).to.deep.equal(answerKey);

        stubloadDotEnv.restore();
      });
    });

    describe('when .env file is present', function () {
      it('should return the stubbed value', function () {
        const homeRepoName = 'dummy-home-repo-name';

        const stubEnvVars = {
          parsed: {
            HOME_REPO_NAME: homeRepoName,
          },
        };

        const stubloadDotEnv = sinon.stub(loadDotEnv, 'default');
        stubloadDotEnv.returns(stubEnvVars);

        const output = loadHomeRepoNameFromEnv();
        const answerKey = homeRepoName;
        expect(output).to.deep.equal(answerKey);

        stubloadDotEnv.restore();
      });
    });
  });

  describe('Test loadTokenFromEnv', function () {
    describe('when .env file is absent', function () {
      it('should return its fallback value', function () {
        const stubEnvVars = {
          error: {},
        };

        const stubloadDotEnv = sinon.stub(loadDotEnv, 'default');
        stubloadDotEnv.returns(stubEnvVars);

        const output = loadTokenFromEnv();
        const answerKey = '';
        expect(output).to.deep.equal(answerKey);

        stubloadDotEnv.restore();
      });
    });

    describe('when .env file is present', function () {
      it('should return the stubbed value', function () {
        const token = 'abcdefghijkl';

        const stubEnvVars = {
          parsed: {
            LABELCOPIER_TOKEN: token,
          },
        };

        const stubloadDotEnv = sinon.stub(loadDotEnv, 'default');
        stubloadDotEnv.returns(stubEnvVars);

        const output = loadTokenFromEnv();
        const answerKey = token;
        expect(output).to.deep.equal(answerKey);

        stubloadDotEnv.restore();
      });
    });
  });
});
