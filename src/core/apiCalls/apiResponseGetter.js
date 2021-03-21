import {
  getResponseOfHttpGETFromPaginatedApi,
  getResponseOfHttpPOST,
} from './httpRequests/httpRequestResponseGetter';

export const getApiResponseOfListing = (loginInfo, entryType, action) =>
  getResponseOfHttpGETFromPaginatedApi(loginInfo, entryType, action);

export const getApiResponseOfCreating = (loginInfo, entryType, entry) => {
  return getResponseOfHttpPOST(loginInfo, entryType, entry);
};
