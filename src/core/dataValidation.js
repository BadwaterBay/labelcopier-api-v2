export const validKinds = new Set(['labels', 'milestones']);

export const validateKindOrThrowError = (kindToBeValidated) => {
  if (validKinds.has(kindToBeValidated)) {
    return true;
  }

  throw new Error('Invalid kind was given.');
};

export const validModes = new Set(['list', 'copy']);

export const validateModeOrThrowError = (modeToBeValidated) => {
  if (validModes.has(modeToBeValidated)) {
    return true;
  }

  throw new Error('Invalid mode was given.');
};
