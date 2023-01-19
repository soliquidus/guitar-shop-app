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
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.productService.getProductCategoriesWithProducts();
  }
}
