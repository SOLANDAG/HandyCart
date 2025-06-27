const { getDefaultConfig } = require("expo/metro-config");

module.exports = (async () => {
  const config = await getDefaultConfig(__dirname);

  config.resolver.sourceExts.push("cjs");
  config.resolver.unstable_enablePackageExports = false;

  config.resolver.extraNodeModules = {
    ...(config.resolver.extraNodeModules || {}),
    tslib: require.resolve("tslib"),
  };

  return config;
})();
