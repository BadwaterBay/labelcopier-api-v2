import { expect } from 'chai';

import { validKinds, validateKindOrThrowError } from '../core/validateKind';

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
