const { environment } = require("@rails/webpacker");
const baseConfig = require("./base");

environment.config.merge(baseConfig);

module.exports = environment;
