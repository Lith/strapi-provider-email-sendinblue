'use strict';

/**
 * Module dependencies
 */

const SibApiV3Sdk = require('sib-api-v3-sdk');
const defaultClient = SibApiV3Sdk.ApiClient.instance;

/**
 * Retrieve default options
 * @param config
 * @param options
 * @returns {*}
 */
const getOptions = function (config, options) {
  options = typeof options == 'object' ? options : {};
  options.from = config.sendinblue_default_from || options.from;
  options.fromName = config.sendinblue_default_from_name || options.fromName;
  options.replyTo = config.sendinblue_default_replyto || options.replyTo;
  options.text = options.text || options.html;
  options.html = options.html || options.text;
  return options;
}

/**
 * Default method to send email transaction
 * @param config
 * @returns {{send: (function(*=, *): Promise<unknown>)}}
 */
const init = (config) => {
  const apiKey = defaultClient.authentications['api-key'];
  apiKey.apiKey = config.sendinblue_api_key;
  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  return {
    send: (options, cb) => {
      return new Promise((resolve, reject) => {
        options = getOptions(config, options);
        sendSmtpEmail.sender = {email: options.from, name: options.fromName};
        sendSmtpEmail.replyTo = {email: options.replyTo};
        sendSmtpEmail.to = [{email: options.to}];
        sendSmtpEmail.subject = options.subject;
        sendSmtpEmail.htmlContent = options.html;
        sendSmtpEmail.textContent = options.text;

        apiInstance.sendTransacEmail(sendSmtpEmail).then(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
      });
    }
  };
}

module.exports = {
  init,
  getOptions
};
