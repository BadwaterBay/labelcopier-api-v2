export const dummyLinkHeader1 =
  '<https://api.github.com/repositories/295931557/labels?per_page=3&page=2>; rel="next", <https://api.github.com/repositories/295931557/labels?per_page=3&page=3>; rel="last"';

export const dummyLinkHeader2 =
  '<https://api.github.com/repositories/295931557/labels?per_page=3&page=1>; rel="prev", <https://api.github.com/repositories/295931557/labels?per_page=3&page=3>; rel="next", <https://api.github.com/repositories/295931557/labels?per_page=3&page=3>; rel="last", <https://api.github.com/repositories/295931557/labels?per_page=3&page=1>; rel="first"';

export const dummyLinkHeader3 =
  '<https://api.github.com/repositories/295931557/labels?per_page=3&page=2>; rel="prev", <https://api.github.com/repositories/295931557/labels?per_page=3&page=1>; rel="first"';

export const dummyLinkHeaderOutOfRange =
  '<https://api.github.com/repositories/295931557/labels?per_page=3&page=3>; rel="prev", <https://api.github.com/repositories/295931557/labels?per_page=3&page=3>; rel="last", <https://api.github.com/repositories/295931557/labels?per_page=3&page=1>; rel="first"';

export const dummyLinkHeader = {
  lastPageNum: 3,
  data: {
    1: dummyLinkHeader1,
    2: dummyLinkHeader2,
    3: dummyLinkHeader3,
    outOfRange: dummyLinkHeaderOutOfRange,
  },
};
