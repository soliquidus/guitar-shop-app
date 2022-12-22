import {ProductCategory} from "../entity/productCategory";

export interface ProductCategoryInterface {
  _embedded: {
    productCategory: ProductCategory[];
  }
}
