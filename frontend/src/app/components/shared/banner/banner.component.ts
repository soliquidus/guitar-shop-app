import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

const IMAGE_URL: string = '../../../../assets/images/';

// Banner images urls
const PRODUCTS_URL = `url(${IMAGE_URL}all-products.png)`;
const GUITARS_URL = `url(${IMAGE_URL}guitar-banner.png)`;
const ACOUSTICS_URL = `url(${IMAGE_URL}acoustic-banner.png)`;
const BASS_URL = `url(${IMAGE_URL}bass-banner.png)`;
const ACCESSORY_URL = `url(${IMAGE_URL}accessories-banner.png)`;
const PRODUCT_DETAILS_URL = `url(${IMAGE_URL}product-details-banner.png)`;
const CART_DETAILS = `url(${IMAGE_URL}cart-banner.png)`;

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  searchMode: boolean = false;
  productView: boolean = false;
  allProductsView: boolean = false;
  cartDetailsView: boolean = false;
  imageUrls: {[key: string]: string} = {
    PRODUCTS: PRODUCTS_URL,
    GUITARS: GUITARS_URL,
    ACOUSTICS: ACOUSTICS_URL,
    BASSES: BASS_URL,
    ACCESSORIES: ACCESSORY_URL,
    PRODUCT_DETAILS: PRODUCT_DETAILS_URL,
    CART_DETAILS: CART_DETAILS
  }
  currentCategory: number = 0;


  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    this.allProductsView = this.router.url.includes('products') && !this.route.snapshot.paramMap.has('id');
    this.productView = this.router.url.includes('products') && this.route.snapshot.paramMap.has('id');
    this.cartDetailsView = this.router.url.includes('cart-details');

    this.route.params.subscribe(() => {
      if(this.route.snapshot.paramMap.has('id') && !this.router.url.includes('products')){
        this.currentCategory = +this.route.snapshot.paramMap.get('id')!;
      }
    })
  }

}
