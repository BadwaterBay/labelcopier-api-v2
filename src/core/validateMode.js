export const validModes = new Set(['list', 'copy']);

export const validateModeOrThrowError = (mode) => {
  if (validModes.has(mode)) {
    return true;
  }

  throw new Error('Invalid mode was given.');
};
