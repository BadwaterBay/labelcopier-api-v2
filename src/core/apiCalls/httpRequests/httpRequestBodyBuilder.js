export const buildHttpRequestBodyForLabelToBeCreatedOnGithub = (label) => {
  const { name, description, color } = label;
  const colorWithoutLeadingHex = color.substring(1);

  const body = {
    name,
    description,
    color: colorWithoutLeadingHex,
  };

  return body;
};

export const buildHttpRequestBodyForLabel = (loginInfo, label) => {
  const { domain } = loginInfo;
  const { action } = label;

  const funcToBuildHttpRequestBodyForLabelToBe = {
    github: {
      create: (_label) => buildHttpRequestBodyForLabelToBeCreatedOnGithub(_label),
    },
  };

  const buildHttpRequestBodyForLabelToBe =
    funcToBuildHttpRequestBodyForLabelToBe[domain][action];

  const body = buildHttpRequestBodyForLabelToBe(label);
  return body;
};

export const buildHttpRequestBodyForMilestoneToBeCreatedOnGithub = (milestone) => {
  const { title, state, description, dueOn } = milestone;

  const body = {
    title,
    state,
    description,
    due_on: dueOn,
  };

  return body;
};

export const buildHttpRequestBodyForMilestone = (loginInfo, milestone) => {
  const { domain } = loginInfo;
  const { action } = milestone;

  const funcToBuildHttpRequestBodyForMilestoneToBe = {
    github: {
      create: (_milestone) =>
        buildHttpRequestBodyForMilestoneToBeCreatedOnGithub(_milestone),
    },
  };

  const buildHttpRequestBodyForMilestoneToBe =
    funcToBuildHttpRequestBodyForMilestoneToBe[domain][action];

  const body = buildHttpRequestBodyForMilestoneToBe(milestone);
  return body;
};

export const buildHttpRequestBody = (loginInfo, entryType, entry) => {
  const funcToBuildHttpRequestBodyForEntryType = {
    labels: (_loginInfo, label) => buildHttpRequestBodyForLabel(_loginInfo, label),
    milestones: (_loginInfo, milestone) =>
      buildHttpRequestBodyForMilestone(_loginInfo, milestone),
  };

  const buildHttpRequestBodyForEntryType =
    funcToBuildHttpRequestBodyForEntryType[entryType];

  const body = buildHttpRequestBodyForEntryType(loginInfo, entry);

  // Note: the returned body is not stringified
  return body;
};
