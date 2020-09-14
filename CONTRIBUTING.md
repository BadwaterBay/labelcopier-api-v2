# Contributing to labelcopier-core-core

:+1::tada: First off, thanks for taking the time to contribute! :tada::+1:

---

## Table of contents

- [Thank you, contributors](#thank-you-contributors)
- [How can I contribute?](#how-can-I-contribute)
  - [Reporting bugs](#reporting-bugs)
  - [Suggesting features and enhancements](#suggesting-features-and-enhancements)
  - [Submitting pull requests](#submitting-pull-requests)
- [How do I get started?](#how-do-I-get-started)
  - [Initial setup](#initial-setup)
  - [Workflow](#workflow)
  - [Bring your fork up to date with the original repository](#bring-your-fork-up-to-date-with-the-original-repository)
  - [Other useful commands](#other-useful-commands)
- [Test-drive development](#test-driven-development)
- [Style guides](#style-guides)
  - [Git commit messages](#git-commit-messages)
- [Other recommended practices](#other-recommended-practices)
  - [Sign commits with signature verifications](#sign-commits-with-signature-verifications)

---

## Thank you, contributors

We'd like to thank [all of our contributors](https://github.com/BadwaterBay/labelcopier-core/graphs/contributors).

---

## How can I contribute?

### Reporting bugs

In the bug report, please follow these steps:

- Use a clear and descriptive title for the issue to identify the problem.
- Describe the exact steps which reproduce the bug.
- Describe the behavior you **_observed_** and point out what exactly is the problem with that behavior.
- Explain the behavior you **_expected_** to see instead and why.
- Include screenshots, animated GIFs or videos to demonstrate the bug.
- Describe the environment in which the bug is observed, including the operating system and the browser you are using (if applicable).

### Suggesting features and enhancements

In the feature or enhancement request, please follow these steps:

- Use a clear and descriptive title for the issue to identify the suggestion.
- Describe the current behavior and explain which behavior you expected to see instead and why.
- Explain why this enhancement would be useful.
- It's encouraged to use screenshots or drawings to demonstrate your point, if it helps.

### Submitting pull requests

Please follow these steps:

- Complete the [initial setup](#initial-setup).
- Follow the [workflow](#workflow).
- Follow the [style guides](#style-guides).
- Any new code needs to have 100% test coverage. A [test-drive development](#test-drive-development) is highly encouraged. However, if you struggle to write tests with your commit, we are here to help. Please ask for help under the corresponding issue or pull request.

---

## How do I get started?

### Initial setup

- Prerequisites: having [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git), [Yarn](https://classic.yarnpkg.com/en/docs/install/) and [Node.js](https://nodejs.org/en/) (preferably 12 or 14) installed on your machine.
- Fork the repository. ([How to fork a repository?](https://help.github.com/en/github/getting-started-with-github/fork-a-repo#fork-an-example-repository))
- Clone the forked repository. ([How to clone a repository?](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository))
- In the terminal, change directory to the repository's root directory.
- Add the original repository as a remote called `upstream`:
  - To add the original repository as `upstream`, run command:
    ```
    git remote add upstream https://github.com/BadwaterBay/labelcopier-core.git
    ```
  - To verify you have added the original repository, run command:
    ```
    git remote -v
    ```
  - You should see the following output (assuming you are using HTTPS):\
    ```
    origin  https://github.com:<yourGitHubUsername>/labelcopier-core.git (fetch)
    origin  https://github.com:<yourGitHubUsername>/labelcopier-core.git (push)
    upstream  https://github.com/BadwaterBay/labelcopier-core.git (fetch)
    upstream  https://github.com/BadwaterBay/labelcopier-core.git (push)
    ```
- Install all dependencies with the following command. This could take a while.
  ```
  yarn --frozen-lockfile
  ```
- Run command `yarn start` to start the development server for this web app. It will automatically recompile when you make changes in the `src/` directory.
- Press `Ctrl + C` to stop the server.
- Run command `yarn test` to run preset tests.

---

## Workflow

### Key points

Our workflow is:

- Claim an issue.
- Fork repository.
- Write code to resolve the issue and write unit tests to cover any new code.
- Run `yarn format` and `yarn lint`.
- Run `yarn coverage` to run tests and calculate the test coverage. It should be 100%. We are here to help if you struggle to write unit tests.
- Commit.
- Submit a pull request. Great job!

### Step-by-step instructions

If you are new to this workflow, you can a practice run here: [https://github.com/firstcontributions/first-contributions](https://github.com/firstcontributions/first-contributions).

Here's the step-by-step instruction:

- Find an [issue](https://github.com/BadwaterBay/labelcopier-core/issues) you'd like to solve and claim it by leaving a comment.
- Complete the [initial setup](#Initial-setup), if you haven't.
- [Bring your fork up to date with the original repository](#Bring-your-fork-up-to-date-with-the-original-repository).
- Modify the code to resolve the issue and commit changes.
- Run `yarn format` and `yarn lint` to format and lint your code. Please try to resolve linting issues, although it's acceptable to have a few minor linting issues. If it's reasonable, you can manually suppress linting warnings and make a note in your pull request. [How to disable Eslint with inline comments?](https://eslint.org/docs/2.13.1/user-guide/configuring#disabling-rules-with-inline-comments-1)
- Run `yarn test` to make sure all tests are passed.
- Make sure your base is up to date with the original repository (`upstream`) with commands:
  ```
  git fetch upstream
  git rebase upstream/main
  ```
- Push your branch to the remote of your forked repository (i.e., push to origin). ([How to push commits to remote?](https://help.github.com/en/github/using-git/pushing-commits-to-a-remote-repository))
- Submit a pull request (PR) to be merged into the original repository's `main` branch. ([How to create a PR?](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request))
- Peers will review your PR and may request revisions.
- Once your PR is approved, your commit will be merged to the `main` branch. Congratulations!

If you are stuck, you are welcome to reach out and leave a comment.

---

## Bring your fork up to date with the original repository

- Completed the [initial setup](#Initial-setup), if you haven't.
- Fetch updates from the original repository (`upstream`):
  ```
  git fetch upstream
  ```
- Make sure you are on your local `main` branch:
  ```
  git checkout main
  ```
- Rebase your local `main` branch with `upstream/main` branch:
  ```
  git rebase upstream/main
  ```
- Push your local `main` to remote:
  ```
  git push origin main
  ```
  If your push is rejected ([why?](https://www.reddit.com/r/git/comments/6jzogp/why_am_i_force_pushing_after_a_rebase/)), you might need to force-push to remote:
  ```
  git push -f origin main
  ```

---

## Other useful commands

- Format your code using Prettier:
  - `yarn format` will format files with Prettier and save changes.
  - Tip: when you git-commit, `yarn format` will be automatically triggered.
- Lint your code using Eslint:
  - `yarn lint` will run Eslint to check the code quality.
  - Tip: when you git-commit, `yarn lint` will be automatically triggered.

---

## Test-drive development

A test-drive development is highly encouraged.

As a quantitative measure, the test coverage on the main branch shall be 100% at all time. Any new code to be merged into the main branch needs to have 100% test coverage.

### How to do test-driven development?

The rules of test-drive development by [Robert Martin](https://en.wikipedia.org/wiki/Robert_C._Martin) are:

- You are not allowed to write any production code unless it is to make a failing unit test pass.
- You are not allowed to write any more of a unit test than is sufficient to fail; and compilation failures are failures.
- You are not allowed to write any more production code than is sufficient to pass the one failing unit test.

Another way of stating the rules is:

- Write only enough of a unit test to fail.
- Write only enough production code to make the failing unit test pass.

---

## Style guides

### Git commit messages

- Use the present tense ("Add feature" not "Added feature").
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...").
- Use '&' instead of spelling out 'and'
- Limit the first line to 70 characters or less.
- Reference issues and pull requests liberally after the first line.
- When only changing documentation, include `[ci skip]` in the commit title.
- Consider starting the commit message with an applicable emoji:
  - :star: `:star:` when adding new features or enhancements
  - :bug: `:bug:` when fixing bugs
  - :art: `:art:` when improving the UI
  - :memo: `:memo:` when writing documentations
  - :shirt: `:shirt:` when fixing linter warnings or improving the format of the code
  - :bath: `:bath:` when fixing CI builds
  - :racehorse: `:racehorse:` when improving the performance
  - :white_check_mark: `:white_check_mark:` when adding tests
  - :lock: `:lock:` when dealing with security
  - :arrow_up: `:arrow_up:` when upgrading dependencies
  - :arrow_down: `:arrow_down:` when downgrading dependencies
  - :wrench: `:wrench:` when configuring infrastructures

---

## Other recommended practices

### Sign commits with signature verifications

It is encouraged to sign your commits with signature verifications with GPG keys. [How?](https://help.github.com/en/github/authenticating-to-github/managing-commit-signature-verification)
