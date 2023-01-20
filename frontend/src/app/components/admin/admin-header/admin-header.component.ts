import {Component, Inject, OnInit} from '@angular/core';
import {Roles} from "../../../common/enum/roles";
import {OKTA_AUTH, OktaAuthStateService} from "@okta/okta-angular";
import {OktaAuth} from "@okta/okta-auth-js";

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {
  dropMenu: boolean = false;
  isAuthenticated: boolean = false;
  userFullName: string = '';
  sessionStorage: Storage = sessionStorage;

  constructor(
    private oktaAuthService: OktaAuthStateService,
    @Inject(OKTA_AUTH) private oktaAuth: OktaAuth) { }

  ngOnInit(): void {
    // Subscribe to authentification state changes
    this.oktaAuthService.authState$.subscribe(
      (result) => {
        this.isAuthenticated = result.isAuthenticated!;
        this.getUserDetails();
      }
    )
  }

  private getUserDetails() {
    if(this.isAuthenticated) {
      // Fetch the logged-in user details (user's claims)
      // user full name is exposed as a property name
      this.oktaAuth.getUser().then(
        (res) => {
          this.userFullName = res.name as string;
        }
      )
    }
  }

  logout() {
    // Terminates the session with Okta and removes current tokens.
    this.oktaAuth.signOut();
    this.sessionStorage.clear();
    this.sessionStorage.setItem('Role', Roles.ANONYMOUS);
  }
}
