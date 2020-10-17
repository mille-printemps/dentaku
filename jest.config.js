module.exports = {
  globals: {
    "ts-jest": {
      diagnostics: false,
      tsConfig: "tsconfig.json"
    }
  },
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "ts-jest"
  },
  testRegex: "(/__tests__/.*|\\.(test|spec))\\.(tsx?|jsx?)$",
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "json",
    "jsx"
  ],
  modulePathIgnorePatterns: ['lib', 'lib-esm'],
  testEnvironment: "jsdom",
  testURL: "http://localhost/",
  coverageThreshold: {
    "global": {
      "branches": 0,
      "functions": 0,
      "lines": 0,
      "statements": 0
    }
  },
  coveragePathIgnorePatterns: [
    "/node_modules/"
  ]
};
