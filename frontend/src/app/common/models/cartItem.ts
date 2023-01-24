import {Product} from "./product";
import {MainModel} from "./mainModel";

export class CartItem extends MainModel{
  sku: string;
  name: string;
  imageUrl: string;
  unitPrice: number;
  quantity: number;
  unitsInStock: number;

  constructor(product: Product) {
    super(product.id);
    this.sku = product.sku;
    this.name = product.name;
    this.imageUrl = product.imageUrl;
    this.unitPrice = product.unitPrice;
    this.unitsInStock = product.unitsInStock;

    this.quantity = 1;
  }
}
