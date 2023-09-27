const { render } = require('../utils');
const source = require('../../config/source');
const defaultConfig = require('../../config/default');

describe('Render by default config', () => {
  it('should expose a function', () => {
    expect(render).toBeDefined();
  });

  it('should return expected value', () => {
    expect(render(source, defaultConfig)).toMatchSnapshot();
  });
});
