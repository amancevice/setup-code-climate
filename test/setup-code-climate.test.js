const fs    = require('fs').promises;
const core  = require('@actions/core');
const tc    = require('@actions/tool-cache');
const sinon = require('sinon');

const setup = require('../lib/setup-code-climate');

process.env.INPUT_CC_TEST_REPORTER_ID = '<secret>';
process.env.GITHUB_SHA = '<GITHUB_SHA>';
process.env.GITHUB_REF = '<GITHUB_REF>';

describe('setup action', function() {

  before(function() {
    // Stub core
    sinon.stub(core, 'addPath')
    sinon.stub(core, 'exportVariable')

    // Stub tc
    sinon.stub(tc, 'downloadTool').callsFake(async (url) => { return '/tmp/actions/TEMPFILE'; });

    // Stub fs
    sinon.stub(fs, 'mkdir');
    sinon.stub(fs, 'copyFile');
    sinon.stub(fs, 'chmod');
    sinon.stub(fs, 'unlink');
  });

  it('should set up cc-test-reporter', async function() {
    await setup();

    sinon.assert.calledWith(tc.downloadTool, 'https://codeclimate.com/downloads/test-reporter/test-reporter-latest-linux-amd64');
    sinon.assert.calledWith(fs.mkdir, '/tmp/actions/bin');
    sinon.assert.calledWith(fs.copyFile, '/tmp/actions/TEMPFILE', '/tmp/actions/bin/cc-test-reporter');
    sinon.assert.calledWith(fs.chmod, '/tmp/actions/bin/cc-test-reporter', parseInt('0755', 8));
    sinon.assert.calledWith(fs.unlink, '/tmp/actions/TEMPFILE');
    sinon.assert.calledWith(core.addPath, '/tmp/actions/bin');
    sinon.assert.calledThrice(core.exportVariable);
    sinon.assert.callOrder(
      core.exportVariable.withArgs('CC_TEST_REPORTER_ID', '<secret>'),
      core.exportVariable.withArgs('GIT_COMMIT_SHA', '<GITHUB_SHA>'),
      core.exportVariable.withArgs('GIT_BRANCH', '<GITHUB_REF>'),
    );
  });
})
