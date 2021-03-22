import { getRepoOwnerAndRepoName } from '../../loginInfo';

export const getUriBuilderOfListing = (entryType) => {
  const uriBuilders = {
    labels: (uri) => uri,
    milestones: (uri) => `${uri}&state=all`,
  };

  return uriBuilders[entryType];
};

export const buildUriToList = (uri, entryType) => {
  const appendPaginationToUri = (uri1) => {
    const apiPaginationLimit = 100;
    return `${uri1}?per_page=${apiPaginationLimit}&page=1`;
  };

  const uriWithParams = appendPaginationToUri(uri);
  const buildUri = getUriBuilderOfListing(entryType);
  return buildUri(uriWithParams);
};

export const buildUriToCreate = (uri) => uri;

export const getUriBuilderOfAction = (action) => {
  const funcToBuildUri = {
    list: (uri, entryType) => buildUriToList(uri, entryType),
    copy: (uri, entryType) => buildUriToList(uri, entryType),
    create: (uri) => buildUriToCreate(uri),
  };

  const buildFunc = funcToBuildUri[action];
  return buildFunc;
};

export const getBaseApiUri = () => 'https://api.github.com';

export const getBaseApiUriSlashRepos = () => `${getBaseApiUri()}/repos`;

export const buildUriForHttpRequest = (loginInfo, entryType, action) => {
  const { repoOwner, repoName } = getRepoOwnerAndRepoName(loginInfo, action);
  const uri = `${getBaseApiUriSlashRepos()}/${repoOwner}/${repoName}/${entryType}`;
  const buildUri = getUriBuilderOfAction(action);
  return buildUri(uri, entryType);
};

export const buildUriForHttpRequestGET = (loginInfo, entryType, action) =>
  buildUriForHttpRequest(loginInfo, entryType, action);

export const buildUriForHttpRequestPOST = (loginInfo, entryType) =>
  buildUriForHttpRequest(loginInfo, entryType, 'create');
