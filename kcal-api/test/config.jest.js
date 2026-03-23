/** @type {import('jest').Config} */
const config = {
  verbose: true,
  "globalTeardown": "./test/globalTeardown.js"
};

module.exports = config;