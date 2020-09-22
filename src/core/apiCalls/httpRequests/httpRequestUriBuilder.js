import { getRepoOwnerAndRepoName } from '../../loginInfo';

export const getBaseApiUri = () => 'https://api.github.com';

export const getBaseApiUriSlashRepos = () => `${getBaseApiUri()}/repos`;

export const getApiPaginationLimit = () => 100;

export const appendPaginationToUri = (uri) =>
  `${uri}?per_page=${getApiPaginationLimit()}&page=1`;

export const buildUriToListLabels = (uri) => uri;

export const buildUriToListMilestones = (uri) => `${uri}&state=all`;

export const getUriBuilderOfListing = (entryType) => {
  const uriBuilders = {
    labels: (uri) => buildUriToListLabels(uri),
    milestones: (uri) => buildUriToListMilestones(uri),
  };

  return uriBuilders[entryType];
};

export const buildUriToList = (uri) => {
  const uriWithParams = appendPaginationToUri(uri);

  const regex = /\/(?<entryType>labels|milestones)$/;
  const { entryType } = uri.match(regex).groups;

  const buildUri = getUriBuilderOfListing(entryType);

  return buildUri(uriWithParams);
};

export const buildUriToCreate = (uri) => uri;

export const getUriBuilderOfAction = (action) => {
  const uriBuilderFunctions = {
    list: (uri) => buildUriToList(uri),
    copy: (uri) => buildUriToList(uri),
    create: (uri) => buildUriToCreate(uri),
  };

  return uriBuilderFunctions[action];
};

export const buildUriForHttpRequest = (entryType, action, entryIdentifier = null) => {
  const { repoOwner, repoName } = getRepoOwnerAndRepoName(action);
  const uri = `${getBaseApiUriSlashRepos()}/${repoOwner}/${repoName}/${entryType}`;
  const buildUri = getUriBuilderOfAction(action);

  return buildUri(uri, entryIdentifier);
};

export const buildUriForHttpRequestGET = (entryType, action) =>
  buildUriForHttpRequest(entryType, action);

export const buildUriForHttpRequestPOST = (entryType) =>
  buildUriForHttpRequest(entryType, 'create');
