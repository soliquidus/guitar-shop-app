import {Product} from "./product";
import {ProductCategory} from "./productCategory";

export class ProductUpdate {
  productCategory: ProductCategory
  product: Product


  constructor(productCategory: ProductCategory, product: Product) {
    this.productCategory = productCategory;
    this.product = product;
  }
}
