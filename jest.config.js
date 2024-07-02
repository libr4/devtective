export default {
    "transform": {
      // "\\.[jt]s?$": [
      //   "ts-jest",
      //   {
      //     "useESM": true
      //   },
      //   // {tsconfig: './tsconfig.json'},
      // ],
      '^.+\\.tsx?$': [
      'ts-jest',
      {
        diagnostics: {
          ignoreCodes: [1343]
        },
        //the config bellow is necessary to work around the 'cannot use 'import.meta' outside a module' error produced by ts jest
        astTransformers: {
          before: [
            {
              path: 'node_modules/ts-jest-mock-import-meta',  // or, alternatively, 'ts-jest-mock-import-meta' directly, without node_modules.
              options: { metaObjectReplacement: { url: 'https://www.url.com' } }
            }
          ]
        }
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
  