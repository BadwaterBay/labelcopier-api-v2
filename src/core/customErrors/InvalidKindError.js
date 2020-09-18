import ValidationError from './ValidationError';

export default class InvalidKindError extends ValidationError {
  constructor(kind) {
    const message = `Invalid kind '${kind}' was given.`;
    super(message);
  }
}
