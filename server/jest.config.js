/* eslint-disable no-undef */
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ["**/**/*.test.ts"],
  // testMatch: ["<rootDir>/src/test/**/*.test.ts"],
  verbose:true,
  forceExit:true,
  detectOpenHandles: true,

  };
