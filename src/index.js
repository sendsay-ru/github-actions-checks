#!/usr/bin/env node

const source = require('../config/source');
const { render, getConfig, checkDirs, saveFiles } = require('./utils');

checkDirs();

const config = getConfig();

const compiled = render(source, config);
saveFiles(compiled);
