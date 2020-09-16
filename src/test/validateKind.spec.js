import { expect } from 'chai';

import { validKinds, validateKindOrThrowError } from '../core/validateKind';

suite('Test validKinds', () => {
  test('It is non-empty', () => {
    expect(validKinds).to.not.be.empty;
  });

  test('It has a size of 2', () => {
    expect(validKinds).to.have.lengthOf(2);
  });

  test("It has 'labels'", () => {
    expect(validKinds).to.include('labels');
  });

  test("It has 'milestones'", () => {
    expect(validKinds).to.include('milestones');
  });

  test('Test it with an invalid kind, expecting an error to be thrown', () => {
    expect(validKinds).to.not.include('nonexistence-kind');
  });
});

suite('Test validateKindOrThrowError', () => {
  test("'labels' is valid", () => {
    const input = 'labels';

    const output = validateKindOrThrowError(input);

    expect(output).to.be.true;
  });

  test("'milestones' is valid", () => {
    const input = 'milestones';

    const output = validateKindOrThrowError(input);

    expect(output).to.be.true;
  });

  test('Test it with an invalid kind, expecting an error to be thrown', () => {
    const input = 'nonexistence-kind';

    expect(() => validateKindOrThrowError(input)).to.throw();
  });
});
