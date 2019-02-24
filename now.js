const { serverless } = require("@chadfawcett/probot-serverless-now");
const appFn = require("./lib");
module.exports = serverless(appFn);
