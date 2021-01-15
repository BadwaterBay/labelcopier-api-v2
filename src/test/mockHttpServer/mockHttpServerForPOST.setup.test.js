import mockHttpServer from './mockHttpServerInitiation.setup.test';

const getSuccessStatusCode = () => 201;

const mockHttpServerForPOSTOnSuccess = () => {
  const statusCode = getSuccessStatusCode();
  return mockHttpServer()
    .post(/.*/)
    .reply(statusCode, function (uri, requestBody) {
      return {
        requestUri: uri,
        method: this.req.method,
        requestHeader: this.req.headers,
        requestBody,
      };
    });
};

export default mockHttpServerForPOSTOnSuccess;
