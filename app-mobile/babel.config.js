module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
    plugins: [
      // react-native-reanimated/plugin bundles worklets in SDK 55.
      // Do NOT also include react-native-worklets/plugin — it will duplicate.
      'react-native-reanimated/plugin',
    ],
  };
};
