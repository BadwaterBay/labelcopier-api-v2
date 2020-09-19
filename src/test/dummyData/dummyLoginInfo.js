import loadEnvVars from './loadEnvVars';

const loadAndParseEnvVars = (envVarName) => {
  const envVars = loadEnvVars();
  const envVarsParsed = envVars.parsed;

  if (envVarsParsed && envVarsParsed[envVarName]) {
    return envVarsParsed[envVarName];
  }

  return null;
};

export const loadHomeRepoOwnerFromEnv = () =>
  loadAndParseEnvVars('HOME_REPO_OWNER') || 'home-repo-owner';

export const loadHomeRepoNameFromEnv = () =>
  loadAndParseEnvVars('HOME_REPO_NAME') || 'home-repo-name';

export const loadTokenFromEnv = () => loadAndParseEnvVars('LABELCOPIER_TOKEN') || '';

export const dummyLoginInfo = (() => ({
  homeRepoOwner: loadHomeRepoOwnerFromEnv(),
  homeRepoName: loadHomeRepoNameFromEnv(),
  templateRepoOwner: 'template-repo-owner',
  templateRepoName: 'template-repo-name',
  token: loadTokenFromEnv(),
}))();
