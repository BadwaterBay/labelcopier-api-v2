export const parseLinkHeader = (linkHeader = '') => {
  // Example link header (a string):
  // <https://api.github.com/repositories/295931557/labels?per_page=3&page=2>; rel="next", <https://api.github.com/repositories/295931557/labels?per_page=3&page=3>; rel="last"

  const reducer = (accumulator, header) => {
    const regex = /<(?<uri>.+?)>; rel="(?<rel>.+?)"/;
    const matched = header.match(regex);

    if (matched === null) {
      return accumulator;
    }

    const { uri, rel } = matched.groups;
    accumulator[rel] = uri;

    return accumulator;
  };

  const splited = linkHeader.split(',');
  const parsedLinkHeader = splited.reduce(reducer, {});

  return parsedLinkHeader;
};

export const parseLinkHeaderFromHttpResponse = (response) => {
  const { headers } = response;
  const linkHeader = headers.get('link');
  const parsedLinkHeader = parseLinkHeader(linkHeader);

  return parsedLinkHeader;
};
