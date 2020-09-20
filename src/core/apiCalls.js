import {
  buildUriForHttpRequest,
  makeHttpGetRequest,
  makeHttpPostRequest,
} from './httpRequests';
import { parseLinkHeaderFromHttpResponse } from './linkHeaderParser';
import { validateKindOrThrowError, validateModeOrThrowError } from './validations';

/**
 * Recursively make API calls (GET method) to fetch responses from a paginated API
 */
export const makeApiCallToGet = async (kind = 'labels', mode = 'list', uri = null) => {
  validateKindOrThrowError(kind);
  validateModeOrThrowError(mode);

  const uriForHttpRequest = uri || buildUriForHttpRequest(kind, mode);
  const response = await makeHttpGetRequest(uriForHttpRequest);
  const responseBody = await response.json();
  const linkHeader = parseLinkHeaderFromHttpResponse(response);
  const nextPage = 'next';

  if (!(nextPage in linkHeader)) {
    return responseBody;
  }

  const uriOfNextPage = linkHeader[nextPage];
  const responseBodyOfNextPage = await makeApiCallToGet(kind, mode, uriOfNextPage);

  return [...responseBody, ...responseBodyOfNextPage];
};

export const makeApiCallToCreate = async (kind = 'labels', body = {}) => {
  validateKindOrThrowError(kind);

  const uriForHttpRequest = buildUriForHttpRequest(kind, 'create');
  const response = await makeHttpPostRequest(uriForHttpRequest, body);
  const responseBody = await response.json();

  return responseBody;
};
