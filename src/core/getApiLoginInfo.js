import { dummyLoginInfo } from '../test/dummyData';

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

export const getLoginInfo = () => {
  return dummyLoginInfo;
};

export const getRepoInfoFromLoginInfo = (loginInfo, ownerOrName, mode = 'list') => {
  const key = loginInfoLookupTable[mode][ownerOrName];
  return loginInfo[key];
};
