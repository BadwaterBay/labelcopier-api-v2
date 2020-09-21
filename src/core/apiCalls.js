import {
  buildUriForHttpRequestGET,
  buildUriForHttpRequestPOST,
  getResponseOfHttpGET,
  getResponseOfHttpPOST,
  parseLinkHeaderFromHttpResponse,
} from './httpRequests';
import { validateEntryTypeOrThrow } from './validations';

export const getResponseOfHttpGETFromPaginatedApi = async (
  entryType,
  action,
  uri = null
) => {
  const uriForHttpRequest = uri || buildUriForHttpRequestGET(entryType, action);
  const response = await getResponseOfHttpGET(uriForHttpRequest);
  const responseBody = await response.json();

  const linkHeader = parseLinkHeaderFromHttpResponse(response);
  const nextPage = 'next';
  const thereIsNoNextPage = !(nextPage in linkHeader);

  if (thereIsNoNextPage) {
    return responseBody;
  }

  const uriOfNextPage = linkHeader[nextPage];
  const responseBodyOfNextPage = await getResponseOfHttpGETFromPaginatedApi(
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

  return getResponseOfHttpGETFromPaginatedApi(entryType, action);
};

export const makeApiCallToCopy = async (entryType) => {
  validateEntryTypeOrThrow(entryType);
  const action = 'copy';

  return getResponseOfHttpGETFromPaginatedApi(entryType, action);
};

export const makeApiCallToCreate = async (entryType, body = {}) => {
  validateEntryTypeOrThrow(entryType);

  const uriForHttpRequest = buildUriForHttpRequestPOST(entryType);
  const response = await getResponseOfHttpPOST(uriForHttpRequest, body);
  const responseBody = await response.json();

  return responseBody;
};
