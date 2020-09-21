import ValidationError from './ValidationError';

export default class InvalidEntryTypeError extends ValidationError {
  constructor(entryType) {
    const message = `Invalid entryType '${entryType}' was given.`;
    super(message);
  }
}
