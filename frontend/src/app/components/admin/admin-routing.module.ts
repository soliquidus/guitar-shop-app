import {Injector, NgModule} from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';
import {OKTA_CONFIG, OktaAuthGuard} from "@okta/okta-angular";
import {AdminPageComponent} from "./admin-page/admin-page.component";
import appConfig from "../../config/app-config";
import {OktaAuth} from "@okta/okta-auth-js";
import {ProductManagementComponent} from "./management/product-management/product-management.component";

const oktaConfig = appConfig.oidc;
const oktaAuth = new OktaAuth(oktaConfig);

function onAuthRequired(oktaAuth: OktaAuth, injector: Injector) {
  const router = injector.get(Router);
  router.navigate(['admin/logAdmin'])
}

const adminRoutes: Routes = [
  {path: '', component: AdminPageComponent, canActivate: [OktaAuthGuard],
    data: {onAuthRequired: onAuthRequired}, children: [
      {path: 'product', component: ProductManagementComponent}
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule],
  providers: [{provide: OKTA_CONFIG, useValue: {oktaAuth, onAuthRequired}}]
})
export class AdminRoutingModule { }
