import fetch from 'node-fetch';

import { apiPaginationLimit, httpAcceptHeader, apiUriBaseRepos } from './apiCallOptions';
import HttpError from './customErrors/HttpError';
import { getLoginInfo, getRepoInfoFromLoginInfo } from './getApiLoginInfo';
import { parseLinkHeaderFromHttpResponse } from './parseLinkHeader';
import { validateKindOrThrowError } from './validateKind';
import { validateModeOrThrowError } from './validateMode';

export const composeUriForGettingEntries = (kind = 'labels', mode = 'list') => {
  const loginInfo = getLoginInfo();
  const repoOwner = getRepoInfoFromLoginInfo(loginInfo, 'owner', mode);
  const repoName = getRepoInfoFromLoginInfo(loginInfo, 'name', mode);
  const pageNum = 1;

  let uri =
    `${apiUriBaseRepos}/${repoOwner}/${repoName}/${kind}` +
    `?per_page=${apiPaginationLimit}` +
    `&page=${pageNum}`;

  if (kind === 'milestones') {
    uri += '&state=all';
  }

  return uri;
};

export const httpGet = async (uri) => {
  const loginInfo = getLoginInfo();
  const { token } = loginInfo;

  const headers = {
    Accept: httpAcceptHeader,
    Authorization: `token ${token}`,
  };

  const options = {
    method: 'GET',
    headers,
  };

  const response = await fetch(uri, options);

  if (!response.ok) {
    throw new HttpError(response);
  }

  return response;
};

export const makeApiCallToGetEntries = async (
  kind = 'labels',
  mode = 'list',
  uri = null
) => {
  validateKindOrThrowError(kind);
  validateModeOrThrowError(mode);

  let uriForHttpGetFetch;

  if (uri === null) {
    uriForHttpGetFetch = composeUriForGettingEntries(kind, mode);
  } else {
    uriForHttpGetFetch = uri;
  }

  const response = await httpGet(uriForHttpGetFetch);
  const responseBody = await response.json();
  const parsedLinkHeader = parseLinkHeaderFromHttpResponse(response);

  if (!('next' in parsedLinkHeader)) {
    return responseBody;
  }

  const nextPageUri = parsedLinkHeader.next;

  return responseBody.concat(await makeApiCallToGetEntries(kind, mode, nextPageUri));
};
