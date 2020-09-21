import { getRepoOwnerAndRepoName } from '../loginInfo';

export const getBaseApiUri = () => 'https://api.github.com';

export const getBaseApiUriSlashRepos = () => `${getBaseApiUri()}/repos`;

export const getApiPaginationLimit = () => 100;

export const buildUriToListLabels = (uri) => uri;

export const buildUriToListMilestones = (uri) => `${uri}&state=all`;

export const buildUriToCreate = (uri) => uri;

export const buildUriToList = (baseUri) => {
  const uri = `${baseUri}?per_page=${getApiPaginationLimit()}&page=1`;

  const regex = /\/labels$/;
  const uriIsForListingLabels = regex.test(baseUri);

  if (uriIsForListingLabels) {
    return buildUriToListLabels(uri);
  }

  return buildUriToListMilestones(uri);
};

export const getUriBuilderFunction = (action) => {
  const uriBuilderFunctions = {
    list: (baseUri) => buildUriToList(baseUri),
    copy: (baseUri) => buildUriToList(baseUri),
    create: (baseUri) => buildUriToCreate(baseUri),
  };

  return uriBuilderFunctions[action];
};

export const buildUriForHttpRequest = (entryType, action, entryIdentifier = null) => {
  const { repoOwner, repoName } = getRepoOwnerAndRepoName(action);
  const baseUri = `${getBaseApiUriSlashRepos()}/${repoOwner}/${repoName}/${entryType}`;
  const buildUri = getUriBuilderFunction(action);

  return buildUri(baseUri, entryIdentifier);
};

export const buildUriForHttpRequestGET = (entryType, action) =>
  buildUriForHttpRequest(entryType, action);

export const buildUriForHttpRequestPOST = (entryType) => {
  const action = 'create';

  return buildUriForHttpRequest(entryType, action);
};
