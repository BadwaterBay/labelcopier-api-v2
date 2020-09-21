import { getLoginInfo } from '../loginInfo';

export const buildAcceptHeaderForHttpRequest = () => 'application/vnd.github.v3+json';

export const buildAuthorizationHeaderForHttpRequest = () => {
  const { token } = getLoginInfo();
  return `token ${token}`;
};

export const buildHttpRequestHeader = () => {
  const headers = {
    Accept: buildAcceptHeaderForHttpRequest(),
    Authorization: buildAuthorizationHeaderForHttpRequest(),
  };

  return headers;
};
