import fetch from 'node-fetch';

import { validateKindOrThrowError } from './dataValidation';
import { httpAcceptHeader, getLoginInfo, getRepoInfoFromLoginInfo } from './apiCall';

export const composeUrlForCreatingEntries = (kind = 'labels') => {
  validateKindOrThrowError(kind);

  const loginInfo = getLoginInfo();
  const repoOwner = getRepoInfoFromLoginInfo(loginInfo, 'owner');
  const repoName = getRepoInfoFromLoginInfo(loginInfo, 'name');

  const urlToBeReturned = `https://api.github.com/repos/${repoOwner}/${repoName}/${kind}`;

  return urlToBeReturned;
};

export const httpPost = () => {
  const url = composeUrlForCreatingEntries();

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

  return fetch(url, options);
};
