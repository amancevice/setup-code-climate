# Setup Code Climate GitHub Action

[![test](https://img.shields.io/github/workflow/status/amancevice/setup-code-climate/test?logo=github&style=flat-square)](https://github.com/amancevice/setup-code-climate/actions)
[![coverage](https://img.shields.io/codeclimate/coverage/amancevice/setup-code-climate?logo=code-climate&style=flat-square)](https://codeclimate.com/github/amancevice/setup-code-climate/test_coverage)
[![maintainability](https://img.shields.io/codeclimate/maintainability/amancevice/setup-code-climate?logo=code-climate&style=flat-square)](https://codeclimate.com/github/amancevice/setup-code-climate/maintainability)

Setup `cc-test-reporter` binary to use with your GitHub Actions workflows

```yaml
- uses: amancevice/setup-code-climate@v0
  with:
    cc_test_reporter_id: ${{ secrets.CC_TEST_REPORTER_ID }}
- run: cc-test-reporter before-build
# ...
- run: cc-test-reporter after-build
```

This action [uses itself](./.github/workflows/test.yaml) to run its test suite.
