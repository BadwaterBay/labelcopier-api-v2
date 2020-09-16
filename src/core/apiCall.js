import fetch from 'node-fetch';

import { validateKindOrThrowError, validateModeOrThrowError } from './dataValidation';
import { dummyLoginInfo } from '../test/dummyData';

export const getLoginInfo = () => {
  return dummyLoginInfo;
};

export const apiPaginationLimit = 100;

export const httpAcceptHeader = 'application/vnd.github.v3+json';

export const loginInfoLookupTable = {
  list: {
    owner: 'homeRepoOwner',
    name: 'homeRepoName',
  },
  copy: {
    owner: 'templateRepoOwner',
    name: 'templateRepoName',
  },
};

export const getRepoInfoFromLoginInfo = (loginInfo, ownerOrName, mode = 'list') => {
  const key = loginInfoLookupTable[mode][ownerOrName];
  return loginInfo[key];
};

export const composeUrlForListingEntries = (
  kind = 'labels',
  pageNum = 1,
  mode = 'list'
) => {
  validateKindOrThrowError(kind);
  validateModeOrThrowError(mode);

  const loginInfo = getLoginInfo();
  const repoOwner = getRepoInfoFromLoginInfo(loginInfo, 'owner', mode);
  const repoName = getRepoInfoFromLoginInfo(loginInfo, 'name', mode);

  let urlToBeReturned =
    'https://api.github.com/repos/' +
    `${repoOwner}/${repoName}/${kind}` +
    `?per_page=${apiPaginationLimit}` +
    `&page=${pageNum}`;

  if (kind === 'milestones') {
    urlToBeReturned += '&state=all';
  }

  return urlToBeReturned;
};

export const httpGet = (kind = 'labels', pageNum = 1, mode = 'list') => {
  const url = composeUrlForListingEntries(kind, pageNum, mode);

  const headers = {
    Accept: httpAcceptHeader,
    Authorization: 'token',
  };

  const options = {
    method: 'GET',
    headers,
  };

  return fetch(url, options);
};

export const makeApiCallToListEntries = async (kind = 'labels') => {
  const response = await httpGet(kind);
  const fetchedArray = await response.json();
  return fetchedArray;
};
