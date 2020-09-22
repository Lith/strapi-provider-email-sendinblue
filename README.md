# strapi-provider-email-sendinblue

## Installation

Install the package from your app root directory 
* With **npm** `npm install strapi-provider-email-sendinblue --save`
* Or **yarn** `yarn add strapi-provider-email-sendinblue`

## Configuration

Edit `config/plugins.js` file 

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
