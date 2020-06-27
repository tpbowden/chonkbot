const { calculateChonk } = require("../src/core");

describe("calculateChonk", () => {
  it("is a fine boi for small changes", () => {
    expect(
      calculateChonk({
        files: 5,
        additions: 100,
        deletions: 50,
      })
    ).toEqual("A fine boi");
  });

  it("is chomnk for slightly chonky changes", () => {
    expect(
      calculateChonk({
        files: 10,
        additions: 150,
        deletions: 100,
      })
    ).toEqual("He chomnk");
  });

  it("is a heckin chonker for medium sized changes", () => {
    expect(
      calculateChonk({
        files: 13,
        additions: 200,
        deletions: 200,
      })
    ).toEqual("A heckin' chonker");
  });

  it("is a hefty chonk for fairly large changes", () => {
    expect(
      calculateChonk({
        files: 18,
        additions: 500,
        deletions: 300,
      })
    ).toEqual("Hefty chonk");
  });

  it("is a megachonker for huge changes", () => {
    expect(
      calculateChonk({
        files: 21,
        additions: 700,
        deletions: 500,
      })
    ).toEqual("MEGACHONKER");
  });

  it("oh lawd he comin for ridiculous changes", () => {
    expect(
      calculateChonk({
        files: 28,
        additions: 1200,
        deletions: 800,
      })
    ).toEqual("OH LAWD HE COMIN!");
  });
});
