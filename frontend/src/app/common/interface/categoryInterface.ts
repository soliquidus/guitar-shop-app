import {ProductCategory} from "../entity/productCategory";

export interface CategoryInterface {
  _embedded: {
    productCategory: ProductCategory[];
  }
}
