export const dummyResponseBody1 = [
  {
    id: 2352098941,
    node_id: 'MDU6TGFiZWwyMzUyMDk4OTQx',
    url:
      'https://api.github.com/repos/dongskyler/testing-repository-for-labelcopier/labels/bug',
    name: 'bug',
    color: 'd73a4a',
    default: true,
    description: "Something isn't working",
  },
  {
    id: 2352098942,
    node_id: 'MDU6TGFiZWwyMzUyMDk4OTQy',
    url:
      'https://api.github.com/repos/dongskyler/testing-repository-for-labelcopier/labels/documentation',
    name: 'documentation',
    color: '0075ca',
    default: true,
    description: 'Improvements or additions to documentation',
  },
  {
    id: 2352098943,
    node_id: 'MDU6TGFiZWwyMzUyMDk4OTQz',
    url:
      'https://api.github.com/repos/dongskyler/testing-repository-for-labelcopier/labels/duplicate',
    name: 'duplicate',
    color: 'cfd3d7',
    default: true,
    description: 'This issue or pull request already exists',
  },
];

export const dummyResponseBody2 = [
  {
    id: 2352098944,
    node_id: 'MDU6TGFiZWwyMzUyMDk4OTQ0',
    url:
      'https://api.github.com/repos/dongskyler/testing-repository-for-labelcopier/labels/enhancement',
    name: 'enhancement',
    color: 'a2eeef',
    default: true,
    description: 'New feature or request',
  },
  {
    id: 2352098947,
    node_id: 'MDU6TGFiZWwyMzUyMDk4OTQ3',
    url:
      'https://api.github.com/repos/dongskyler/testing-repository-for-labelcopier/labels/good%20first%20issue',
    name: 'good first issue',
    color: '7057ff',
    default: true,
    description: 'Good for newcomers',
  },
  {
    id: 2352098945,
    node_id: 'MDU6TGFiZWwyMzUyMDk4OTQ1',
    url:
      'https://api.github.com/repos/dongskyler/testing-repository-for-labelcopier/labels/help%20wanted',
    name: 'help wanted',
    color: '008672',
    default: true,
    description: 'Extra attention is needed',
  },
];

export const dummyResponseBody3 = [
  {
    id: 2352098949,
    node_id: 'MDU6TGFiZWwyMzUyMDk4OTQ5',
    url:
      'https://api.github.com/repos/dongskyler/testing-repository-for-labelcopier/labels/invalid',
    name: 'invalid',
    color: 'e4e669',
    default: true,
    description: "This doesn't seem right",
  },
  {
    id: 2352098951,
    node_id: 'MDU6TGFiZWwyMzUyMDk4OTUx',
    url:
      'https://api.github.com/repos/dongskyler/testing-repository-for-labelcopier/labels/question',
    name: 'question',
    color: 'd876e3',
    default: true,
    description: 'Further information is requested',
  },
  {
    id: 2352098953,
    node_id: 'MDU6TGFiZWwyMzUyMDk4OTUz',
    url:
      'https://api.github.com/repos/dongskyler/testing-repository-for-labelcopier/labels/wontfix',
    name: 'wontfix',
    color: 'ffffff',
    default: true,
    description: 'This will not be worked on',
  },
];

export const dummyResponseBodyOutOfRange = [];

export const dummyResponseBodyAll = [
  ...dummyResponseBody1,
  ...dummyResponseBody2,
  ...dummyResponseBody3,
];

export const dummyResponseBody = {
  lastPageNum: 3,
  data: {
    1: dummyResponseBody1,
    2: dummyResponseBody2,
    3: dummyResponseBody3,
    outOfRange: dummyResponseBodyOutOfRange,
    all: dummyResponseBodyAll,
  },
};
