import {Product} from "./product";
import {ProductCategory} from "./productCategory";

export class ProductDto extends Product {
  category: ProductCategory

  constructor(sku: string, brand: string, name: string, description: string, unitPrice: number, imageUrl: string, active: boolean, unitsInStock: number, dateCreated: Date, lastUpdated: Date, productCategory: ProductCategory, id?: number) {
    super(sku, brand, name, description, unitPrice, imageUrl, active, unitsInStock, dateCreated, lastUpdated);
    this.category = productCategory;
    this.id = id;
  }
}
