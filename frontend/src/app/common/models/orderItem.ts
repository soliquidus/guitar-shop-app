import {CartItem} from "./cartItem";

export class OrderItem {
  imageUrl: string;
  unitPrice: number;
  quantity: number;
  productId: number | undefined;


  constructor(cartItem: CartItem) {
    this.imageUrl = cartItem.imageUrl;
    this.unitPrice = cartItem.unitPrice;
    this.quantity = cartItem.quantity;
    this.productId = cartItem.id;
  }
}
