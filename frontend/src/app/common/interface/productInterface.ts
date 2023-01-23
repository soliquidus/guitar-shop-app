import {Product} from "../models/product";
import {ProductUpdate} from "../models/productUpdate";
import {ProductCategory} from "../models/productCategory";

export interface ProductInterface {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

export interface ProductUpdateInterface {
  productCategory: ProductCategory
  product: ProductUpdate
}
