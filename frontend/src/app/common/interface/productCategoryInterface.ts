import {ProductCategory} from "../models/productCategory";

export interface ProductCategoryInterface {
  _embedded: {
    productCategory: ProductCategory[];
  }
}
