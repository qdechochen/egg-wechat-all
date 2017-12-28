# egg-wechat-all

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-wechat-all.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-wechat-all
[travis-image]: https://img.shields.io/travis/eggjs/egg-wechat-all.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-wechat-all
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-wechat-all.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-wechat-all?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-wechat-all.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-wechat-all
[snyk-image]: https://snyk.io/test/npm/egg-wechat-all/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-wechat-all
[download-image]: https://img.shields.io/npm/dm/egg-wechat-all.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-wechat-all

<!--
Description here.
-->

## 安装

```bash
$ npm i egg-wechat-all --save
```

## 开启插件

```js
// config/plugin.js
exports.wechatAll = {
  enable: true,
  package: 'egg-wechat-all',
};
```
## 详细配置

```js
// {app_root}/config/config.default.js
exports.wechatAll = {
  appid: '',
  appsecret: '',
  token: '',
  encodingAESKey: '',
  payment: {
    partnerKey: '',
    mchId: '',
    notifyUrl: '',
    pfx: '',
  },
  modules: {
    message: true,  // 是否启用 co-wechat
    api: true,  // 是否启用 co-wechat-api
    oauth: true,  // 是否启用 co-wechat-oauth
    payment: true,  // 是否启用 co-wechat-payment
  },
;
```

请到 [config/config.default.js](config/config.default.js) 查看详细配置项说明。


## 如何使用

```js
app.wechat.messageMiddleware //co-wechat middleware
app.wechat.api  // co-wechat-api
app.wechat.oauth  // co-wechat-oauth
app.wechat.payment  // co-wechat-payment
```

更多信息，请参照：

[co-wechat] (https://github.com/node-webot/co-wechat)

[co-wechat-api] (https://github.com/node-webot/co-wechat-api)

[co-wechat-oauth] (https://github.com/node-webot/co-wechat-oauth)

[co-wechat-payment] (https://github.com/perzy/co-wechat-payment)


## 代码示例

```js
'use strict';
const Controller = require('egg').Controller;

module.exports = app => {
  class WechatController extends Controller {
  }

  WechatController.prototype.index = app.wechat.messageMiddleware(async (message, ctx) => {
    ctx.app.wechat.api.sendText(message.FromUserName, 'This is the reply');
    return `Received your message: ${message.Content}`;
  });

  return WechatController;
};


```
<!-- 描述如何在单元测试中使用此插件，例如 schedule 如何触发。无则省略。-->

## 提问交流

请到 [这里](https://github.com/qdechochen/egg-wechat-all/issues) 交流。

## License

[MIT](LICENSE)
