import {Component, Inject, OnInit} from '@angular/core';

import {OKTA_AUTH} from "@okta/okta-angular";
import {OktaAuth} from "@okta/okta-auth-js";
import appConfig from "../../../config/app-config";
import OktaSignIn from "@okta/okta-signin-widget";
import {Roles} from "../../../common/enum/roles";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  oktaSignin: any;
  sessionStorage: Storage = sessionStorage;

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {
    this.oktaSignin = new OktaSignIn({
      logo: 'assets/images/logo.png',
      baseUrl: appConfig.oidc.issuer.split('oauth2')[0],
      clientId: appConfig.oidc.clientId,
      redirectUri: appConfig.oidc.redirectUri,
      authParams: {
        pkce: true,
        issuer: appConfig.oidc.issuer,
        scopes: appConfig.oidc.scopes
      },
      language: 'en'
    });
  }

  ngOnInit(): void {
    this.oktaSignin.remove();

    this.oktaSignin.renderEl({
        el: '#okta-sign-in-widget'
      },
      (response: any) => {
        if (response.status === 'SUCCESS') {
          this.oktaAuth.signInWithRedirect();
          this.sessionStorage.setItem('Role', Roles.ADMIN)
        }
      },
      (error: any) => {
        throw error;
      }
    );
  }

}
