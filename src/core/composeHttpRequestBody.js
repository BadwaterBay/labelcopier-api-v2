import { validateKindOrThrowError } from './validateKind';

export const composeHttpRequestBodyForLabels = () => {
  const body = {
    name: 'dummy',
    color: '001122',
    description: 'Dummy description',
  };

  return body;
};

export const composeHttpRequestBodyForMilestones = () => {
  const body = {
    title: 'title',
    state: 'closed',
    description: 'Dummy description',
    due_on: '2002-02-15T16:38:04Z',
  };

  return body;
};

export const composeHttpRequestBody = (kind) => {
  validateKindOrThrowError(kind);

  let body = {};

  if (kind === 'labels') {
    body = composeHttpRequestBodyForLabels();
  } else {
    body = composeHttpRequestBodyForMilestones();
  }

  return JSON.stringify(body);
};
