const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const configSchema = require('../config/config.schema');
const emptyConfig = require('../config/empty');
const { CONFIG_PATH } = require('./constants');

const checkDir = (filePath) => {
  let dir = '';

  const folders = filePath.split('/').slice(0, -1);

  folders.forEach((folder) => {
    dir = `${dir}${dir !== '' ? '/' : ''}${folder}`;

    const absolutePath = path.resolve(process.cwd(), dir);

    if (!fs.existsSync(absolutePath)) {
      fs.mkdirSync(absolutePath);
    }
  });
};

const checkConfigDir = () => {
  if (!fs.existsSync(CONFIG_PATH)) {
    fs.cpSync(
      path.resolve(__dirname, '../config/default.json'),
      path.resolve(CONFIG_PATH),
    );
  }
};

const getConfig = () => {
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
  return content.replace(/ +$/gm, '').replace(/\n\n\n/gm, '\n\n');
};

const saveFiles = (compiledSource) => {
  compiledSource.forEach(({ output, content }) => {
    checkDir(output);

    fs.writeFileSync(path.resolve(process.cwd(), output), content, {
      mode: 0o775,
    });
  });
};

const getData = (config) => {
  const checks = config.jobs.reduce((acc, job) => [...acc, ...job.steps], []);

  return {
    ...config,
    checks,
  };
};

const render = (source, config) => {
  const validationConig = configSchema.validate(config);

  if (validationConig.error) {
    throw validationConig.error;
  }

  const data = getData(config);

  return source
    .filter(({ condition }) => !condition || condition(config))
    .map(({ input, output }) => {
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

module.exports = {
  checkConfigDir,
  getConfig,
  saveFiles,
  render,
};
