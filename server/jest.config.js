/* eslint-disable no-undef */
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // setupFiles: ['./src/config/sequelize-test-db.config.ts'],
  testMatch: ["**/**/*.test.ts"],
  verbose:true,
  forceExit:true,
  detectOpenHandles: true,
  // clearMocks:true
};