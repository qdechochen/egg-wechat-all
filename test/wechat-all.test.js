'use strict';

const mock = require('egg-mock');

describe('test/wechat-all.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/wechat-all-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, wechatAll')
      .expect(200);
  });
});
