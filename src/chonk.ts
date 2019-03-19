type ChonkInput = {
  additions: number;
  deletions: number;
  files: number;
};

export const calculateChonk = ({ additions, deletions, files }: ChonkInput) => {
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
