import { getLoginInfo } from '../loginInfo';

export const httpAcceptHeader = 'application/vnd.github.v3+json';

export const buildHttpRequestHeader = () => {
  const { token } = getLoginInfo();

  const headers = {
    Accept: httpAcceptHeader,
    Authorization: `token ${token}`,
  };

  return headers;
};
