/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  resolver: {
    extraNodeModules: {
      'react-native-my': require.resolve('./app/polyfills/react-native-my'),
      // crypto: require.resolve('./app/polyfills/crypto'),
    },
  }
};
