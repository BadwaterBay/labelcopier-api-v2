module.exports = {
  require: ['@babel/register', 'src/test/setup.spec.js'],
  extension: ['js'],
  spec: ['src/test/**/*.{spec,test}.js'],
  recursive: false,
  sort: false,
  watch: false,
  ignore: ['src/test/setup.spec.js'],
  parallel: true,
  jobs: 1,
  slow: 50,
  timeout: 2000,
  fullTrace: false,
  exit: true,
  ui: 'tdd',
  reporter: 'spec',
  diff: true,
  inlineDiff: false,
  color: true,
};
