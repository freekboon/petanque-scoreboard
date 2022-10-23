module.exports = {
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!**/.next/**",
    "!**/coverage/**",
    "!**/**.config.js",
  ],
  moduleNameMapper: {
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
    "~styles(.*)$": "<rootDir>/src/styles/$1",
    "~utils(.*)$": "<rootDir>/src/utils/$1",
    "~components(.*)$": "<rootDir>/src/components/$1",
    "~modules(.*)$": "<rootDir>/src/modules/$1",
    "~templates(.*)$": "<rootDir>/src/templates/$1",
    "~config(.*)$": "<rootDir>/config/$1",
    "~hooks(.*)$": "<rootDir>/src/hooks/$1",
    "~contexts(.*)$": "<rootDir>/src/contexts/$1",
    "~constants(.*)$": "<rootDir>/src/constants/$1",
  },
};
