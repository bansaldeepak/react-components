// jest.config.js
const {defaults} = require('jest-config');
module.exports = {
  verbose: true,
  "roots": [
    "<rootDir>/src"
  ],
  "collectCoverageFrom": [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!<rootDir>/node_modules/",
    "!src/**/*.stories.ts",
    "!<rootDir>/src/**/__stories__/**/*.{js,jsx,ts,tsx}"
  ],
  "coverageThreshold": {
    "global": {
      "branches": 50,
      "functions": 50,
      "lines": 50,
      "statements": 50
    }
  },
  "collectCoverage": true,
  "coverageReporters": ["json", "html", "text"],
  "setupFilesAfterEnv": [],
  "testMatch": [
    "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}"
  ],
  "testEnvironment": "jest-environment-jsdom-fourteen",
  "transform": {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest"
  },
  "transformIgnorePatterns": [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$",
    "^.+\\.module\\.(css|sass|scss)$"
  ],
  "modulePaths": [
    "<rootDir>"
  ],
  "moduleNameMapper": {
    "\\.(css|sass|scss)$": "identity-obj-proxy",
    "^/(.*)$": "<rootDir>/src/$1"
  },
  "moduleDirectories": [
    "node_modules", "src"
  ]
  // "moduleFileExtensions": [...defaults.moduleFileExtensions, 'ts', 'tsx']
};
