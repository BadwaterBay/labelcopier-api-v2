import { expect } from 'chai';

import { composeUrlForCreatingEntries } from '../core/apiCallToCreate';
import { loadHomeRepoOwnerFromEnv, loadHomeRepoNameFromEnv } from './dummyData';

describe('Test composeUrlForCreatingEntries', () => {
  const homeRepoOwner = loadHomeRepoOwnerFromEnv();
  const homeRepoName = loadHomeRepoNameFromEnv();

  it('Test the return value is a string', () => {
    const output = composeUrlForCreatingEntries();
    expect(output).to.be.a('string');
  });

  it('Test the return value has a length greater than 42', () => {
    const output = composeUrlForCreatingEntries();
    expect(output).to.have.lengthOf.above(42);
  });

  it('Test the return value with default arguments', () => {
    const output = composeUrlForCreatingEntries();

    const answerKey = `https://api.github.com/repos/${homeRepoOwner}/${homeRepoName}/labels`;

    expect(output).to.deep.equal(answerKey);
  });

  it("Test the return value with argument ('labels')", () => {
    const output = composeUrlForCreatingEntries('labels');

    const answerKey = `https://api.github.com/repos/${homeRepoOwner}/${homeRepoName}/labels`;

    expect(output).to.deep.equal(answerKey);
  });

  it("Test the return value with argument ('milestones')", () => {
    const output = composeUrlForCreatingEntries('milestones');

    const answerKey = `https://api.github.com/repos/${homeRepoOwner}/${homeRepoName}/milestones`;

    expect(output).to.deep.equal(answerKey);
  });

  it('Test with an invalid kind, expecting an error to be thrown', () => {
    expect(() => composeUrlForCreatingEntries('invalid-kind')).to.throw(
      Error,
      /invalid kind/i
    );
  });
});
