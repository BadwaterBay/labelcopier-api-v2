import {
  buildUriForHttpRequest,
  makeHttpGetRequest,
  makeHttpPostRequest,
} from './httpRequests';
import { parseLinkHeaderFromHttpResponse } from './linkHeaderParser';
import { validateKindOrThrowError, validateModeOrThrowError } from './validations';

export const makeApiCallToGet = async (kind = 'labels', mode = 'list', uri = null) => {
  validateKindOrThrowError(kind);
  validateModeOrThrowError(mode);

  const uriForHttpRequest = uri || buildUriForHttpRequest(kind, mode);
  const response = await makeHttpGetRequest(uriForHttpRequest);
  const responseBody = await response.json();
  const parsedLinkHeader = parseLinkHeaderFromHttpResponse(response);

  if (!('next' in parsedLinkHeader)) {
    return responseBody;
  }

  const nextPageUri = parsedLinkHeader.next;

  return responseBody.concat(await makeApiCallToGet(kind, mode, nextPageUri));
};

export const makeApiCallToCreate = async (kind = 'labels', body = {}, uri = null) => {
  validateKindOrThrowError(kind);

  const uriForHttpRequest = uri || buildUriForHttpRequest(kind, 'create');
  const response = await makeHttpPostRequest(uriForHttpRequest, body);
  const responseBody = await response.json();

  return responseBody;
};
