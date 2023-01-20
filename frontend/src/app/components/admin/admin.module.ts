import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {AdminHeaderComponent} from "./admin-header/admin-header.component";
import {AdminPageComponent} from "./admin-page/admin-page.component";
import {LoginComponent} from "./login/login.component";
import {ProductManagementComponent} from "./management/product-management/product-management.component";
import {OktaAuthModule} from "@okta/okta-angular";
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    AdminPageComponent,
    AdminHeaderComponent,
    LoginComponent,
    ProductManagementComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterModule,
    OktaAuthModule,
    SharedModule
  ],
  exports: [AdminHeaderComponent, AdminPageComponent, LoginComponent, ProductManagementComponent]
})
export class AdminModule { }
