import {Product} from "./product";
import {MainModel} from "./mainModel";

export class ProductCategory extends MainModel{
  public categoryName: string;
  public products?: Product[];

  constructor(id: number, categoryName: string, products?: Product[]) {
    super(id);
    this.categoryName = categoryName;
    this.products = products;
  }
}
