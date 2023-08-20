/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  // The test environment that will be used for testing
  // Workaround for:
  // - https://github.com/facebook/jest/issues/2549
  // - https://github.com/sass/dart-sass/issues/1692
  testEnvironment: 'jest-environment-node-single-context',
};
