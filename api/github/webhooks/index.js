const { createNodeMiddleware, createProbot } = require("probot");
const { createStatus } = require("../../../src/core");

const appFn = (app) => {
  app.on("pull_request", async (context) => {
    const github = context.octokit;
    await createStatus(context.payload, github);
  });
};

const probot = createProbot();
module.exports = createNodeMiddleware(appFn, {
  probot,
  webhooksPath: "/api/github/webhooks",
});
