const config = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
        '\\.(svg)$': '<rootDir>/__mocks__/fileMock.js',
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
};

module.exports = config;
