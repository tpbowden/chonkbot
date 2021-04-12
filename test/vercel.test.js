const http = require("http");
const nock = require("nock");
const fetch = require("node-fetch");
const { sign } = require("@octokit/webhooks");
const middleware = require("../src/vercel");
const payload = require("./fixtures/pullRequestOpened.json");
const { doesNotMatch } = require("assert");

const server = http.createServer(middleware);

const signature = sign(
  {
    secret: process.env.WEBHOOK_SECRET,
    algorithm: "sha1",
  },
  JSON.stringify(payload)
);

describe("Vercel middleware", () => {
  beforeAll(async () => {
    nock.disableNetConnect();
    nock.enableNetConnect("127.0.0.1");
    await new Promise((resolve) => {
      server.listen(0, "127.0.0.1", (e) => {
        if (e) {
          reject(e);
        } else {
          resolve();
        }
      });
    });
  });

  afterAll(() => {
    server.close();
  });

  it("updates the status", async (done) => {
    const port = server.address().port;
    nock("https://api.github.com")
      .post("/app/installations/698214/access_tokens")
      .reply(200, { token: "test", permissions: {} });

    const scope = nock("https://api.github.com")
      .post("/repos/testowner/testrepo/statuses/testcommitsha", (body) => {
        try {
          expect(body).toEqual({
            context: "chonkbot",
            description: "He chomnk",
            state: "success",
          });
          done();
        } catch (e) {
          done(e);
        }
        return true;
      })
      .reply(200);

    const res = await fetch(`http://127.0.0.1:${port}/`, {
      method: "POST",
      headers: {
        "x-github-event": "pull_request",
        "x-hub-signature": signature,
        "x-github-delivery": "a19c7e40-9bac-11eb-910a-d43d8bd9764e",
      },
      body: JSON.stringify(payload),
    });

    expect(scope.isDone()).toBe(true);
    expect(res.status).toEqual(200);
  });
});