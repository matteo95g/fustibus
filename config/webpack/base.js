const path = require("path");

module.exports = {
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "..", "..", "app/javascript/src/components"),
      "@pages": path.resolve(__dirname, "..", "..", "app/javascript/src/pages"),
      "@utils": path.resolve(__dirname, "..", "..", "app/javascript/src/components/App/utils"),
    },
  },
};
