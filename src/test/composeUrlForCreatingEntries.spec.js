import { expect } from 'chai';

import { httpUriBase } from '../core/apiCallOptions';
import { composeUrlForCreatingEntries } from '../core/apiCallToCreate';
import { loadHomeRepoOwnerFromEnv, loadHomeRepoNameFromEnv } from './dummyData';

suite('Test composeUrlForCreatingEntries', () => {
  const homeRepoOwner = loadHomeRepoOwnerFromEnv();
  const homeRepoName = loadHomeRepoNameFromEnv();

  test('Test the return value is a string', () => {
    const output = composeUrlForCreatingEntries();
    expect(output).to.be.a('string');
  });

  test('Test the return value has a length greater than 42', () => {
    const output = composeUrlForCreatingEntries();
    expect(output).to.have.lengthOf.above(42);
  });

  test('Test the return value with default arguments', () => {
    const output = composeUrlForCreatingEntries();

    const answerKey = `${httpUriBase}${homeRepoOwner}/${homeRepoName}/labels`;

    expect(output).to.deep.equal(answerKey);
  });

  test("Test the return value with argument ('labels')", () => {
    const output = composeUrlForCreatingEntries('labels');

    const answerKey = `${httpUriBase}${homeRepoOwner}/${homeRepoName}/labels`;

    expect(output).to.deep.equal(answerKey);
  });

  test("Test the return value with argument ('milestones')", () => {
    const output = composeUrlForCreatingEntries('milestones');

    const answerKey = `${httpUriBase}${homeRepoOwner}/${homeRepoName}/milestones`;

    expect(output).to.deep.equal(answerKey);
  });

  test('Test with an invalid kind, expecting an error to be thrown', () => {
    expect(() => composeUrlForCreatingEntries('invalid-kind')).to.throw(
      Error,
      /invalid kind/i
    );
  });
});
