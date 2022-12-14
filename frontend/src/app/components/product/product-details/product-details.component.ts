import { Component, OnInit } from '@angular/core';
import {Product} from "../../../common/entity/product";
import {ProductService} from "../../../services/product.service";
import {ActivatedRoute} from "@angular/router";
import {LogService} from "../../../services/log.service";
import {CartService} from "../../../services/cart.service";
import {CartItem} from "../../../common/entity/cartItem";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product!: Product;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private logger: LogService
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });
  }

  private handleProductDetails() {
    const productId: number = +this.route.snapshot.paramMap.get('id')!;

    this.productService.getProduct(productId).subscribe({
      next: data => this.product = data,
      error: err => this.logger.error('Error while getting product', err),
      complete: () => this.logger.info('Product retrieved')
    })
  }

  addToCart() {
    this.logger.debug('Adding to cart', `${this.product.name}, ${this.product.unitPrice}`)

    const item = new CartItem(this.product);
    this.cartService.addToCart(item);
  }
}
