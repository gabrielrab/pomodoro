const { alias } = require("react-app-rewire-alias");

module.exports = function override(config) {
  alias({
    "@components": "src/components",
    "@hooks": "src/hooks",
    "@providers": "src/providers",
    "@assets": "src/assets",
  })(config);

  return config;
};
