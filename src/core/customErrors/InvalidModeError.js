import ValidationError from './ValidationError';

export default class InvalidModeError extends ValidationError {
  constructor(mode) {
    const message = `Invalid mode '${mode}' was given.`;
    super(message);
  }
}
