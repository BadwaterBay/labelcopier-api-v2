import loadDotEnv from './loadDotEnv.setup.test';

const loadEnvVarIfDefined = (envVarName) => {
  const loadedEnvVars = loadDotEnv();
  const parsedEnvVars = loadedEnvVars.parsed;
  const envVarIsDefined = parsedEnvVars && parsedEnvVars[envVarName];

  if (envVarIsDefined) {
    return parsedEnvVars[envVarName];
  }

  return null;
};

export const loadHomeRepoOwnerFromDotEnv = () =>
  loadEnvVarIfDefined('HOME_REPO_OWNER') || 'home-repo-owner';

export const loadHomeRepoNameFromDotEnv = () =>
  loadEnvVarIfDefined('HOME_REPO_NAME') || 'home-repo-name';

export const loadOtherRepoOwnerFromDotEnv = () => 'other-repo-owner';

export const loadOtherRepoNameFromDotEnv = () => 'other-repo-name';

export const loadTokenFromDotEnv = () => loadEnvVarIfDefined('LABELCOPIER_TOKEN') || '';

export const getDummyLoginInfo = () => ({
  homeRepoOwner: loadHomeRepoOwnerFromDotEnv(),
  homeRepoName: loadHomeRepoNameFromDotEnv(),
  otherRepoOwner: loadOtherRepoOwnerFromDotEnv(),
  otherRepoName: loadOtherRepoNameFromDotEnv(),
  token: loadTokenFromDotEnv(),
});
