import { expect } from 'chai';

import {
  validKinds,
  validateKindOrThrowError,
  validModes,
  validateModeOrThrowError,
} from '../core/dataValidation';

describe('Test validKinds', () => {
  it('It is non-empty', () => {
    expect(validKinds).to.not.be.empty;
  });

  it('It has a size of 2', () => {
    expect(validKinds).to.have.lengthOf(2);
  });

  it("It has 'labels'", () => {
    expect(validKinds).to.include('labels');
  });

  it("It has 'milestones'", () => {
    expect(validKinds).to.include('milestones');
  });

  it('Test it with an invalid kind, expecting an error to be thrown', () => {
    expect(validKinds).to.not.include('nonexistence-kind');
  });
});

describe('Test validateKindOrThrowError', () => {
  it("'labels' is valid", () => {
    const input = 'labels';

    const output = validateKindOrThrowError(input);

    expect(output).to.be.true;
  });

  it("'milestones' is valid", () => {
    const input = 'milestones';

    const output = validateKindOrThrowError(input);

    expect(output).to.be.true;
  });

  it('Test it with an invalid kind, expecting an error to be thrown', () => {
    const input = 'nonexistence-kind';

    expect(() => validateKindOrThrowError(input)).to.throw();
  });
});

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
