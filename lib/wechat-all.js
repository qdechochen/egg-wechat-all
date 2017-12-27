'use strict';

const assert = require('assert');
const wechat = require('co-wechat');
const WechatApi = require('co-wechat-api');
const OAuth = require('co-wechat-oauth');
const Payment = require('co-wechat-payment');

module.exports = app => {
  const config = app.config.wechatAll;
  const wechatAll = {};
  const redis = app.redis;

  class Cache {
    static async get(key) {
      try {
        const raw = await redis.get(key);
        return JSON.parse(raw);
      } catch (e) {
        throw (e);
      }
    }

    static async set(key, value) {
      try {
        await redis.set(key, JSON.stringify(value));
      } catch (e) {
        throw (e);
      }
    }

    static async getAccessToken() {
      return this.get('wechat_access_token');
    }

    static async setAccessToken(token) {
      this.set('wechat_access_token', token);
    }

    static async getTicketToken(type) {
      return this.get(`wechat_ticket_${type}`);
    }

    static async setTicketToken(type, token) {
      this.set(`wechat_ticket_${type}`, token);
    }

    static async getOAuthToken(openid) {
      return this.get(`wechat_oauth_${openid}`);
    }

    static async setOAuthToken(openid, token) {
      this.set(`wechat_oauth_${openid}`, token);
    }
  }

  assert(config.appid, '[egg-wechat-all]: appid is required');

  // message middleware
  if (config.modules.message) {
    assert(config.token, '[egg-wechat-all: message]: token is required');
    assert(config.encodingAESKey, '[egg-wechat-all: message]: encodingAESKey is required');
    wechatAll.messageMiddleware = wechat({
      appid: config.appid,
      token: config.token,
      encodingAESKey: config.encodingAESKey,
    }).middleware;
  }

  // wechat api
  if (config.modules.api) {
    assert(config.appsecret, '[egg-wechat-all: api]: appsecret is required');

    wechatAll.api = new WechatApi(config.appid, config.appsecret, Cache.getAccessToken, Cache.setAccessToken);
    wechatAll.api.registerTicketHandle(Cache.getTicketToken, Cache.setTicketToken);
  }

  // oauth api
  if (config.modules.oauth) {
    assert(config.appsecret, '[egg-wechat-all: oauth]: appsecret is required');
    wechatAll.oauth = new OAuth(config.appid, config.appsecret, Cache.getOAuthToken, Cache.saveOAuthToken);
  }

  // payment
  if (config.modules.payment) {
    wechatAll.payment = new Payment(Object.assign({}, {
      appId: config.appid,
    }, config.payment));
  }

  app.wechat = wechatAll;

  return wechatAll;
};
