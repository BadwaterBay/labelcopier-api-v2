export const validKinds = new Set(['labels', 'milestones']);

export const validateKindOrThrowError = (kind) => {
  if (validKinds.has(kind)) {
    return true;
  }

  throw new Error('Invalid kind was given.');
};
