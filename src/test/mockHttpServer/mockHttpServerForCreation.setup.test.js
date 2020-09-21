import mockHttpServer from './mockHttpServerInitiation.setup.test';

const getSuccessStatusCode = () => 201;

const getFailureStatusCode = () => 403;

export const buildResponseForPOSTOnSuccess = (uri, requestBody) => {
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

export const mockHttpServerForCreationOnSuccess = () =>
  mockHttpServer()
    .post(/.*/)
    .reply((uri, requestBody) => buildResponseForPOSTOnSuccess(uri, requestBody));

export const mockHttpServerForCreationOnFailure = () => {
  const statusCode = getFailureStatusCode();
  return mockHttpServer().post(/.*/).reply(statusCode);
};
