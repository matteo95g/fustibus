const path = require("path");
const config = process.env.NODE_ENV == "production" ? require("./vars.prod.json").prod : require("./vars.dev.json").dev;

module.exports = {
  externals: {
    Config: JSON.stringify(config),
  },
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "..", "..", "app/javascript/src/components"),
      "@pages": path.resolve(__dirname, "..", "..", "app/javascript/src/pages"),
      "@utils": path.resolve(__dirname, "..", "..", "app/javascript/src/utils"),
      "@app": path.resolve(__dirname, "..", "..", "app/javascript/src/app"),
      "@common": path.resolve(__dirname, "..", "..", "app/javascript/src/common"),
      "@features": path.resolve(__dirname, "..", "..", "app/javascript/src/features"),
      "@images": path.resolve(__dirname, "..", "..", "app/assets/images"),
    },
  },
};
