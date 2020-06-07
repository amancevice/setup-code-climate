'use strict';
const fs   = require('fs').promises;
const path = require('path');
const util = require('util');
const core = require('@actions/core');
const tc   = require('@actions/tool-cache');

const URL = 'https://codeclimate.com/downloads/test-reporter/test-reporter-%s-linux-amd64';

function setupEnv (cc_test_reporter_id) {
  // Required to upload coverage report
  core.exportVariable('CC_TEST_REPORTER_ID', cc_test_reporter_id);

  // Required by cc-test-reporter
  if (process.env.GITHUB_SHA) {
    core.exportVariable('GIT_COMMIT_SHA', process.env.GITHUB_SHA);
  }
  if (process.env.GITHUB_REF) {
    core.exportVariable('GIT_BRANCH', process.env.GITHUB_REF.replace(/^refs\/heads\//, ''));
  }
}

async function downloadBinary (url) {
  // Download cc-test-reporter
  core.debug(`Downloading Code Climate test reporter from ${url}`);
  const pathToTmp = await tc.downloadTool(url);
  if (!pathToTmp) {
    throw new Error(`Unable to download Code Climate test reporter from ${url}`);
  }

  // Move tmp file to ${RUNNER_TEMP}/bin/cc-test-reporter
  const pathToDir = `${path.dirname(pathToTmp)}/bin`;
  const pathToBin = `${pathToDir}/cc-test-reporter`
  await fs.mkdir(pathToDir);
  await fs.copyFile(pathToTmp, pathToBin);
  await fs.chmod(pathToBin, parseInt('0755', 8));
  await fs.unlink(pathToTmp);
  core.debug(`Code Climate test reporter path is ${pathToBin}.`);

  // Add to path
  core.addPath(pathToDir);
}

async function setup () {
  try {
    // Gather GitHub Actions inputs
    const cc_test_reporter_id      = core.getInput('cc_test_reporter_id');
    const cc_test_reporter_version = core.getInput('cc_test_reporter_version') || 'latest';
    const cc_test_reporter_url     = util.format(URL, cc_test_reporter_version);

    // Set up environment
    setupEnv(cc_test_reporter_id);

    // Download cc-test-reporter
    await downloadBinary(cc_test_reporter_url);
  } catch (error) {
    core.error(error);
    throw new Error(error);
  }
}

module.exports = setup;
