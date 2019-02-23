import { Application } from "probot";
import { calculateChonk } from "./chonk";

export = (app: Application) => {
  app.on("pull_request", async context => {
    const {
      additions,
      deletions,
      changed_files: files
    } = context.payload.pull_request;

    await context.github.repos.createStatus({
      owner: context.payload.pull_request.head.repo.owner.login,
      repo: context.payload.pull_request.head.repo.name,
      sha: context.payload.pull_request.head.sha,
      state: "success",
      description: calculateChonk({ additions, deletions, files }),
      context: "Chonkbot"
    });
  });
};
