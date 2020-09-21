import { InvalidActionError } from '../customErrors';

export const getValidActions = () =>
  new Set().add('list').add('copy').add('create').add('update');

export const validateActionOrThrow = (action) => {
  const validActions = getValidActions();
  const givenActionIsInvalid = !validActions.has(action);

  if (givenActionIsInvalid) {
    throw new InvalidActionError(action);
  }

  return true;
};
