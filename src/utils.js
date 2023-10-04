const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const prettier = require('prettier');
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
    ...clientConfig,
  };
};

const finalEdit = async (content ) => {
  return await prettier.format(content, {
    singleQuote: false,
    trailingComma: 'all',
    parser: 'yaml',
  });
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
    ...emptyConfig,
    ...config,
    checks,
  };
};

const render = async (source, config) => {
  const validationConig = configSchema.validate(config);

  if (validationConig.error) {
    throw validationConig.error;
  }

  const data = getData(config);

  return await Promise.all(
    source
      .filter(({ condition }) => !condition || condition(config))
      .map(async ({ input, output }) => {
        const draftContent = await ejs.renderFile(
          path.resolve(__dirname, '../', input),
          data,
        );

        const content = await finalEdit(draftContent);

        return {
          output,
          content,
        };
      }),
  );
};

module.exports = {
  checkConfigDir,
  getConfig,
  saveFiles,
  render,
};
