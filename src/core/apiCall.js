import fetch from 'node-fetch';

import { validateKind, validateMode } from './dataValidation';
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

export const getRepoInfoFromLoginInfo = (loginInfo, mode, ownerOrName) => {
  const key = loginInfoLookupTable[mode][ownerOrName];
  return loginInfo[key];
};

export const composeUrlForListingEntries = (
  kind = 'labels',
  pageNum = 1,
  mode = 'list'
) => {
  validateKind(kind);
  validateMode(mode);

  const loginInfo = getLoginInfo();
  const repoOwner = getRepoInfoFromLoginInfo(loginInfo, mode, 'owner');
  const repoName = getRepoInfoFromLoginInfo(loginInfo, mode, 'name');

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

  return fetch(url, {
    method: 'GET',
    headers: {
      Accept: httpAcceptHeader,
      Authorization: `token`,
    },
  });
};

export const makeApiCallToListEntries = async (kind = 'labels') => {
  const response = await httpGet(kind);
  const fetchedArray = await response.json();
  return fetchedArray;
};
