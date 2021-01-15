import mockHttpServer from './mockHttpServerInitiation.setup.test';

import { dummyLinkHeader } from '../dummyData/dummyLinkHeaderOfListingLabels.setup.test';
import { dummyResponseBody } from '../dummyData/dummyResponseBodyOfListingLabels.setup.test';

const getSuccessStatusCode = () => 200;

const getFailureStatusCode = () => 404;

export const buildResponseBodyFromDummyData = (dataSource, uri = '') => {
  // Example uri (a string):
  // 'https://api.github.com/repos/repo-owner/repo-name/labels?per_page=3&page=1'

  const { data, lastPageNum } = dataSource;

  const uriRegex = /\/(?<entryType>labels|milestones)\?per_page=(?<perPage>\d+)&page=(?<pageNum>\d+)/;
  const matched = uri.match(uriRegex);
  const noMatchesWereFound = matched === null;

  if (noMatchesWereFound) return data.outOfRange;

  const { pageNum } = matched.groups;
  const pageNumIsOutOfRange = pageNum > lastPageNum;

  if (pageNumIsOutOfRange) return data.outOfRange;

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

export const mockHttpServerForListingOnSuccess = () =>
  mockHttpServer()
    .persist()
    .get(/.*/)
    .reply((uri) => buildResponseForHttpGETOnSuccess(uri));

export const mockHttpServerForListingOnFailure = () => {
  const statusCode = getFailureStatusCode();
  return mockHttpServer().get(/.*/).reply(statusCode);
};
