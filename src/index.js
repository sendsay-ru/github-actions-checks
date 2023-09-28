#!/usr/bin/env node
const source = require('../config/source');
const { render, getConfig, checkConfigDir, saveFiles } = require('./utils');

checkConfigDir();

const config = getConfig();

render(source, config).then(saveFiles);
