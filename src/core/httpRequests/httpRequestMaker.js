import { HttpError } from '../customErrors';
import { buildHttpRequestHeader } from './httpRequestHeaderBuilder';

export const makeHttpRequest = async (method, uri, body = {}) => {
  const headers = buildHttpRequestHeader();

  const options = {
    method,
    headers,
  };

  if (method === 'POST') {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(uri, options);

  if (!response.ok) {
    throw new HttpError(response);
  }

  return response;
};

export const makeHttpGetRequest = async (uri) => makeHttpRequest('GET', uri);

export const makeHttpPostRequest = async (uri, body = {}) =>
  makeHttpRequest('POST', uri, body);
