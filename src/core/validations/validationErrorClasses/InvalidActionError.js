import ValidationError from './ValidationError';

export default class InvalidActionError extends ValidationError {
  constructor(action) {
    const message = `Invalid action '${action}' was given.`;
    super(message);
  }
}
