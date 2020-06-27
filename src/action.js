const core = require("@actions/core");
const github = require("@actions/github");
const { createStatus } = require("./core");

const token = core.getInput("token", { required: true });
const octokit = github.getOctokit(token);

createStatus(github.context.payload, octokit);
