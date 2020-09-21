import { getDummyLoginInfo } from '../test/dummyData/dummyLoginInfo.setup.test';

export const getLoginInfo = () => getDummyLoginInfo();

export const getKeyToLoginInfo = (repoOwnerOrRepoName, homeRepoOrOtherRepo) => {
  const keys = {
    home: {
      owner: 'homeRepoOwner',
      name: 'homeRepoName',
    },
    other: {
      owner: 'otherRepoOwner',
      name: 'otherRepoName',
    },
  };

  return keys[homeRepoOrOtherRepo][repoOwnerOrRepoName];
};

export const getRepoInfoFromLoginInfo = (repoOwnerOrRepoName, homeRepoOrOtherRepo) => {
  const key = getKeyToLoginInfo(repoOwnerOrRepoName, homeRepoOrOtherRepo);
  const loginInfo = getLoginInfo();

  return loginInfo[key];
};

export const getRepoOwnerAndRepoName = (action) => {
  let homeRepoOrOtherRepo;

  const actionIsToCopyEntriesFromAnotherRepo = action === 'copy';

  if (actionIsToCopyEntriesFromAnotherRepo) {
    homeRepoOrOtherRepo = 'other';
  } else {
    homeRepoOrOtherRepo = 'home';
  }

  const repoOwner = getRepoInfoFromLoginInfo('owner', homeRepoOrOtherRepo);
  const repoName = getRepoInfoFromLoginInfo('name', homeRepoOrOtherRepo);

  return {
    repoOwner,
    repoName,
  };
};
