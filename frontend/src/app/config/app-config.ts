import {environment} from "../../environments/environment";

export default {
  oidc: {
    clientId: environment.oktaConfig.clientId,
    issuer: environment.oktaConfig.server,
    redirectUri: 'http://localhost:4200/logAdmin/callback',
    scopes: ['openid', 'profile', 'email']
  }
}
