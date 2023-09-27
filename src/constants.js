const path = require('path');

const CONFIG_NAME = '.github.checks.json';
const CONFIG_PATH = path.resolve(process.cwd(), CONFIG_NAME);

module.exports = {
  CONFIG_PATH,
};
