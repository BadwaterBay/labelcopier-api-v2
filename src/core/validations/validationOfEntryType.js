import validateOrThrow from './validationMethods';
import { InvalidEntryTypeError } from '../customErrors';

export const getValidEntryTypes = () => new Set().add('labels').add('milestones');

export const validateEntryTypeOrThrow = (entryType) => {
  const isValid = validateOrThrow(entryType, getValidEntryTypes, InvalidEntryTypeError);

  return isValid;
};
