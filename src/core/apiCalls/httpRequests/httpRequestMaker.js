import { buildHttpRequestHeader } from './httpRequestHeaderBuilder';

export const obtainHttpMethodsThatDoNotHaveBody = () => new Set().add('GET');

export const returnTrueIfNoNeedToAddHttpRequestBody = (method) => {
  const httpMethodsThatDoNotHaveBody = obtainHttpMethodsThatDoNotHaveBody();
  const noNeedToAddBody = httpMethodsThatDoNotHaveBody.has(method);

  return noNeedToAddBody;
};

export const buildOptionsForFetchApi = (method, body = {}) => {
  const optionsWithoutBody = {
    method,
    headers: buildHttpRequestHeader(),
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

export const makeHttpRequest = (method, uri, body) => {
  const options = buildOptionsForFetchApi(method, body);
  return fetch(uri, options);
};
