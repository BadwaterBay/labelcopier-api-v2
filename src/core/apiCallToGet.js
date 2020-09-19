import { apiPaginationLimit, httpAcceptHeader, apiUriBaseRepos } from './apiCallOptions';
import HttpError from './customErrors/HttpError';
import { getLoginInfo, getRepoInfoFromLoginInfo } from './loginInfo';
import { parseLinkHeaderFromHttpResponse } from './linkHeaderParser';
import { validateKindOrThrowError } from './validations/kindValidation';
import { validateModeOrThrowError } from './validations/modeValidation';

export const buildUriForHttpGet = (kind = 'labels', mode = 'list') => {
  const loginInfo = getLoginInfo();
  const repoOwner = getRepoInfoFromLoginInfo(loginInfo, 'owner', mode);
  const repoName = getRepoInfoFromLoginInfo(loginInfo, 'name', mode);

  let uri =
    `${apiUriBaseRepos}/${repoOwner}/${repoName}/${kind}` +
    `?per_page=${apiPaginationLimit}` +
    '&page=1';

  if (kind === 'milestones') {
    uri += '&state=all';
  }

  return uri;
};

export const makeHttpGetRequest = async (uri) => {
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

export const makeApiCallToGet = async (kind = 'labels', mode = 'list', uri = null) => {
  validateKindOrThrowError(kind);
  validateModeOrThrowError(mode);

  const uriForHttpGet = uri || buildUriForHttpGet(kind, mode);
  const response = await makeHttpGetRequest(uriForHttpGet);
  const responseBody = await response.json();
  const parsedLinkHeader = parseLinkHeaderFromHttpResponse(response);

  if (!('next' in parsedLinkHeader)) {
    return responseBody;
  }

  const nextPageUri = parsedLinkHeader.next;

  return responseBody.concat(await makeApiCallToGet(kind, mode, nextPageUri));
};
