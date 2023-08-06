const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const schema = require('./schema');
const dirs = require('../config/dirs');
const emptyConfig = require('../config/empty');
const { config } = require('process');

const CONFIG_NAME = '.github.checks.json';
const CONFIG_PATH = path.resolve(process.cwd(), CONFIG_NAME);

module.exports.checkDirs = () => {
  dirs.forEach((dir) => {
    const dirPath = path.resolve(process.cwd(), dir);

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    }
  });

  if (!fs.existsSync(CONFIG_PATH)) {
    fs.cpSync(
      path.resolve(__dirname, '../config/default.json'),
      path.resolve(CONFIG_PATH),
    );
  }
};

module.exports.getConfig = () => {
  if (!fs.existsSync(CONFIG_PATH)) {
    throw 'No config file';
  }

  const clientConfig = JSON.parse(
    fs.readFileSync(CONFIG_PATH, {
      encoding: 'utf8',
    }),
  );

  return {
    ...emptyConfig,
    ...clientConfig,
  };
};

const finalEdit = (content) => {
  return content.replace(/\ +$/gm, '').replace(/\n\n\n/gm, '\n\n');
};

module.exports.saveFiles = (compiledSource) => {
  compiledSource.forEach(({ output, content }) => {
    fs.writeFileSync(path.resolve(process.cwd(), output), content);
  });
};

const getData = (config) => {
  const checks = [];

  config.jobs.forEach((job) => {
    checks.push(...job.steps);
  });

  return {
    ...config,
    checks,
  };
};

module.exports.render = (source, config) => {
  const validation = schema.validate(config);

  if (validation.error) {
    throw validation.error;
  }

  const data = getData(config);

  return source.map(({ input, output }) => {
    let res = {};

    ejs.renderFile(
      path.resolve(__dirname, '../', input),
      data,
      function (err, content) {
        if (err) {
          throw err;
        }

        res = {
          output,
          content: finalEdit(content),
        };
      },
    );

    return res;
  });
};
