const { calculateChonk } = require("./chonk");

const context = github.context;

const {
  additions,
  deletions,
  changed_files: files,
} = context.payload.pull_request;

console.log(JSON.stringify(context, null, 2));

context.github.repos.createStatus({
  owner: context.payload.pull_request.head.repo.owner.login,
  repo: context.payload.pull_request.head.repo.name,
  sha: context.payload.pull_request.head.sha,
  state: "success",
  description: calculateChonk({ additions, deletions, files }),
  context: "chonkbot",
});
