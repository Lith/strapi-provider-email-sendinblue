'use strict';

/**
 * Module dependencies
 */

/* eslint-disable import/no-unresolved */
/* eslint-disable prefer-template */
// Public node modules.
const SibApiV3Sdk = require('sib-api-v3-sdk')
const defaultClient = SibApiV3Sdk.ApiClient.instance

const getOptions = function(config, options) {
    // The below check is more accurate then the loadash version for what
    // we need. So we can get rid of lodash which is vulnerable about
    // every second week... 
    options = typeof options == 'object' ? options : {};
    options.from = config.sendinblue_default_from || options.from;
    options.fromName = config.sendinblue_default_from_name || options.fromName;
    options.replyTo = config.sendinblue_default_replyto || options.replyTo;
    options.text = options.text || options.html;
    options.html = options.html || options.text;
    return options;
}

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
        apiKey.apiKey = config.sendinblue_api_key;
        const apiInstance = new SibApiV3Sdk.SMTPApi();
        const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

        return {
            send: (options, cb) => {
                return new Promise((resolve, reject) => {
                    options = getOptions(config, options);
                    sendSmtpEmail.sender = { email: options.from, name: options.fromName };
                    sendSmtpEmail.replyTo = { email: options.replyTo };
                    sendSmtpEmail.to = [{ email: options.to }];
                    sendSmtpEmail.subject = options.subject;
                    sendSmtpEmail.htmlContent = options.html;
                    sendSmtpEmail.textContent = options.text;

                    apiInstance.sendTransacEmail(sendSmtpEmail).then(data => {
                        resolve();
                    }, error => {
                        reject(error);
                    });
                });
            }
        };
    }
};
