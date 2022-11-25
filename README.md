# Setup Code Climate GitHub Action

[![test](https://img.shields.io/github/workflow/status/amancevice/setup-code-climate/test?logo=github&style=flat-square)](https://github.com/amancevice/setup-code-climate/actions)
[![coverage](https://img.shields.io/codeclimate/coverage/amancevice/setup-code-climate?logo=code-climate&style=flat-square)](https://codeclimate.com/github/amancevice/setup-code-climate/test_coverage)
[![maintainability](https://img.shields.io/codeclimate/maintainability/amancevice/setup-code-climate?logo=code-climate&style=flat-square)](https://codeclimate.com/github/amancevice/setup-code-climate/maintainability)

Setup `cc-test-reporter` binary to use with your GitHub Actions workflows.

This action [uses itself](./.github/workflows/test.yaml) to run its test suite.

```yaml
- uses: amancevice/setup-code-climate@v1
  with:
    cc_test_reporter_id: ${{ secrets.CC_TEST_REPORTER_ID }}
- run: cc-test-reporter before-build
# ...
- run: cc-test-reporter after-build
```

You may wish to disable the `after-build` step if your workflow is configured to trigger on `pull_request` events.

Your GitHub secrets will not be available to users submitting pull requests from outside your organization and the command will surely fail.

```yaml
- run: cc-test-reporter after-build
  if: ${{ github.event_name != 'pull_request' }}
```
