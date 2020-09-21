import mockHttpServer from './mockHttpServerInitiation.setup.test';

const getSuccessStatusCode = () => 200;

const mockHttpServerForGETOnSuccess = () => {
  const statusCode = getSuccessStatusCode();

  return mockHttpServer()
    .get(/.*/)
    .reply(statusCode, function (uri) {
      return {
        requestUri: uri,
        method: this.req.method,
        requestHeader: this.req.headers,
      };
    });
};

export default mockHttpServerForGETOnSuccess;
