import {Component, OnInit} from '@angular/core';
import {Product} from "../../../common/models/product";
import {ProductService} from "../../../services/product.service";
import {ActivatedRoute} from "@angular/router";
import {LogService} from "../../../services/log.service";
import {CartService} from "../../../services/cart.service";
import {CartItem} from "../../../common/models/cartItem";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;
  totalQuantity: number = 1;
  isOutOfStock: boolean = false;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private logger: LogService
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });
  }

  private handleProductDetails() {
    const productId: number = +this.route.snapshot.paramMap.get('id')!;

    this.productService.getProduct(productId).subscribe({
      next: data => {
        this.product = data;
        // decrement by 1 from units in stock for totalQuantity logic (1 by default)
        this.product.unitsInStock--;
      },
      error: err => this.logger.error('Error while getting product', err),
      complete: () => this.logger.info('Product retrieved')
    })
  }

  addToCart() {
    this.logger.debug('Adding to cart', `${this.product.name}, ${this.product.unitPrice}`)

    let item = new CartItem(this.product);
    item.quantity = this.totalQuantity;
    this.cartService.addToCart(item);
  }

  decrementQuantity() {
    this.totalQuantity--;
    this.product.unitsInStock++;

    if (this.totalQuantity <= 0) {
      this.totalQuantity = 1;
    }

    this.product.unitsInStock <= 0 ? this.isOutOfStock = true : this.isOutOfStock = false;
  }

  incrementQuantity() {
    this.totalQuantity++;
    this.product.unitsInStock--;

    this.product.unitsInStock <= 0 ? this.isOutOfStock = true : this.isOutOfStock = false;
  }
}
