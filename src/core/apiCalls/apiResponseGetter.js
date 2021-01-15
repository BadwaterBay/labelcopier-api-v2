import {
  getResponseOfHttpGETFromPaginatedApi,
  getResponseOfHttpPOST,
} from './httpRequests/httpRequestResponseGetter';

export const getApiResponseOfListing = (loginInfo, entryType, action) =>
  getResponseOfHttpGETFromPaginatedApi(loginInfo, entryType, action);

export const getApiResponseOfCreating = (loginInfo, entryType, body) =>
  getResponseOfHttpPOST(loginInfo, entryType, body);
