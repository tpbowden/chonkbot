const { serverless } = require("@chadfawcett/probot-serverless-now");
const { chonkbot } = require("./src/chonkbot");
module.exports = serverless(chonkbot);
