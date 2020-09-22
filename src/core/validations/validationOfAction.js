import validateOrThrow from './validationMethods';
import { InvalidActionError } from './validationErrorClasses';

export const getValidActions = () => new Set(['list', 'copy', 'create', 'update']);

export const validateActionOrThrow = (action) => {
  const isValid = validateOrThrow(action, getValidActions, InvalidActionError);

  return isValid;
};
