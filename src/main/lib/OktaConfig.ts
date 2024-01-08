export const OktaConfig = {
    clientId: '0oaebt7g3piYOF5GE5d7',
    issuer: 'https://dev-03648792.okta.com/oauth2/default',
    redirectUri : 'http://localhost:3000/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce:true,
    disableHttpsCheck: true
}