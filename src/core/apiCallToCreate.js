import fetch from 'node-fetch';

import { httpAcceptHeader, apiUriBaseRepos } from './apiCallOptions';
import { validateKindOrThrowError } from './validateKind';
import { getLoginInfo, getRepoInfoFromLoginInfo } from './getApiLoginInfo';

export const composeUriForCreatingEntries = (kind = 'labels') => {
  const loginInfo = getLoginInfo();
  const repoOwner = getRepoInfoFromLoginInfo(loginInfo, 'owner');
  const repoName = getRepoInfoFromLoginInfo(loginInfo, 'name');

  const uri = `${apiUriBaseRepos}/${repoOwner}/${repoName}/${kind}`;

  return uri;
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

  const uri = composeUriForCreatingEntries(kind);

  return fetch(uri, options);
};
