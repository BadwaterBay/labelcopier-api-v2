import { dummyLoginInfo } from '../test/dummyData';
import { validateModeOrThrowError } from './validateMode';

export const loginInfoLookupTable = {
  list: {
    owner: 'homeRepoOwner',
    name: 'homeRepoName',
  },
  copy: {
    owner: 'templateRepoOwner',
    name: 'templateRepoName',
  },
};

export const getLoginInfo = () => dummyLoginInfo;

export const getRepoInfoFromLoginInfo = (loginInfo, ownerOrName, mode = 'list') => {
  validateModeOrThrowError(mode);

  const key = loginInfoLookupTable[mode][ownerOrName];

  return loginInfo[key];
};
