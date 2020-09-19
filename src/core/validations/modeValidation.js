import { InvalidModeError } from '../customErrors';

export const validModes = new Set(['list', 'copy', 'create']);

export const validateModeOrThrowError = (mode) => {
  if (!validModes.has(mode)) {
    throw new InvalidModeError(mode);
  }

  return true;
};
