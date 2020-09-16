import dotenv from 'dotenv';

const loadEnvVars = () => {
  const envVars = dotenv.config();
  return envVars;
};

export default loadEnvVars;
