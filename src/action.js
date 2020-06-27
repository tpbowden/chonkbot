const core = require("@actions/core");
const github = require("@actions/github");
const { createCheck } = require("./core");

const token = core.getInput("token", { required: true });
const octokit = github.getOctokit(token);

createCheck(github.context.payload, octokit);
