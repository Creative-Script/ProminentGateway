module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/tests"],
  testTimeout: 30000,
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/tests/$1",
  },
  coveragePathIgnorePatterns:[
    '/tests/'
  ]
};
