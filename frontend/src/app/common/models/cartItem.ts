import {Product} from "./product";

export class CartItem {
  id: number;
  sku: string;
  name: string;
  imageUrl: string;
  unitPrice: number;
  quantity: number;
  unitsInStock: number;

  constructor(product: Product) {
    this.id = product.id;
    this.sku = product.sku;
    this.name = product.name;
    this.imageUrl = product.imageUrl;
    this.unitPrice = product.unitPrice;
    this.unitsInStock = product.unitsInStock;

    this.quantity = 1;
  }
}
