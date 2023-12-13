const { render } = require('../utils');
const source = require('../../config/source');
const playwrightConfig = require('../../config/playwright');

describe('Render by playwright config', () => {
  it('should expose a function', () => {
    expect(render).toBeDefined();
  });

  it('should return expected value', async () => {
    expect(await render(source, playwrightConfig)).toMatchSnapshot();
  });
});
