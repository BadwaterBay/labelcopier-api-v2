import { InvalidEntryTypeError } from '../customErrors';

export const getValidEntryTypes = () => new Set().add('labels').add('milestones');

export const validateEntryTypeOrThrow = (entryType) => {
  const validEntryTypes = getValidEntryTypes();
  const givenEntryTypeIsInvalid = !validEntryTypes.has(entryType);

  if (givenEntryTypeIsInvalid) {
    throw new InvalidEntryTypeError(entryType);
  }

  return true;
};
