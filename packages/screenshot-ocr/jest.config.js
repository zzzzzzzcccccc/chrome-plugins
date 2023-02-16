module.exports = {
  roots: [`${__dirname}`],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: [`${__dirname}/**/__tests__/**/*.{js,jsx,ts,tsx}`, `${__dirname}/**/*.{spec,test}.{js,jsx,ts,tsx}`],
  testPathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/node_modules/'],
  setupFilesAfterEnv: [`${__dirname}/setupTests.js`],
  testEnvironment: 'jsdom',
  transform: {
    '\\.[jt]sx?$': 'ts-jest',
  },
};
