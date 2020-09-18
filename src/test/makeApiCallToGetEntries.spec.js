import { expect } from 'chai';
import nock from 'nock';

import { apiUriBase } from '../core/apiCallOptions';
import { makeApiCallToGetEntries } from '../core/apiCallToGet';
import { dummyLinkHeader } from './dummyLinkHeaderOfGettingLabels';
import {
  dummyResponseBodyAll,
  dummyResponseBody,
} from './dummyResponseBodyOfGettingLabels';

describe('Test makeApiCallToGetEntries', function () {
  describe('with a mock HTTP server', function () {
    before(function () {
      nock.disableNetConnect();
    });

    after(function () {
      nock.cleanAll();
      nock.enableNetConnect();
    });

    describe('when simulated with failed HTTP responses', function () {
      const statusCode = 404;

      beforeEach(function () {
        const mockHttpServer = nock(apiUriBase);
        mockHttpServer.get(/.*/).reply(statusCode);
      });

      it('should throw an error', async function () {
        try {
          await makeApiCallToGetEntries();
        } catch (errorReceived) {
          expect(errorReceived).to.be.an('error');
        }
      });

      it('should throw an error that has a status code of 404', async function () {
        try {
          await makeApiCallToGetEntries();
        } catch (errorReceived) {
          const errorStatusCode = errorReceived.status;
          expect(errorStatusCode).to.deep.equal(statusCode);
        }
      });
    });

    describe('when simulated with successful HTTP responses', function () {
      const uriRegex = /\/(?<kind>labels|milestones)\?per_page=(?<perPage>\d+)&page=(?<pageNum>\d+)/;

      const generateResponseBody = (uri) => {
        // Example uri (a string):
        // 'https://api.github.com/repos/repo-owner/repo-name/labels?per_page=3&page=1'

        const { lastPageNum, body } = dummyResponseBody;

        const matched = uri.match(uriRegex);

        if (matched === null) {
          return body.outOfRange;
        }

        const { pageNum } = matched.groups;
        const pageNumIsOutOfRange = pageNum > lastPageNum;

        if (pageNumIsOutOfRange) {
          return body.outOfRange;
        }

        return body[pageNum];
      };

      const generateLinkHeader = (uri) => {
        // Example uri (a string):
        // 'https://api.github.com/repos/repo-owner/repo-name/labels?per_page=3&page=1'

        const { lastPageNum, header } = dummyLinkHeader;

        const matched = uri.match(uriRegex);

        if (matched === null) {
          return header.outOfRange;
        }

        const { pageNum } = matched.groups;
        const pageNumIsOutOfRange = pageNum > lastPageNum;

        if (pageNumIsOutOfRange) {
          return header.outOfRange;
        }

        return header[pageNum];
      };

      const generateResponseHeader = (uri) => ({
        link: generateLinkHeader(uri),
      });

      const generateSuccessResponse = (uri) => {
        const statusCode = 200;
        const body = generateResponseBody(uri);
        const header = generateResponseHeader(uri);

        return [statusCode, body, header];
      };

      beforeEach(function () {
        const mockHttpServer = nock(apiUriBase);
        mockHttpServer
          .persist()
          .get(/.*/)
          .reply((uri) => generateSuccessResponse(uri));
      });

      it('should not throw an error', function () {
        expect(() => makeApiCallToGetEntries()).to.not.throw();
      });

      describe('the return value', function () {
        let responseBody;
        const kind = 'labels';
        const mode = 'list';
        const responseBodyAnswerKey = dummyResponseBodyAll;

        beforeEach(async function () {
          responseBody = await makeApiCallToGetEntries(kind, mode);
        });

        it('should be an array', async function () {
          expect(responseBody).to.be.an('array');
        });

        it('should matches the expected value', async function () {
          expect(responseBody).to.deep.equal(responseBodyAnswerKey);
        });
      });
    });
  });
});
