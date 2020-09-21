import nock from 'nock';

const mockHttpServerSetup = () => nock.disableNetConnect();

export default mockHttpServerSetup;
