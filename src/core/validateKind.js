import InvalidKindError from './customErrors/InvalidKindError';

export const validKinds = new Set(['labels', 'milestones']);

export const validateKindOrThrowError = (kind) => {
  if (!validKinds.has(kind)) {
    throw new InvalidKindError(kind);
  }

  return true;
};
