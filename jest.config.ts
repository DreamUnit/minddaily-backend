module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    roots: ["<rootDir>/src/"],
    testMatch: ["**/?(*.)+(spec|test).ts"],
    transform: {
        "^.+\\.ts$": "ts-jest",
    },
};
