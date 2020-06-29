const { Octokit } = require("@octokit/rest");
const core = require("@actions/core");
const github = require("@actions/github");
const { createStatus } = require("./core");

const token = core.getInput("token", { required: true });
const app = new Octokit({
  auth: token,
});

createStatus(github.context.payload, app);
