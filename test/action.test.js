const path = require("path");
const nock = require("nock");

const run = () => require("../src/action");

describe("GitHub action", () => {
  beforeAll(() => {
    nock.disableNetConnect();
  });

  beforeEach(() => {
    jest.resetModules();
  });

  it("updates the status", async () => {
    expect.assertions(2);

    process.env.GITHUB_REPOSITORY = "testuser/testrepo";
    process.env.GITHUB_EVENT_PATH = path.join(
      __dirname,
      "fixtures/pullRequestOpened.json"
    );
    process.env.GITHUB_EVENT_NAME = "pull_request_opened";
    process.env.INPUT_TOKEN = "test";

    const scope = nock("https://api.github.com")
      .post("/repos/testowner/testrepo/statuses/testcommitsha", (body) => {
        expect(body).toEqual({
          context: "chonkbot",
          description: "He chomnk",
          state: "success",
        });
        return true;
      })
      .reply(200);

    await run();

    expect(scope.isDone()).toBe(true);
  });

  it("outputs the status", async () => {
    expect.assertions(2);

    this.outputMock = jest.fn();
    jest.mock("@actions/core", () => ({
      setOutput: this.outputMock,
      getInput: () => "test",
    }));

    process.env.GITHUB_REPOSITORY = "testuser/testrepo";
    process.env.GITHUB_EVENT_PATH = path.join(
      __dirname,
      "fixtures/pullRequestOpened.json"
    );
    process.env.GITHUB_EVENT_NAME = "pull_request_opened";

    const scope = nock("https://api.github.com")
      .post("/repos/testowner/testrepo/statuses/testcommitsha")
      .reply(200, { description: "a fine boi" });

    await run();

    expect(this.outputMock).toHaveBeenCalledWith("chonkLevel", "a fine boi");
    expect(scope.isDone()).toBe(true);
  });
});
