import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HeaderComponent} from './components/shared/header/header.component';
import {HomeComponent} from './components/home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from "@angular/router";
import {ProductListComponent} from './components/product/product-list/product-list.component';
import {LogPublisherService} from "./services/logPublisher.service";
import {LogService} from "./services/log.service";
import {HttpClientModule} from "@angular/common/http";
import {SearchComponent} from './components/shared/search/search.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ProductDetailsComponent} from './components/product/product-details/product-details.component';
import {BannerComponent} from './components/shared/banner/banner.component';
import {FooterComponent} from './components/shared/footer/footer.component';
import {CartStatusComponent} from './components/cart/cart-status/cart-status.component';
import {CartDetailsComponent} from './components/cart/cart-details/cart-details.component';
import {CheckoutComponent} from './components/checkout/checkout.component';
import {ReactiveFormsModule} from "@angular/forms";
import {OrderSummaryComponent} from './components/shared/order-summary/order-summary.component';
import {LoginComponent} from './components/admin/login/login.component';
import {LoginStatusComponent} from './components/admin/login-status/login-status.component';
import {OktaAuthModule} from "@okta/okta-angular";
import {ProductManagementComponent} from './components/admin/management/product-management/product-management.component';
import {AdminPageComponent} from './components/admin/admin-page/admin-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ProductListComponent,
    SearchComponent,
    ProductDetailsComponent,
    BannerComponent,
    FooterComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    OrderSummaryComponent,
    LoginComponent,
    LoginStatusComponent,
    ProductManagementComponent,
    AdminPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    OktaAuthModule
  ],
  exports: [
    HeaderComponent
  ],
  providers: [LogService, LogPublisherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
