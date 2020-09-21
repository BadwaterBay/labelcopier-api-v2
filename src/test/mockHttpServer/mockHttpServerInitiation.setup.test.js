import nock from 'nock';

import { getBaseApiUri } from '../../core/httpRequests/httpRequestUriBuilder';

const mockHttpServer = () => nock(getBaseApiUri());

export default mockHttpServer;
