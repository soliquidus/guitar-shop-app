import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./components/home/home.component";
import {ProductListComponent} from "./components/product/product-list/product-list.component";
import {ProductDetailsComponent} from "./components/product/product-details/product-details.component";
import {CartDetailsComponent} from "./components/cart/cart-details/cart-details.component";

const routes: Routes = [
  {path: 'cart-details', component: CartDetailsComponent},
  {path: 'search/:keyword', component: ProductListComponent},
  {path: 'category/:id', component: ProductListComponent},
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: 'products', component: ProductListComponent},
  {path: 'category', component: ProductListComponent},
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      preloadingStrategy: PreloadAllModules
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
