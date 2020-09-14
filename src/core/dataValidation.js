export const validKinds = new Set(['labels', 'milestones']);

export const validateKind = (kindToBeValidated) => {
  if (validKinds.has(kindToBeValidated)) {
    return true;
  }

  throw new Error('Invalid kind was given.');
};

export const validModes = new Set(['list', 'copy']);

export const validateMode = (modeToBeValidated) => {
  if (validModes.has(modeToBeValidated)) {
    return true;
  }

  throw new Error('Invalid mode was given.');
};
