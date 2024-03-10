const core = require('@actions/core');

const setup = require('./lib/setup-code-climate');

const main = async () => {
  await setup().catch((e) => core.setFailed(e.message))
};

main();
