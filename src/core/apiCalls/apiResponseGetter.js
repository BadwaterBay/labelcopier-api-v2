import {
  getResponseOfHttpGETFromPaginatedApi,
  getResponseOfHttpPOST,
} from './httpRequests/httpRequestResponseGetter';

export const getApiResponseOfListing = (entryType, action) =>
  getResponseOfHttpGETFromPaginatedApi(entryType, action);

export const getApiResponseOfCreating = (entryType, body) =>
  getResponseOfHttpPOST(entryType, body);
