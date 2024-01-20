module.exports = {
  testEnvironment: 'node',
  testEnvironmentOptions: {
    NODE_ENV: 'test'
  },
  restoreMocks: true,
  coveragePathIgnorePatterns: ['node_modules', 'config'],
  coverageReporters: ['text', 'lcov', 'clover', 'html'],
  modulePathIgnorePatterns: ['config'],
  transform: {
    '\\.ts$': [
      'ts-jest',
      {
        diagnostics: false
      }
    ]
  },
  setupFiles: ['./jest.setup.ts'],
  setupFilesAfterEnv: ['./src/setup-tests.ts']
}
