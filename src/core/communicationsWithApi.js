import { getApiResponseOfListing, getApiResponseOfCreating } from './apiCalls';
import { validateEntryTypeOrThrow } from './validations';

export const makeApiCallToList = async (entryType) => {
  validateEntryTypeOrThrow(entryType);

  return getApiResponseOfListing(entryType, 'list');
};

export const makeApiCallToCopy = async (entryType) => {
  validateEntryTypeOrThrow(entryType);

  return getApiResponseOfListing(entryType, 'copy');
};

export const makeApiCallToCreate = async (entryType, body) => {
  validateEntryTypeOrThrow(entryType);

  return getApiResponseOfCreating(entryType, body);
};
