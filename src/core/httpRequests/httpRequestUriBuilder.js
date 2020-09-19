import { getRepoOwnerAndName } from '../loginInfo';

export const apiUriBase = 'https://api.github.com';

export const apiUriBaseRepos = `${apiUriBase}/repos`;

export const apiPaginationLimit = 100;

export const buildUriForHttpRequest = (kind = 'labels', mode = 'list') => {
  const { repoOwner, repoName } = getRepoOwnerAndName(mode);

  let uri = `${apiUriBaseRepos}/${repoOwner}/${repoName}/${kind}`;

  if (mode === 'list' || mode === 'copy') {
    uri += `?per_page=${apiPaginationLimit}&page=1`;
  }

  if (kind === 'milestones') {
    uri += '&state=all';
  }

  return uri;
};
