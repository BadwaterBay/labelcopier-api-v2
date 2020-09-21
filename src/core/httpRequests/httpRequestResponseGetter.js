import { HttpError } from '../customErrors';
import { buildHttpRequestHeader } from './httpRequestHeaderBuilder';

export const obtainHttpMethodsThatDoNotHaveBody = () => new Set().add('GET');

export const checkIfNeedToAddBodyToGivenHttpRequest = (method) => {
  const httpMethodsThatDoNotHaveBody = obtainHttpMethodsThatDoNotHaveBody();
  const needToAddBody = !httpMethodsThatDoNotHaveBody.has(method);

  return needToAddBody;
};

export const buildOptionsForFetchApi = (method, body = {}) => {
  const options = {
    method,
    headers: buildHttpRequestHeader(),
  };

  const noNeedToAddBody = !checkIfNeedToAddBodyToGivenHttpRequest(method);

  if (noNeedToAddBody) {
    return options;
  }

  options.body = JSON.stringify(body);

  return options;
};

export const makeHttpRequest = (method, uri, body) => {
  const options = buildOptionsForFetchApi(method, body);
  return fetch(uri, options);
};

export const getResponseOfHttpRequest = async (method, uri, body = {}) => {
  const response = await makeHttpRequest(method, uri, body);
  const httpRequestFailed = !response.ok;

  if (httpRequestFailed) {
    throw new HttpError(response);
  }

  return response;
};

export const getResponseOfHttpGET = (uri) => getResponseOfHttpRequest('GET', uri);

export const getResponseOfHttpPOST = (uri, body) =>
  getResponseOfHttpRequest('POST', uri, body);
