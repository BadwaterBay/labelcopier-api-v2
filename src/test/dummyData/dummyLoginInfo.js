import loadDotEnv from './loadDotEnv';

const loadAndParseEnvVars = (envVarName) => {
  const envVars = loadDotEnv();
  const parsedEnvVars = envVars.parsed;

  if (parsedEnvVars && parsedEnvVars[envVarName]) {
    return parsedEnvVars[envVarName];
  }

  return null;
};

export const loadHomeRepoOwnerFromEnv = () =>
  loadAndParseEnvVars('HOME_REPO_OWNER') || 'home-repo-owner';

export const loadHomeRepoNameFromEnv = () =>
  loadAndParseEnvVars('HOME_REPO_NAME') || 'home-repo-name';

export const loadTemplateRepoOwnerFromEnv = () => 'template-repo-owner';

export const loadTemplateRepoNameFromEnv = () => 'template-repo-name';

export const loadTokenFromEnv = () => loadAndParseEnvVars('LABELCOPIER_TOKEN') || '';

export const dummyLoginInfo = (() => ({
  homeRepoOwner: loadHomeRepoOwnerFromEnv(),
  homeRepoName: loadHomeRepoNameFromEnv(),
  templateRepoOwner: loadTemplateRepoOwnerFromEnv(),
  templateRepoName: loadTemplateRepoNameFromEnv(),
  token: loadTokenFromEnv(),
}))();
