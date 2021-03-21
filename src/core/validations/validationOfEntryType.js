import validateOrThrow from './validationMethods';
import { InvalidEntryTypeError } from './validationErrorClasses';

export const getValidEntryTypes = () => new Set(['labels', 'milestones']);

export const validateEntryTypeOrThrow = (entryType) => {
  const isValid = validateOrThrow(entryType, getValidEntryTypes, InvalidEntryTypeError);
  return isValid;
};
