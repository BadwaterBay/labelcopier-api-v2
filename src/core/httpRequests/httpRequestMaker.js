import { HttpError } from '../customErrors';
import { buildHttpRequestHeader } from './httpRequestHeaderBuilder';

export const getHttpMethodsThatDoNotHaveBody = () => new Set().add('GET');

export const checkIfGivenHttpRequestShouldHaveBody = (method) => {
  const httpMethodsThatDoNotHaveBody = getHttpMethodsThatDoNotHaveBody();
  const noNeedToAddBody = httpMethodsThatDoNotHaveBody.has(method);

  return noNeedToAddBody;
};

export const buildHttpRequestOptionsForFetch = (method, body = {}) => {
  const options = {
    method,
    headers: buildHttpRequestHeader(),
  };

  const noNeedToAddBody = checkIfGivenHttpRequestShouldHaveBody(method);

  if (noNeedToAddBody) {
    return options;
  }

  options.body = JSON.stringify(body);

  return options;
};

export const makeHttpRequest = async (method, uri, body = {}) => {
  const options = buildHttpRequestOptionsForFetch(method, body);
  const response = await fetch(uri, options);
  const httpRequestFailed = !response.ok;

  if (httpRequestFailed) {
    throw new HttpError(response);
  }

  return response;
};

export const makeHttpRequestGET = async (uri) => makeHttpRequest('GET', uri);

export const makeHttpRequestPOST = async (uri, body) =>
  makeHttpRequest('POST', uri, body);
