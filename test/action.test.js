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

    run();

    await new Promise((resolve) => process.nextTick(resolve));

    expect(scope.isDone()).toBe(true);
  });
});
