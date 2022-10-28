const path = require('path');

module.exports = {
  'stories': [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  'addons': [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/preset-scss'
  ],
  'framework': '@storybook/react',
  'core': {
    'builder': '@storybook/builder-webpack5'
  },
  webpackFinal: async (config, {}) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '~components': path.resolve(__dirname, '../src/components'),
      '~utils': path.resolve(__dirname, '../src/utils'),
    };

    return config;
  }
}