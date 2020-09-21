import {
  buildUriForHttpRequestGET,
  buildUriForHttpRequestPOST,
  makeHttpRequestGET,
  makeHttpRequestPOST,
  parseLinkHeaderFromHttpResponse,
} from './httpRequests';
import { validateEntryTypeOrThrow } from './validations';

/**
 * Recursively make API calls (GET method) to fetch responses from a paginated API
 */
export const makeApiCallsToGetRecursively = async (entryType, action, uri = null) => {
  const uriForHttpRequest = uri || buildUriForHttpRequestGET(entryType, action);
  const response = await makeHttpRequestGET(uriForHttpRequest);
  const responseBody = await response.json();

  const linkHeader = parseLinkHeaderFromHttpResponse(response);
  const nextPage = 'next';
  const thereIsNoNextPage = !(nextPage in linkHeader);

  if (thereIsNoNextPage) {
    return responseBody;
  }

  const uriOfNextPage = linkHeader[nextPage];
  const responseBodyOfNextPage = await makeApiCallsToGetRecursively(
    entryType,
    action,
    uriOfNextPage
  );

  const combinedResponseBody = [...responseBody, ...responseBodyOfNextPage];

  return combinedResponseBody;
};

export const makeApiCallToList = async (entryType) => {
  validateEntryTypeOrThrow(entryType);
  const action = 'list';

  return makeApiCallsToGetRecursively(entryType, action);
};

export const makeApiCallToCopy = async (entryType) => {
  validateEntryTypeOrThrow(entryType);
  const action = 'copy';

  return makeApiCallsToGetRecursively(entryType, action);
};

export const makeApiCallToCreate = async (entryType, body = {}) => {
  validateEntryTypeOrThrow(entryType);

  const uriForHttpRequest = buildUriForHttpRequestPOST(entryType);
  const response = await makeHttpRequestPOST(uriForHttpRequest, body);
  const responseBody = await response.json();

  return responseBody;
};
