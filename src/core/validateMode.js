export const validModes = new Set(['list', 'copy']);

export const validateModeOrThrowError = (modeToBeValidated) => {
  if (validModes.has(modeToBeValidated)) {
    return true;
  }

  throw new Error('Invalid mode was given.');
};
