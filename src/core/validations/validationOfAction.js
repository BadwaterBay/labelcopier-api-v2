import validateOrThrow from './validationMethods';
import { InvalidActionError } from '../customErrors';

export const getValidActions = () =>
  new Set().add('list').add('copy').add('create').add('update');

export const validateActionOrThrow = (action) => {
  const isValid = validateOrThrow(action, getValidActions, InvalidActionError);

  return isValid;
};
