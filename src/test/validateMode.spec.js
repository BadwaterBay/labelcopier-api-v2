import { expect } from 'chai';

import { validModes, validateModeOrThrowError } from '../core/validateMode';

describe('Test validModes', () => {
  it('It is non-empty', () => {
    expect(validModes).to.not.be.empty;
  });

  it('It has a size of 2', () => {
    expect(validModes).to.have.lengthOf(2);
  });

  it("'list' is valid", () => {
    expect(validModes).to.include('list');
  });

  it("'copy' is valid", () => {
    expect(validModes).to.include('copy');
  });

  it('Test it with an invalid mode, expecting an error to be thrown', () => {
    expect(validModes).to.not.include('nonexistence-mode');
  });
});

describe('Test validateModeOrThrowError', () => {
  it("'list' is valid", () => {
    const input = 'list';

    const output = validateModeOrThrowError(input);

    expect(output).to.be.true;
  });

  it("'copy' is valid", () => {
    const input = 'copy';

    const output = validateModeOrThrowError(input);

    expect(output).to.be.true;
  });

  it('Test it with an invalid mode, expecting an error to be thrown', () => {
    const input = 'nonexistence-mode';

    expect(() => validateModeOrThrowError(input)).to.throw();
  });
});
