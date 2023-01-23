import {Product} from "./product";
import {ProductCategory} from "./productCategory";

export class ProductUpdate extends Product{
  category: ProductCategory


  constructor(id: number, sku: string, brand: string, name: string, description: string, unitPrice: number, imageUrl: string, active: boolean, unitsInStock: number, dateCreated: Date, lastUpdated: Date, productCategory: ProductCategory) {
    super(id, sku, brand, name, description, unitPrice, imageUrl, active, unitsInStock, dateCreated, lastUpdated);
    this.category = productCategory;
  }
}
