import {Injectable} from '@angular/core';
import {CartItem} from "../common/entity/cartItem";
import {Subject} from "rxjs";
import {LogService} from "./log.service";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor(private logger: LogService) {
  }

  addToCart(cartItem: CartItem) {
    let alreadyExists: boolean = false;
    let existingItem: CartItem | undefined;

    if (this.cartItems.length > 0) {
      // find item in the cart based on item id
      existingItem = this.cartItems.find(item => item.id === cartItem.id);

      alreadyExists = (existingItem != undefined);
    }

    if (alreadyExists) {
      // increment quantity
      existingItem!.quantity++;
    } else {
      // add item to cart
      this.cartItems.push(cartItem);
    }

    // compute cart total price and total quantity
    this.computeTotals();
  }

  computeTotals() {
    let totalPrice: number = 0;
    let totalQuantity: number = 0;

    for (let item of this.cartItems) {
      totalPrice += item.quantity * item.unitPrice;
      totalQuantity += item.quantity;
    }

    // all subscribers will receive the new data
    this.totalPrice.next(totalPrice);
    this.totalQuantity.next(totalQuantity);

    this.logCartData(totalPrice, totalQuantity);
  }

  private logCartData(totalPrice: number, totalQuantity: number) {
    let cart: string[] = []

    for (let item of this.cartItems) {
      const totalPrice = item.quantity * item.unitPrice;
      let cartItem = `name: ${item.name}, quantity: ${item.quantity}, unitPrice: ${item.unitPrice}, totalPrice: ${totalPrice}`;
      cart.push(cartItem);
    }

    let total = `totalPrice: ${totalPrice.toFixed(2)}, totalQuantity: ${totalQuantity}`;

    this.logger.debug('Contents of the cart', cart, total)
  }

  decrementQuantity(item: CartItem) {
    item.quantity--;

    if (item.quantity === 0) {
      this.remove(item);
    } else {
      this.computeTotals();
    }
  }

  remove(item: CartItem) {
    let itemIndex = this.cartItems.findIndex(cartItem => cartItem.id === item.id);

    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
      this.computeTotals();
    }
  }
}
