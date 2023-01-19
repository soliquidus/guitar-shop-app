import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Product} from "../../common/models/product";
import {ProductService} from "../../services/product.service";
import {LogService} from "../../services/log.service";
import {Categories} from "../../common/enum/categories";
import * as _ from 'lodash';
import {ProductCategory} from "../../common/models/productCategory";
import {ActivatedRoute} from "@angular/router";
import {CartItem} from "../../common/models/cartItem";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  productCategories: ProductCategory[] = [];
  recentGuitars: Product[] = [];
  recentAcousticGuitars: Product[] = [];
  recentBasses: Product[] = [];
  recentAccessories: Product[] = [];
  categories = Categories;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private changeDetector: ChangeDetectorRef,
    private cartService: CartService,
    private logger: LogService,
  ) {
  }

  ngOnInit(): void {
    this.getProductCategoriesWithProducts();
    this.getLastAddedProducts();
  }

  getProductCategoriesWithProducts() {
    this.route.data.subscribe(
      data => this.productCategories = data['productCategories']
    )
  }

  getLastAddedProducts() {

    let guitars: Product[] = [];
    let acousticGuitars: Product[] = [];
    let basses: Product[] = [];
    let accessories: Product[] = [];

    this.productCategories.forEach(category => {
      if (category.products) {
        switch (category.categoryName) {
          case this.categories.GUITARS:
            guitars = category.products;
            break;
          case this.categories.ACOUSTIC_GUITARS:
            acousticGuitars = category.products;
            break;
          case this.categories.BASSES:
            basses = category.products;
            break;
          case this.categories.ACCESSORIES:
            accessories = category.products;
            break;
          default:
            break;
        }
        let orderedGuitars = _.orderBy(guitars, 'creationDate', 'desc');
        let orderedAcoustics = _.orderBy(acousticGuitars, 'creationDate', 'desc');
        let orderedBasses = _.orderBy(basses, 'creationDate', 'desc');
        let orderedAccessories = _.orderBy(accessories, 'creationDate', 'desc');

        this.recentGuitars = orderedGuitars.slice(0, 3);
        this.recentAcousticGuitars = orderedAcoustics.slice(0, 3);
        this.recentBasses = orderedBasses.slice(0, 3);
        this.recentAccessories = orderedAccessories.slice(0, 3);
      }
    })
  }

  addToCart(product: Product) {
    this.logger.debug('Adding to cart', `${product.name}, ${product.unitPrice}`)
    product.unitsInStock--

    const item = new CartItem(product);
    this.cartService.addToCart(item);
  }
}
