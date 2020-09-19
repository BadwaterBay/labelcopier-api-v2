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
  const loginInfo = getLoginInfo();
  const key = loginInfoLookupTable[homeOrTemplateRepo][ownerOrName];

  return loginInfo[key];
};

export const getRepoOwnerAndName = (mode = 'list') => {
  let homeOrTemplateRepo;

  if (mode !== 'copy') {
    homeOrTemplateRepo = 'home';
  } else {
    homeOrTemplateRepo = 'template';
  }

  const repoOwner = getRepoInfoFromLoginInfo('owner', homeOrTemplateRepo);
  const repoName = getRepoInfoFromLoginInfo('name', homeOrTemplateRepo);

  return {
    repoOwner,
    repoName,
  };
};
