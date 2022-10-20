module.exports = {
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
      },
    ],
  },
  moduleFileExtensions: ['ts', 'js'],
  testMatch: ['**/__tests__/**/*.test.(ts|js)'],
  testEnvironment: 'node',
};
