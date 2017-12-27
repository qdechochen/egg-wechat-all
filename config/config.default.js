'use strict';

/**
 * egg-wechat-all default config
 * @member Config#wechatAll
 * @property {String} SOME_KEY - some description
 */
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
    message: true,
    api: true,
    oauth: true,
    payment: true,
  },
};
