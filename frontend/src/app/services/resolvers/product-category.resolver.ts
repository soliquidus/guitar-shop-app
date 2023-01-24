import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {ProductService} from "../product.service";

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryResolver implements Resolve<any> {

  constructor(public productService: ProductService) {
  }

  /**
   * Get all categories with their products
   * @param route the given route to inject the resolver
   * @param state the actual state of the route
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.productService.getProductCategoriesWithProducts();
  }
}
