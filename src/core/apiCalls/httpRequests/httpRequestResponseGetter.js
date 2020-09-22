import HttpError from './HttpError';
import { makeHttpRequest } from './httpRequestMaker';
import {
  buildUriForHttpRequestGET,
  buildUriForHttpRequestPOST,
} from './httpRequestUriBuilder';
import { parseLinkHeaderFromHttpResponse } from './linkHeaderParser';

export const getResponseOfHttpRequest = async (method, uri, body = {}) => {
  const response = await makeHttpRequest(method, uri, body);
  const httpRequestFailed = !response.ok;

  if (httpRequestFailed) {
    throw new HttpError(response);
  }

  return response;
};

export const getResponseOfHttpGET = async (entryType, action, uri) => {
  const uriForHttpRequest = uri || buildUriForHttpRequestGET(entryType, action);
  const response = await getResponseOfHttpRequest('GET', uriForHttpRequest);

  return response;
};

export const parseResponseOfHttpGETFromPaginatedApi = async (response) => {
  const responseBody = await response.json();
  const linkHeader = parseLinkHeaderFromHttpResponse(response);
  const nextPage = 'next';
  const thereIsNoNextPage = !(nextPage in linkHeader);
  const uriOfNextPage = linkHeader[nextPage] || null;

  return { responseBody, thereIsNoNextPage, uriOfNextPage };
};

export const getResponseOfHttpGETFromPaginatedApi = async (
  entryType,
  action,
  uri = null
) => {
  const response = await getResponseOfHttpGET(entryType, action, uri);

  const {
    responseBody,
    thereIsNoNextPage,
    uriOfNextPage,
  } = await parseResponseOfHttpGETFromPaginatedApi(response);

  if (thereIsNoNextPage) {
    return responseBody;
  }

  const combineResponseBodyWithNextPage = async () => [
    ...responseBody,
    ...(await getResponseOfHttpGETFromPaginatedApi(entryType, action, uriOfNextPage)),
  ];

  const responseBodyCombinedWithNextPage = await combineResponseBodyWithNextPage();

  return responseBodyCombinedWithNextPage;
};

export const getResponseOfHttpPOST = async (entryType, body) => {
  const uri = buildUriForHttpRequestPOST(entryType);
  const response = await getResponseOfHttpRequest('POST', uri, body);
  const responseBody = await response.json();

  return responseBody;
};
