const path = require("path");
const config = require("../../webpack.config");

config.output.path = path.join(__dirname, ".webpack");
module.exports = config;
