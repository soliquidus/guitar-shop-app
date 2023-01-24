import {Product} from "../models/product";
import {ProductDto} from "../models/productDto";
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

export interface ProductDtoInterface {
  productCategory: ProductCategory
  product: ProductDto
}
