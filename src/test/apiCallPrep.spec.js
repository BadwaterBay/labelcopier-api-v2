import { expect } from 'chai';

import {
  apiPaginationLimit,
  getRepoInfoFromLoginInfo,
  composeUrlForListingEntries,
} from '../core/apiCall';

import { dummyLoginInfo } from './dummyData';

const loginInfo = dummyLoginInfo;

describe('Test apiPaginationLimit', () => {
  it('It is a number', () => {
    expect(apiPaginationLimit).to.be.a('number');
  });

  it('It is >= 1 and <= 100', () => {
    expect(apiPaginationLimit).to.be.within(1, 100);
  });

  it('It is 100', () => {
    expect(apiPaginationLimit).to.deep.equal(100);
  });
});

describe('Test getRepoInfoFromLoginInfo', () => {
  it("Return value is a string with argument (loginInfo, 'list', 'owner')", () => {
    const mode = 'list';
    const ownerOrName = 'owner';

    const output = getRepoInfoFromLoginInfo(loginInfo, mode, ownerOrName);

    expect(output).to.be.a('string');
  });

  it("Return value matches expected value with argument (loginInfo, 'list', 'owner')", () => {
    const mode = 'list';
    const ownerOrName = 'owner';

    const output = getRepoInfoFromLoginInfo(loginInfo, mode, ownerOrName);

    expect(output).to.deep.equal('home-repo-owner');
  });

  it("Return value is a string with argument (loginInfo, 'list', 'name')", () => {
    const mode = 'list';
    const ownerOrName = 'name';

    const output = getRepoInfoFromLoginInfo(loginInfo, mode, ownerOrName);

    expect(output).to.be.a('string');
  });

  it("Return value matches expected value with argument (loginInfo, 'list', 'name')", () => {
    const mode = 'list';
    const ownerOrName = 'name';

    const output = getRepoInfoFromLoginInfo(loginInfo, mode, ownerOrName);

    expect(output).to.deep.equal('home-repo-name');
  });

  it("Return value is a string with argument (loginInfo, 'copy', 'owner')", () => {
    const mode = 'copy';
    const ownerOrName = 'owner';

    const output = getRepoInfoFromLoginInfo(loginInfo, mode, ownerOrName);

    expect(output).to.be.a('string');
  });

  it("Return value matches expected value with argument (loginInfo, 'copy', 'owner')", () => {
    const mode = 'copy';
    const ownerOrName = 'owner';

    const output = getRepoInfoFromLoginInfo(loginInfo, mode, ownerOrName);

    expect(output).to.deep.equal('template-repo-owner');
  });

  it("Return value is a string with argument (loginInfo, loginInfo, 'copy', 'name')", () => {
    const mode = 'copy';
    const ownerOrName = 'name';

    const output = getRepoInfoFromLoginInfo(loginInfo, mode, ownerOrName);

    expect(output).to.be.a('string');
  });

  it("Return value matches expected value with argument (loginInfo, loginInfo, 'copy', 'name')", () => {
    const mode = 'copy';
    const ownerOrName = 'name';

    const output = getRepoInfoFromLoginInfo(loginInfo, mode, ownerOrName);

    expect(output).to.deep.equal('template-repo-name');
  });
});

describe('Test composeUrlForListingEntries', () => {
  it('Test the return value is a string', () => {
    const output = composeUrlForListingEntries();

    expect(output).to.be.a('string');
  });

  it('Test the return value has a length greater than 56', () => {
    const output = composeUrlForListingEntries();

    expect(output).to.have.lengthOf.above(56);
  });

  it('Test the return value with default arguments', () => {
    const output = composeUrlForListingEntries();

    const answerKey =
      'https://api.github.com/repos/home-repo-owner/home-repo-name/labels?per_page=100&page=1';

    expect(output).to.deep.equal(answerKey);
  });

  it("Test the return value with argument ('labels')", () => {
    const output = composeUrlForListingEntries('labels');

    const answerKey =
      'https://api.github.com/repos/home-repo-owner/home-repo-name/labels?per_page=100&page=1';

    expect(output).to.deep.equal(answerKey);
  });

  it("Test the return value with argument ('milestones')", () => {
    const output = composeUrlForListingEntries('milestones');

    const answerKey =
      'https://api.github.com/repos/home-repo-owner/home-repo-name/milestones?per_page=100&page=1&state=all';

    expect(output).to.deep.equal(answerKey);
  });

  it("Test the return value with argument ('labels', 1)", () => {
    const output = composeUrlForListingEntries('labels', 1);

    const answerKey =
      'https://api.github.com/repos/home-repo-owner/home-repo-name/labels?per_page=100&page=1';

    expect(output).to.deep.equal(answerKey);
  });

  it("Test the return value with argument ('labels', 23)", () => {
    const output = composeUrlForListingEntries('labels', 23);

    const answerKey =
      'https://api.github.com/repos/home-repo-owner/home-repo-name/labels?per_page=100&page=23';

    expect(output).to.deep.equal(answerKey);
  });

  it("Test the return value with argument ('milestones', 1)", () => {
    const output = composeUrlForListingEntries('milestones', 1);

    const answerKey =
      'https://api.github.com/repos/home-repo-owner/home-repo-name/milestones?per_page=100&page=1&state=all';

    expect(output).to.deep.equal(answerKey);
  });

  it("Test the return value with argument ('milestones', 29)", () => {
    const output = composeUrlForListingEntries('milestones', 29);

    const answerKey =
      'https://api.github.com/repos/home-repo-owner/home-repo-name/milestones?per_page=100&page=29&state=all';

    expect(output).to.deep.equal(answerKey);
  });

  it("Test the return value with argument ('labels', 23, 'list')", () => {
    const output = composeUrlForListingEntries('labels', 23, 'list');

    const answerKey =
      'https://api.github.com/repos/home-repo-owner/home-repo-name/labels?per_page=100&page=23';

    expect(output).to.deep.equal(answerKey);
  });

  it("Test the return value with argument ('labels', 23, 'copy')", () => {
    const output = composeUrlForListingEntries('labels', 23, 'copy');

    const answerKey =
      'https://api.github.com/repos/template-repo-owner/template-repo-name/labels?per_page=100&page=23';

    expect(output).to.deep.equal(answerKey);
  });

  it("Test the return value with argument ('milestones', 29, 'list')", () => {
    const output = composeUrlForListingEntries('milestones', 29, 'list');

    const answerKey =
      'https://api.github.com/repos/home-repo-owner/home-repo-name/milestones?per_page=100&page=29&state=all';

    expect(output).to.deep.equal(answerKey);
  });

  it("Test the return value with argument ('milestones', 29, 'copy')", () => {
    const output = composeUrlForListingEntries('milestones', 29, 'copy');

    const answerKey =
      'https://api.github.com/repos/template-repo-owner/template-repo-name/milestones?per_page=100&page=29&state=all';

    expect(output).to.deep.equal(answerKey);
  });

  it('Test with an invalid kind, expecting an error to be thrown', () => {
    expect(() => composeUrlForListingEntries('invalid-kind')).to.throw(
      Error,
      /invalid kind/i
    );
  });

  it('Test with an invalid mode, expecting an error to be thrown', () => {
    expect(() => composeUrlForListingEntries('labels', 1, 'invalid-mode')).to.throw(
      Error,
      /invalid mode/i
    );
  });
});
