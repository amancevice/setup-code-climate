const core  = require('@actions/core');

const setup = require('./lib/setup-code-climate');

const main  = async () => {
  try {
    await setup();
  } catch (error) {
    core.setFailed(error.message);
  }
};

main();
