// ESLint flat config for Expo / React Native (SDK 55, ESLint 9+)
const expoConfig = require('eslint-config-expo/flat');

module.exports = [
  ...expoConfig,
  {
    ignores: ['node_modules', '.expo', 'dist', 'ios', 'android', 'expo-env.d.ts', 'nativewind-env.d.ts'],
  },
  {
    rules: {
      'react/no-unescaped-entities': 'off',
    },
  },
];
