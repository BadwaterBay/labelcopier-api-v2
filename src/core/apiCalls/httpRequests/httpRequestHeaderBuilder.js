export const buildAcceptHeaderForHttpRequest = () => 'application/vnd.github.v3+json';

export const buildAuthorizationHeaderForHttpRequest = (loginInfo) => {
  const { token } = loginInfo;
  return `token ${token}`;
};

export const buildHttpRequestHeader = (loginInfo) => {
  const headers = {
    Accept: buildAcceptHeaderForHttpRequest(),
    Authorization: buildAuthorizationHeaderForHttpRequest(loginInfo),
  };
  return headers;
};
