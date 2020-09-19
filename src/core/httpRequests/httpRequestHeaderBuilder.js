import { getLoginInfo } from '../loginInfo';

export const httpAcceptHeader = 'application/vnd.github.v3+json';

export const buildHttpRequestHeader = () => {
  const loginInfo = getLoginInfo();
  const { token } = loginInfo;

  const headers = {
    Accept: httpAcceptHeader,
    Authorization: `token ${token}`,
  };

  return headers;
};
