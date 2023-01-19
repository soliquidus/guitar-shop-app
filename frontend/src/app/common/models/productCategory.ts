import {Product} from "./product";

export class ProductCategory {
  public id: number;
  public categoryName: string;
  public products?: Product[];

  constructor(id: number, categoryName: string, products?: Product[]) {
    this.id = id;
    this.categoryName = categoryName;
    this.products = products;
  }
}
