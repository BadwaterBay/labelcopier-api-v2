import { getDummyLoginInfo } from '../test/dummyData/dummyLoginInfo.setup.test';

export const getLoginInfo = () => getDummyLoginInfo();

export const getKeyToLoginInfo = (repoOwnerOrRepoName, homeRepoOrTemplateRepo) => {
  const keys = {
    home: {
      owner: 'homeRepoOwner',
      name: 'homeRepoName',
    },
    other: {
      owner: 'templateRepoOwner',
      name: 'templateRepoName',
    },
  };

  return keys[homeRepoOrTemplateRepo][repoOwnerOrRepoName];
};

export const getRepoInfoFromLoginInfo = (repoOwnerOrRepoName, homeRepoOrTemplateRepo) => {
  const key = getKeyToLoginInfo(repoOwnerOrRepoName, homeRepoOrTemplateRepo);
  const loginInfo = getLoginInfo();

  return loginInfo[key];
};

export const getRepoOwnerAndRepoName = (action) => {
  let homeRepoOrTemplateRepo;

  const actionIsToCopyEntriesFromAntemplateRepo = action === 'copy';

  if (actionIsToCopyEntriesFromAntemplateRepo) {
    homeRepoOrTemplateRepo = 'other';
  } else {
    homeRepoOrTemplateRepo = 'home';
  }

  const repoOwner = getRepoInfoFromLoginInfo('owner', homeRepoOrTemplateRepo);
  const repoName = getRepoInfoFromLoginInfo('name', homeRepoOrTemplateRepo);

  return {
    repoOwner,
    repoName,
  };
};
