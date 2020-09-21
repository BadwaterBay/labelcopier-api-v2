import nock from 'nock';

import { getBaseApiUri } from '../../core/httpRequests/httpRequestUriBuilder';
import { dummyLinkHeader } from '../dummyData/dummyLinkHeaderOfListingLabels';
import { dummyResponseBody } from '../dummyData/dummyResponseBodyOfListingLabels';

const getSuccessStatusCode = () => 200;
const getFailureStatusCode = () => 404;

export const buildResponseBodyFromDummyData = (dataSource, uri = '') => {
  // Example uri (a string):
  // 'https://api.github.com/repos/repo-owner/repo-name/labels?per_page=3&page=1'

  const { lastPageNum, data } = dataSource;

  const uriRegex = /\/(?<entryType>labels|milestones)\?per_page=(?<perPage>\d+)&page=(?<pageNum>\d+)/;
  const matched = uri.match(uriRegex);
  const noMatchesWereFound = matched === null;

  if (noMatchesWereFound) {
    return data.outOfRange;
  }

  const { pageNum } = matched.groups;
  const pageNumIsOutOfRange = pageNum > lastPageNum;

  if (pageNumIsOutOfRange) {
    return data.outOfRange;
  }

  return data[pageNum];
};

export const buildResponseBody = (dataSource, uri = '') =>
  buildResponseBodyFromDummyData(dataSource, uri);

export const buildLinkHeader = (dataSource, uri = '') =>
  buildResponseBodyFromDummyData(dataSource, uri);

export const buildResponseHeader = (uri) => ({
  link: buildLinkHeader(dummyLinkHeader, uri),
});

export const buildResponseForHttpGETOnSuccess = (uri) => {
  const statusCode = getSuccessStatusCode();
  const body = buildResponseBody(dummyResponseBody, uri);
  const header = buildResponseHeader(uri);

  return [statusCode, body, header];
};

const mockHttpServer = () => nock(getBaseApiUri());

export const mockHttpServerForGETOnSuccess = () =>
  mockHttpServer()
    .persist()
    .get(/.*/)
    .reply((uri) => buildResponseForHttpGETOnSuccess(uri));

export const mockHttpServerForGETOnFailure = () => {
  const statusCode = getFailureStatusCode();
  return mockHttpServer().get(/.*/).reply(statusCode);
};
