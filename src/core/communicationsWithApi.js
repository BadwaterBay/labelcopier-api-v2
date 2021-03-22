import { getApiResponseOfListing, getApiResponseOfCreating } from './apiCalls';

export const makeApiCallToList = async (loginInfo, entryType) => {
  return getApiResponseOfListing(loginInfo, entryType, 'list');
};

export const makeApiCallToCopy = async (loginInfo, entryType) => {
  return getApiResponseOfListing(loginInfo, entryType, 'copy');
};

export const makeApiCallToCreate = async (loginInfo, entryType, entry) => {
  return getApiResponseOfCreating(loginInfo, entryType, entry);
};

// export const commitChangesByMakingApiCalls = (inputFromFrontEnd) => {
// const { loginInfo, labels, milestones } = inputFromFrontEnd;

// // parse labels for next step
// const processedLabelsForApiCalls = processLabelsForApiCalls(loginInfo, labels);
// const processedMilestonesForApiCalls = processMilestonesForApiCalls(loginInfo, labels);
// };
