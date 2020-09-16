export const validKinds = new Set(['labels', 'milestones']);

export const validateKindOrThrowError = (kindToBeValidated) => {
  if (validKinds.has(kindToBeValidated)) {
    return true;
  }

  throw new Error('Invalid kind was given.');
};
