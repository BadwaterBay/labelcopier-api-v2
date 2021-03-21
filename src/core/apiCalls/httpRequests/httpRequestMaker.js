import { buildHttpRequestHeader } from './httpRequestHeaderBuilder';

export const returnTrueIfNoNeedToAddHttpRequestBody = (method) => {
  const obtainHttpMethodsThatDoNotHaveBody = () => new Set().add('GET').add('DELETE');
  const httpMethodsThatDoNotHaveBody = obtainHttpMethodsThatDoNotHaveBody();
  const noNeedToAddBody = httpMethodsThatDoNotHaveBody.has(method);
  return noNeedToAddBody;
};

export const buildOptionsForFetchApi = (loginInfo, method, body = {}) => {
  const optionsWithoutBody = {
    method,
    headers: buildHttpRequestHeader(loginInfo),
  };

  const noNeedToAddBody = returnTrueIfNoNeedToAddHttpRequestBody(method);

  if (noNeedToAddBody) {
    return optionsWithoutBody;
  }

  const optionsWithBody = {
    ...optionsWithoutBody,
    body: JSON.stringify(body),
  };

  return optionsWithBody;
};

export const makeHttpRequest = (loginInfo, method, uri, body) => {
  const options = buildOptionsForFetchApi(loginInfo, method, body);
  return fetch(uri, options);
};
