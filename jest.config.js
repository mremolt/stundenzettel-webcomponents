const esModules = ['lit-html', 'lit-element', '@vaadin/router'].join('|');

module.exports = {
  preset: 'ts-jest',
  runner: '@jest-runner/electron',
  testEnvironment: '@jest-runner/electron/environment',
  transform: {
    '^.+\\.(js|ts|tsx)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'html'],
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.{ts,js}', '!**/node_modules/**', '!**/vendor/**'],

  globals: {
    'ts-jest': {
      tsConfig: {
        module: 'commonjs',
      },
    },
  },
};
