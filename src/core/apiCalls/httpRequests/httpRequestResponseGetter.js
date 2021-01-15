import HttpError from './HttpError';
import { makeHttpRequest } from './httpRequestMaker';
import {
  buildUriForHttpRequestGET,
  buildUriForHttpRequestPOST,
} from './httpRequestUriBuilder';
import { parseLinkHeaderFromHttpResponse } from './linkHeaderParser';

export const getResponseOfHttpRequest = async (loginInfo, method, uri, body = {}) => {
  const response = await makeHttpRequest(loginInfo, method, uri, body);
  const httpRequestFailed = !response.ok;
  if (httpRequestFailed) throw new HttpError(response);
  return response;
};

export const getResponseOfHttpGET = async (loginInfo, entryType, action, uri) => {
  const uriForHttpRequest =
    uri || buildUriForHttpRequestGET(loginInfo, entryType, action);
  const response = await getResponseOfHttpRequest(loginInfo, 'GET', uriForHttpRequest);
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
  loginInfo,
  entryType,
  action,
  uri = null
) => {
  const response = await getResponseOfHttpGET(loginInfo, entryType, action, uri);

  const {
    responseBody,
    thereIsNoNextPage,
    uriOfNextPage,
  } = await parseResponseOfHttpGETFromPaginatedApi(response);

  if (thereIsNoNextPage) return responseBody;

  const combineResponseBodyWithNextPage = async () => [
    ...responseBody,
    ...(await getResponseOfHttpGETFromPaginatedApi(
      loginInfo,
      entryType,
      action,
      uriOfNextPage
    )),
  ];

  const responseBodyCombinedWithNextPage = await combineResponseBodyWithNextPage();
  return responseBodyCombinedWithNextPage;
};

export const getResponseOfHttpPOST = async (loginInfo, entryType, body) => {
  const uri = buildUriForHttpRequestPOST(loginInfo, entryType);
  const response = await getResponseOfHttpRequest(loginInfo, 'POST', uri, body);
  const responseBody = await response.json();
  return responseBody;
};
