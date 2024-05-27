export default {
    "transform": {
      "\\.[jt]s?$": [
        "ts-jest",
        {
          "useESM": true
        }
      ]
    },
    "moduleNameMapper": {
    //   "(.+)\\.js": "$1"
      "^(\\.{1,2}/.*)\\.js$": "$1"
    },
    "extensionsToTreatAsEsm": [
      ".ts"
    ],
    // "testEnvironment": 'node',
    // "preset": 'ts-jest/presets/default-esm', // or other ESM presets
    "testPathIgnorePatterns": ['/node_modules/', '/dist/'], // Add this line to ignore dist folder
  }
  