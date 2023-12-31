const { render } = require('../utils');
const source = require('../../config/source');
const emptyConfig = require('../../config/empty');

describe('Render by empty config', () => {
  it('should expose a function', () => {
    expect(render).toBeDefined();
  });

  it('should return expected value', async () => {
    expect(await render(source, emptyConfig)).toMatchSnapshot();
  });
});
