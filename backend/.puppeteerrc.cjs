const { join } = require('path');

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  // Changes the cache location for Puppeteer to the local project folder
  // so that Render doesn't delete it or lose it.
  cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
};
