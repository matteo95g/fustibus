const path = require("path");

module.exports = {
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "..", "..", "app/javascript/components"),
    },
  },
};
