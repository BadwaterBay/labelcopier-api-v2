import nock from 'nock';

const mockHttpServerCleanup = () => {
  nock.cleanAll();
  nock.enableNetConnect();
};

export default mockHttpServerCleanup;
