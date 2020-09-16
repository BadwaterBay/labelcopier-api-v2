import { expect } from 'chai';

import { validModes, validateModeOrThrowError } from '../core/validateMode';

suite('Test validModes', () => {
  test('It is non-empty', () => {
    expect(validModes).to.not.be.empty;
  });

  test('It has a size of 2', () => {
    expect(validModes).to.have.lengthOf(2);
  });

  test("'list' is valid", () => {
    expect(validModes).to.include('list');
  });

  test("'copy' is valid", () => {
    expect(validModes).to.include('copy');
  });

  test('Test it with an invalid mode, expecting an error to be thrown', () => {
    expect(validModes).to.not.include('nonexistence-mode');
  });
});

suite('Test validateModeOrThrowError', () => {
  test("'list' is valid", () => {
    const input = 'list';

    const output = validateModeOrThrowError(input);

    expect(output).to.be.true;
  });

  test("'copy' is valid", () => {
    const input = 'copy';

    const output = validateModeOrThrowError(input);

    expect(output).to.be.true;
  });

  test('Test it with an invalid mode, expecting an error to be thrown', () => {
    const input = 'nonexistence-mode';

    expect(() => validateModeOrThrowError(input)).to.throw();
  });
});
