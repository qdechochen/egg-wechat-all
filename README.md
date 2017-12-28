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

## Install

```bash
$ npm i egg-wechat-all --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.wechatAll = {
  enable: true,
  package: 'egg-wechat-all',
};
```

## Configuration

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
    message: true,  // enable or disable co-wechat
    api: true,  // enable or disable co-wechat-api
    oauth: true,  // enable or disable co-wechat-oauth
    payment: true,  // enable or disable co-wechat-payment
  },
;
```

see [config/config.default.js](config/config.default.js) for more detail.

## How

```js
app.wechat.messageMiddleware //co-wechat middleware
app.wechat.api  // co-wechat-api
app.wechat.oauth  // co-wechat-oauth
app.wechat.payment  // co-wechat-payment
```

## Example

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

## Questions & Suggestions

Please open an issue [here](https://github.com/qdechochen/egg-wechat-all/issues).

## License

[MIT](LICENSE)
