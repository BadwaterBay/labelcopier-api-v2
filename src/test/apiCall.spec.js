import { expect } from 'chai';

import {
  getLoginInfo,
  apiPaginationLimit,
  getRepoOwnerFromLoginInfo,
  getRepoNameFromLoginInfo,
  composeUrlForFetchingEntriesFromServer,
} from '../core/apiCall';

describe('Test apiPaginationLimit', () => {
  it('Test it is a number', () => {
    expect(apiPaginationLimit).to.be.a('number');
  });

  it('Test it is >= 1 and <= 100', () => {
    expect(apiPaginationLimit).to.be.within(1, 100);
  });

  it('Test it is 100', () => {
    expect(apiPaginationLimit).to.deep.equal(100);
  });
});

describe('Test getRepoOwnerFromLoginInfo', () => {
  it("Test with mode 'list'", () => {
    const loginInfo = getLoginInfo();

    const mode = 'list';

    const output = getRepoOwnerFromLoginInfo(loginInfo, mode);

    const answerKey = 'home-repo-owner';

    expect(output).to.deep.equal(answerKey);
  });

  it("Test with mode 'copy'", () => {
    const loginInfo = getLoginInfo();

    const mode = 'copy';

    const output = getRepoOwnerFromLoginInfo(loginInfo, mode);

    const answerKey = 'template-repo-owner';

    expect(output).to.deep.equal(answerKey);
  });
});

describe('Test getRepoNameFromLoginInfo', () => {
  it("Test with mode 'list'", () => {
    const loginInfo = getLoginInfo();

    const mode = 'list';

    const output = getRepoNameFromLoginInfo(loginInfo, mode);

    const answerKey = 'home-repo-name';

    expect(output).to.deep.equal(answerKey);
  });

  it("Test with mode 'copy'", () => {
    const loginInfo = getLoginInfo();

    const mode = 'copy';

    const output = getRepoNameFromLoginInfo(loginInfo, mode);

    const answerKey = 'template-repo-name';

    expect(output).to.deep.equal(answerKey);
  });
});

describe('Test composeUrlForFetchingEntriesFromServer', () => {
  it('Test the return value is a string', () => {
    const output = composeUrlForFetchingEntriesFromServer();

    expect(output).to.be.a('string');
  });

  it('Test the return value has a length greater than 56', () => {
    const output = composeUrlForFetchingEntriesFromServer();

    expect(output).to.have.lengthOf.above(56);
  });

  it('Test the return value with default arguments', () => {
    const output = composeUrlForFetchingEntriesFromServer();

    const answerKey =
      'https://api.github.com/repos/home-repo-owner/home-repo-name/labels?per_page=100&page=1';

    expect(output).to.deep.equal(answerKey);
  });

  it("Test the return value with argument ('labels')", () => {
    const output = composeUrlForFetchingEntriesFromServer('labels');

    const answerKey =
      'https://api.github.com/repos/home-repo-owner/home-repo-name/labels?per_page=100&page=1';

    expect(output).to.deep.equal(answerKey);
  });

  it("Test the return value with argument ('milestones')", () => {
    const output = composeUrlForFetchingEntriesFromServer('milestones');

    const answerKey =
      'https://api.github.com/repos/home-repo-owner/home-repo-name/milestones?per_page=100&page=1&state=all';

    expect(output).to.deep.equal(answerKey);
  });

  it("Test the return value with argument ('labels', 1)", () => {
    const output = composeUrlForFetchingEntriesFromServer('labels', 1);

    const answerKey =
      'https://api.github.com/repos/home-repo-owner/home-repo-name/labels?per_page=100&page=1';

    expect(output).to.deep.equal(answerKey);
  });

  it("Test the return value with argument ('labels', 23)", () => {
    const output = composeUrlForFetchingEntriesFromServer('labels', 23);

    const answerKey =
      'https://api.github.com/repos/home-repo-owner/home-repo-name/labels?per_page=100&page=23';

    expect(output).to.deep.equal(answerKey);
  });

  it("Test the return value with argument ('milestones', 1)", () => {
    const output = composeUrlForFetchingEntriesFromServer('milestones', 1);

    const answerKey =
      'https://api.github.com/repos/home-repo-owner/home-repo-name/milestones?per_page=100&page=1&state=all';

    expect(output).to.deep.equal(answerKey);
  });

  it("Test the return value with argument ('milestones', 29)", () => {
    const output = composeUrlForFetchingEntriesFromServer('milestones', 29);

    const answerKey =
      'https://api.github.com/repos/home-repo-owner/home-repo-name/milestones?per_page=100&page=29&state=all';

    expect(output).to.deep.equal(answerKey);
  });

  it("Test the return value with argument ('labels', 23, 'list')", () => {
    const output = composeUrlForFetchingEntriesFromServer('labels', 23, 'list');

    const answerKey =
      'https://api.github.com/repos/home-repo-owner/home-repo-name/labels?per_page=100&page=23';

    expect(output).to.deep.equal(answerKey);
  });

  it("Test the return value with argument ('labels', 23, 'copy')", () => {
    const output = composeUrlForFetchingEntriesFromServer('labels', 23, 'copy');

    const answerKey =
      'https://api.github.com/repos/template-repo-owner/template-repo-name/labels?per_page=100&page=23';

    expect(output).to.deep.equal(answerKey);
  });

  it("Test the return value with argument ('milestones', 29, 'list')", () => {
    const output = composeUrlForFetchingEntriesFromServer('milestones', 29, 'list');

    const answerKey =
      'https://api.github.com/repos/home-repo-owner/home-repo-name/milestones?per_page=100&page=29&state=all';

    expect(output).to.deep.equal(answerKey);
  });

  it("Test the return value with argument ('milestones', 29, 'copy')", () => {
    const output = composeUrlForFetchingEntriesFromServer('milestones', 29, 'copy');

    const answerKey =
      'https://api.github.com/repos/template-repo-owner/template-repo-name/milestones?per_page=100&page=29&state=all';

    expect(output).to.deep.equal(answerKey);
  });
});
