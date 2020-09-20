import { dummyLoginInfo } from '../test/dummyData/dummyLoginInfo';

export const getLoginInfo = () => dummyLoginInfo;

export const loginInfoLookupTable = {
  home: {
    owner: 'homeRepoOwner',
    name: 'homeRepoName',
  },
  template: {
    owner: 'templateRepoOwner',
    name: 'templateRepoName',
  },
};

export const getRepoInfoFromLoginInfo = (ownerOrName, homeOrTemplateRepo) => {
  const key = loginInfoLookupTable[homeOrTemplateRepo][ownerOrName];
  const loginInfo = getLoginInfo();

  return loginInfo[key];
};

export const getRepoOwnerAndName = (mode) => {
  let homeOrTemplateRepo;

  if (mode === 'copy') {
    homeOrTemplateRepo = 'template';
  } else {
    homeOrTemplateRepo = 'home';
  }

  const repoOwner = getRepoInfoFromLoginInfo('owner', homeOrTemplateRepo);
  const repoName = getRepoInfoFromLoginInfo('name', homeOrTemplateRepo);

  return {
    repoOwner,
    repoName,
  };
};
