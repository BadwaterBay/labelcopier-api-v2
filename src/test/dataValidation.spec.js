import { expect } from 'chai';

import {
  validKinds,
  validateKind,
  validModes,
  validateMode,
} from '../core/dataValidation';

describe('Test validKinds', () => {
  it('Test validKinds is non-empty', () => {
    expect(validKinds).to.not.be.empty;
  });

  it('Test validKinds has a size of 2', () => {
    expect(validKinds).to.have.lengthOf(2);
  });

  it("Test validKinds has 'labels'", () => {
    expect(validKinds).to.include('labels');
  });

  it("Test validKinds has 'milestones'", () => {
    expect(validKinds).to.include('milestones');
  });

  it('Test valiKinds with an invalid kind', () => {
    expect(validKinds).to.not.include('nonexistence-kind');
  });
});

describe('Test validateKind', () => {
  it("Test if 'labels' is valid", () => {
    const input = 'labels';

    const output = validateKind(input);

    expect(output).to.be.true;
  });

  it("Test if 'milestones' is valid", () => {
    const input = 'milestones';

    const output = validateKind(input);

    expect(output).to.be.true;
  });

  it('Test an invalid kind, expecting an error to be thrown', () => {
    const input = 'nonexistence-kind';

    expect(() => validateKind(input)).to.throw();
  });
});

describe('Test validModes', () => {
  it('Test validModes is non-empty', () => {
    expect(validModes).to.not.be.empty;
  });

  it('Test validModes has a size of 2', () => {
    expect(validModes).to.have.lengthOf(2);
  });

  it("Test validModes has 'list'", () => {
    expect(validModes).to.include('list');
  });

  it("Test validModes has 'copy'", () => {
    expect(validModes).to.include('copy');
  });

  it('Test valiModes with an invalid mode', () => {
    expect(validModes).to.not.include('nonexistence-mode');
  });
});

describe('Test validateMode', () => {
  it("Test if 'list' is valid", () => {
    const input = 'list';

    const output = validateMode(input);

    expect(output).to.be.true;
  });

  it("Test if 'copy' is valid", () => {
    const input = 'copy';

    const output = validateMode(input);

    expect(output).to.be.true;
  });

  it('Test an invalid mode, expecting an error to be thrown', () => {
    const input = 'nonexistence-mode';

    expect(() => validateMode(input)).to.throw();
  });
});
