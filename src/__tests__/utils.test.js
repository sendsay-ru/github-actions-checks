const { render } = require('../utils');
const source = require('../../config/source.json');
const emptyConfig = require('../../config/empty');
const defaultConfig = require('../../config/default');
const sendsasyConfig = require('../../config/sendsay');

describe('Render', () => {
  it('should expose a function', () => {
    expect(render).toBeDefined();
  });

  it('should return expected value with empty config', () => {
    expect(render(source, emptyConfig)).toMatchSnapshot();
  });

  it('should return expected value with default config', () => {
    expect(render(source, defaultConfig)).toMatchSnapshot();
  });

  it('should return expected value with sendsay config', () => {
    expect(render(source, sendsasyConfig)).toMatchSnapshot();
  });
});
