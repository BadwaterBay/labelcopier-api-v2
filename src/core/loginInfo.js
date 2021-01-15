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

export const getRepoInfoFromLoginInfo = (
  loginInfo,
  repoOwnerOrRepoName,
  homeRepoOrTemplateRepo
) => {
  const key = getKeyToLoginInfo(repoOwnerOrRepoName, homeRepoOrTemplateRepo);
  return loginInfo[key];
};

export const getRepoOwnerAndRepoName = (loginInfo, action) => {
  let homeRepoOrTemplateRepo;
  const actionIsToCopyEntriesFromAntemplateRepo = action === 'copy';

  if (actionIsToCopyEntriesFromAntemplateRepo) {
    homeRepoOrTemplateRepo = 'other';
  } else {
    homeRepoOrTemplateRepo = 'home';
  }

  const repoOwner = getRepoInfoFromLoginInfo(loginInfo, 'owner', homeRepoOrTemplateRepo);
  const repoName = getRepoInfoFromLoginInfo(loginInfo, 'name', homeRepoOrTemplateRepo);

  return { repoOwner, repoName };
};
