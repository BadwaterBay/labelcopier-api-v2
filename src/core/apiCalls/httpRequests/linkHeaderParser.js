const reducerForParsingLinkHeader = (parsedLinkHeader, rawLinkHeader) => {
  const regex = /<(?<uri>.+?)>; rel="(?<rel>.+?)"/;
  const matched = rawLinkHeader.match(regex);
  const noMatchesWereFound = matched === null;

  if (noMatchesWereFound) {
    return parsedLinkHeader;
  }

  const { rel, uri } = matched.groups;

  const newRelation = {};
  newRelation[rel] = uri;

  const updatedParsedLinkHeader = {
    ...parsedLinkHeader,
    ...newRelation,
  };

  return updatedParsedLinkHeader;
};

export const parseLinkHeader = (rawLinkHeader = '') => {
  // Example link header (a string):
  // '<https://api.github.com/repositories/295931557/labels?per_page=3&page=2>; rel="next", <https://api.github.com/repositories/295931557/labels?per_page=3&page=3>; rel="last"'

  const parsedLinkHeader = rawLinkHeader
    .split(',')
    .reduce(reducerForParsingLinkHeader, {});

  return parsedLinkHeader;
};

export const parseLinkHeaderFromHttpResponse = (response) => {
  const { headers } = response;
  const rawLinkHeader = headers.get('link');
  const parsedLinkHeader = parseLinkHeader(rawLinkHeader);

  return parsedLinkHeader;
};
