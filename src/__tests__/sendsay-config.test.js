const { render } = require('../utils');
const source = require('../../config/source');
const sendsasyConfig = require('../../config/sendsay');

describe('Render by sendsay config', () => {
  it('should expose a function', () => {
    expect(render).toBeDefined();
  });

  it('should return expected value', () => {
    expect(render(source, sendsasyConfig)).toMatchSnapshot();
  });
});
