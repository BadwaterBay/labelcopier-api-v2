import InvalidModeError from './customErrors/InvalidModeError';

export const validModes = new Set(['list', 'copy']);

export const validateModeOrThrowError = (mode) => {
  if (!validModes.has(mode)) {
    throw new InvalidModeError(mode);
  }

  return true;
};
