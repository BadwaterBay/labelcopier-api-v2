import nock from 'nock';

import { getBaseApiUri } from '../../core/httpRequests/httpRequestUriBuilder';

const getSuccessStatusCode = () => 201;

const getFailureStatusCode = () => 403;

export const buildResponseForSuccessfulPOST = (uri, requestBody) => {
  const parsedRequestBody = JSON.parse(requestBody);
  const { name, color, description } = parsedRequestBody;
  const id = 123456789;
  const nodeId = 'RHVtbXkgbm9kZSBpZA==';
  const url = 'https://api.github.com/repos';

  const body = {
    id,
    node_id: nodeId,
    url,
    name,
    description,
    color,
    default: true,
  };

  const statusCode = getSuccessStatusCode();

  return [statusCode, body];
};

const mockHttpServer = () => nock(getBaseApiUri());

export const mockHttpServerForPOSTOnSuccess = () =>
  mockHttpServer()
    .post(/.*/)
    .reply((uri, requestBody) => buildResponseForSuccessfulPOST(uri, requestBody));

export const mockHttpServerForPOSTOnFailure = () => {
  const statusCode = getFailureStatusCode();
  return mockHttpServer().post(/.*/).reply(statusCode);
};
