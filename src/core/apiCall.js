import { validateKind, validateMode } from './dataValidation';

export const getLoginInfo = () => {
  return {
    homeRepoOwner: 'home-repo-owner',
    homeRepoName: 'home-repo-name',
    templateRepoOwner: 'template-repo-owner',
    templateRepoName: 'template-repo-name',
  };
};

export const apiPaginationLimit = 100;

export const httpAcceptHeader = 'application/vnd.github.v3+json';

export const getRepoOwnerFromLoginInfo = (loginInfo, mode) => {
  const lookupTable = {
    list: loginInfo.homeRepoOwner,
    copy: loginInfo.templateRepoOwner,
  };

  return lookupTable[mode];
};

export const getRepoNameFromLoginInfo = (loginInfo, mode) => {
  const lookupTable = {
    list: loginInfo.homeRepoName,
    copy: loginInfo.templateRepoName,
  };

  return lookupTable[mode];
};

export const composeUrlForFetchingEntriesFromServer = (
  kind = 'labels',
  pageNum = 1,
  mode = 'list'
) => {
  validateKind(kind);

  validateMode(mode);

  const loginInfo = getLoginInfo();

  const repoOwner = getRepoOwnerFromLoginInfo(loginInfo, mode);

  const repoName = getRepoNameFromLoginInfo(loginInfo, mode);

  let url =
    'https://api.github.com/repos/' +
    `${repoOwner}/${repoName}/${kind}` +
    `?per_page=${apiPaginationLimit}` +
    `&page=${pageNum}`;

  if (kind === 'milestones') {
    url += '&state=all';
  }

  return url;
};
