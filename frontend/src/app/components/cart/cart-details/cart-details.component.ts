import {Component, OnInit} from '@angular/core';
import {CartItem} from "../../../common/models/cartItem";
import {CartService} from "../../../services/cart.service";
import {Categories} from "../../../common/enum/categories";

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss']
})
export class CartDetailsComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;
  isOutOfStock: boolean = false;
  categories = Categories;

  constructor(
    private cartService: CartService
  ) {
  }

  ngOnInit(): void {
    this.listCartDetails();
  }

  private listCartDetails() {
    this.cartItems = this.cartService.cartItems;

    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    this.cartService.computeTotals();
  }

  incrementQuantity(item: CartItem) {
    item.unitsInStock--;
    console.log(item.unitsInStock)
    item.unitsInStock <= 0 ? this.isOutOfStock = true : this.isOutOfStock = false;
    if(!this.isOutOfStock) {
      this.cartService.addToCart(item);
    }
  }

  decrementQuantity(item: CartItem) {
    item.unitsInStock++
    this.cartService.decrementQuantity(item);
  }

  remove(item: CartItem) {
    this.cartService.remove(item);
  }
}
