import nock from 'nock';

import { getBaseApiUri } from '../../core/apiCalls/httpRequests/httpRequestUriBuilder';

const mockHttpServer = () => nock(getBaseApiUri());

export default mockHttpServer;
