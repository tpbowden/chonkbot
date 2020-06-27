const { createProbot } = require("probot");
const { findPrivateKey } = require("probot/lib/private-key");
const { createStatus } = require("./core");

const appFn = (app) => {
  app.on("pull_request", async (context) => {
    await createStatus(context.payload, context.github);
  });
};

const probot = createProbot({
  id: process.env.APP_ID,
  secret: process.env.WEBHOOK_SECRET,
  cert: findPrivateKey(),
});

probot.load(appFn);

module.exports = async (req, res) => {
  const name = req.headers["x-github-event"];
  const id = req.headers["x-github-delivery"];

  if (!name) {
    res.status(400).json({ successful: false, error: "Invalid request" });
    console.error("Invalid request");
    return;
  }

  try {
    await probot.receive({
      name,
      id,
      payload: req.body,
    });

    res.status(200).json({ successful: true });
    console.info("Successful");
  } catch (e) {
    res
      .status(500)
      .json({ successful: false, error: "Unexpected error handling request" });
    console.error(e);
  }
};
