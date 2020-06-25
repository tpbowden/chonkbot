const core = require("@actions/core");
const github = require("@actions/github");
const { calculateChonk } = require("./chonk");

const token = core.getInput("token", { required: true });
const octokit = github.getOctokit(token);
const context = github.context;

const {
  additions,
  deletions,
  changed_files: files,
} = context.payload.pull_request;

octokit.checks.create({
  owner: context.payload.pull_request.head.repo.owner.login,
  repo: context.payload.pull_request.head.repo.name,
  head_sha: context.payload.pull_request.head.sha,
  status: "completed",
  conclusion: "success",
  name: "chonkbot",
  output: {
    title: calculateChonk({ additions, deletions, files }),
    summary: "Chonkbot",
  },
});
