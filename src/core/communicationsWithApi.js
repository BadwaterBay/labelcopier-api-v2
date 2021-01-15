import { getApiResponseOfListing, getApiResponseOfCreating } from './apiCalls';

export const makeApiCallToList = async (loginInfo, entryType) => {
  return getApiResponseOfListing(loginInfo, entryType, 'list');
};

export const makeApiCallToCopy = async (loginInfo, entryType) => {
  return getApiResponseOfListing(loginInfo, entryType, 'copy');
};

export const makeApiCallToCreate = async (loginInfo, entryType, body) => {
  return getApiResponseOfCreating(loginInfo, entryType, body);
};
