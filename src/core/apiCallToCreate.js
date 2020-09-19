import { httpAcceptHeader, apiUriBaseRepos } from './apiCallOptions';
import HttpError from './customErrors/HttpError';
import { getLoginInfo, getRepoInfoFromLoginInfo } from './loginInfo';
import { validateKindOrThrowError } from './validations/kindValidation';

export const buildUriForHttpPost = (kind = 'labels') => {
  const loginInfo = getLoginInfo();
  const repoOwner = getRepoInfoFromLoginInfo(loginInfo, 'owner');
  const repoName = getRepoInfoFromLoginInfo(loginInfo, 'name');

  const uri = `${apiUriBaseRepos}/${repoOwner}/${repoName}/${kind}`;

  return uri;
};

export const makeHttpPostRequest = async (uri, body = {}) => {
  const loginInfo = getLoginInfo();
  const { token } = loginInfo;

  const headers = {
    Accept: httpAcceptHeader,
    Authorization: `token ${token}`,
  };

  const options = {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  };

  const response = await fetch(uri, options);

  if (!response.ok) {
    throw new HttpError(response);
  }

  return response;
};

export const makeApiCallToCreate = async (kind = 'labels', uri = null) => {
  validateKindOrThrowError(kind);

  const uriForHttpPost = uri || buildUriForHttpPost(kind);
  const response = await makeHttpPostRequest(uriForHttpPost);
  const responseBody = await response.json();

  return responseBody;
};
