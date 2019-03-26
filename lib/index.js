'use strict';

/**
 * Module dependencies
 */

/* eslint-disable import/no-unresolved */
/* eslint-disable prefer-template */
// Public node modules.
const _ = require('lodash');
const SibApiV3Sdk = require('sib-api-v3-sdk')
const defaultClient = SibApiV3Sdk.ApiClient.instance

/* eslint-disable no-unused-vars */
module.exports = {
  provider: 'sendinblue',
  name: 'Sendinblue',
  auth: {
    sendinblue_default_from_name: {
      label: 'Sendinblue Default From Name',
      type: 'text'
    },
    sendinblue_default_from: {
      label: 'Sendinblue Default From Email',
      type: 'text'
    },
    sendinblue_default_replyto: {
      label: 'Sendinblue Default Reply-To Email',
      type: 'text'
    },
    sendinblue_api_key: {
      label: 'Sendinblue API Key',
      type: 'text'
    }
  },

  init: (config) => {
    const apiKey = defaultClient.authentications['api-key'];
    sendinblueiKey = config.sendinblue_api_key;
    const apiInstance = new SibApiV3Sdk.SMTPApi();
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    return {
      send: (options, cb) => {
        return new Promise((resolve, reject) => {
          options = _.isObject(options) ? options : {};
          options.from = options.from || config.sendinblue_default_from;
          options.fromName = options.fromName || config.sendinblue_default_from_name;
          options.replyTo = options.replyTo || config.sendinblue_default_replyto;
          options.text = options.text || options.html;
          options.html = options.html || options.text;

          sendSmtpEmail.sender = [{ email: options.from, name: options.fromName }];
          sendSmtpEmail.replyTo = [{ email: options.replyTo }];
          sendSmtpEmail.to = [{ email: recipient }];
          sendSmtpEmail.subject = options.subject;
          sendSmtpEmail.htmlContent = options.html;
          sendSmtpEmail.textContent = options.text;

          apiInstance.sendTransacEmail(sendSmtpEmail).then(data => {
            console.log('Email API called successfully. Returned data: ' + data);
          }, error => {
            console.log('Sendinblue Error', error);
            reject(error);
          });
        })
      }
    };
  }
};