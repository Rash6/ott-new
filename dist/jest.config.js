"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Sync object
const config = {
    verbose: true,
    transform: {
        "^.+\\.tsx?$": "ts-jest",
        "^.+\\.js$": "babel-jest",
    },
    // setupFilesAfterEnv: ['./jest.setup.ts']
};
exports.default = config;
