const { serverless } = require("@chadfawcett/probot-serverless-now");
const appFn = require("./src/chonkbot");
module.exports = serverless(appFn);
