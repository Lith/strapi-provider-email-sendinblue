# strapi-provider-email-sendinblue

[![npm version](https://img.shields.io/npm/v/strapi-provider-email-sendinblue.svg)](https://www.npmjs.org/package/strapi-provider-email-sendinblue)
[![npm downloads](https://img.shields.io/npm/dm/strapi-provider-email-sendinblue.svg)](https://www.npmjs.org/package/strapi-provider-email-sendinblue)

**Non-Official** SendInBlue provider for Strapi Email

## Historic

This plugin was develop originally by @eddybordi, but due to inactivity, I've ask him to fork the project, contribute and maintain it for all next Strapi release.
Thanks to him :)

## Installation

Install the package from your app root directory

* With **npm** `npm install strapi-provider-email-sendinblue --save`
* Or **yarn** `yarn add strapi-provider-email-sendinblue`

## Configuration

Edit `config/plugins.js` file

### Example configuration for Strapi V4 :

```javascript
module.exports = ({env}) => ({
  email: {
    config: {
      provider: 'strapi-provider-email-sendinblue',
      providerOptions: {
        sendinblue_api_key: env('SIB_API_KEY', 'xkeysib-0987654321-abcdef'),
        sendinblue_default_replyto: env('SIB_DEFAULT_REPLY_TO', 'contact@example.com'),
        sendinblue_default_from: env('SIB_DEFAULT_FROM', 'no-reply@example.com'),
        sendinblue_default_from_name: env('SIB_DEFAULT_FROM_NAME', 'Sender Name'),
      },
    },
  },
});
```

### Example configuration for Strapi V3 :

```javascript
module.exports = ({env}) => ({
  email: {
    provider: 'sendinblue',
    providerOptions: {
      sendinblue_api_key: env('SIB_API_KEY', 'xkeysib-0987654321-abcdef'),
      sendinblue_default_replyto: env('SIB_DEFAULT_REPLY_TO', 'contact@example.com'),
      sendinblue_default_from: env('SIB_DEFAULT_FROM', 'no-reply@example.com'),
      sendinblue_default_from_name: env('SIB_DEFAULT_FROM_NAME', 'Sender Name'),
    },
  },
});
```

## Resources

- [MIT License](LICENSE.md)

## Links

- [Strapi website](http://strapi.io/)
- [Strapi community on Slack](http://slack.strapi.io)
- [Strapi news on Twitter](https://twitter.com/strapijs)
