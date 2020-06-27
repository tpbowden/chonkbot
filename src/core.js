const calculateChonk = ({ additions, deletions, files }) => {
  const score = (additions + deletions) * (files / 10);
  if (score >= 5000) {
    return "OH LAWD HE COMIN!";
  }

  if (score >= 2000) {
    return "MEGACHONKER";
  }

  if (score >= 1000) {
    return "Hefty chonk";
  }

  if (score >= 500) {
    return "A heckin' chonker";
  }

  if (score >= 200) {
    return "He chomnk";
  }

  return "A fine boi";
};

const createStatus = (payload, octokit) => {
  const { additions, deletions, changed_files: files } = payload.pull_request;

  return octokit.repos.createCommitStatus({
    owner: payload.pull_request.head.repo.owner.login,
    repo: payload.pull_request.head.repo.name,
    sha: payload.pull_request.head.sha,
    state: "success",
    description: calculateChonk({ additions, deletions, files }),
    context: "chonkbot",
  });
};

module.exports = {
  calculateChonk,
  createStatus,
};
