const ora = require("ora");
const { RETRY_COUNT } = require("./constants");

let retryCount = 1;
async function withLoading(fn, message, ...args) {
  let spinner = ora(message);
  spinner.start();
  try {
    let results = await fn(...args);
    spinner.succeed();
    return results;
  } catch (e) {
    if (retryCount < RETRY_COUNT) {
      retryCount++;
      fn(...args);
    } else {
      spinner.fail("Request failed, refetch ...");
    }
  }
}

module.exports = withLoading;
