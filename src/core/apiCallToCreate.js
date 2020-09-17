import fetch from 'node-fetch';

import { httpAcceptHeader, httpUriBase } from './apiCallOptions';
import { validateKindOrThrowError } from './validateKind';
import { getLoginInfo, getRepoInfoFromLoginInfo } from './getApiLoginInfo';

export const composeUrlForCreatingEntries = (kind = 'labels') => {
  const loginInfo = getLoginInfo();
  const repoOwner = getRepoInfoFromLoginInfo(loginInfo, 'owner');
  const repoName = getRepoInfoFromLoginInfo(loginInfo, 'name');

  const url = `${httpUriBase}${repoOwner}/${repoName}/${kind}`;

  return url;
};

export const httpPost = (kind = 'labels') => {
  validateKindOrThrowError(kind);

  const headers = {
    Accept: httpAcceptHeader,
    Authorization: 'token',
  };

  const body = '';

  const options = {
    method: 'POST',
    headers,
    body,
  };

  const url = composeUrlForCreatingEntries(kind);

  return fetch(url, options);
};
