import {Injector, NgModule} from '@angular/core';
import {PreloadAllModules, Router, RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./components/home/home.component";
import {ProductListComponent} from "./components/product/product-list/product-list.component";
import {ProductDetailsComponent} from "./components/product/product-details/product-details.component";
import {CartDetailsComponent} from "./components/cart/cart-details/cart-details.component";
import {CheckoutComponent} from "./components/checkout/checkout.component";
import {ProductCategoryResolver} from "./services/resolvers/product-category.resolver";
import {OKTA_CONFIG, OktaAuthGuard, OktaCallbackComponent} from "@okta/okta-angular";
import appConfig from "./config/app-config";
import {OktaAuth} from "@okta/okta-auth-js";
import {LoginComponent} from "./components/admin/login/login.component";

const oktaConfig = appConfig.oidc;
const oktaAuth = new OktaAuth(oktaConfig);

function onAuthRequired(oktaAuth: OktaAuth, injector: Injector) {
  const router = injector.get(Router);
  router.navigate(['/logAdmin'])
}

const routes: Routes = [
  /*** Admin part ***/
  {path: 'logAdmin/callback', component: OktaCallbackComponent},
  {path: 'logAdmin', component: LoginComponent},
  {path: 'admin', canActivate: [OktaAuthGuard], data: {onAuthRequired: onAuthRequired},
  loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule)},

  /*** Checkout part ***/
  {path: 'checkout', component: CheckoutComponent},
  {path: 'cart-details', component: CartDetailsComponent},

  /*** Product part ***/
  {path: 'search/:keyword', component: ProductListComponent},
  {path: 'category/:id', component: ProductListComponent},
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: 'products', component: ProductListComponent},
  {path: 'category', component: ProductListComponent},

  /*** General part ***/
  {path: 'home', component: HomeComponent, resolve: {productCategories: ProductCategoryResolver}},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'enabled'
    }
  )],
  exports: [RouterModule],
  providers: [ProductCategoryResolver, {provide: OKTA_CONFIG, useValue: {oktaAuth, onAuthRequired}}]
})
export class AppRoutingModule {
}
