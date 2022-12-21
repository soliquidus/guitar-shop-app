import {Component, OnInit} from '@angular/core';
import {Product} from "../../../common/entity/product";
import {ProductService} from "../../../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LogService} from "../../../services/log.service";

const IMAGE_URL: string = '../../../../assets/images/';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  searchMode: boolean = false;
  imageUrls: string[] = [];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private logger: LogService
  ) {
    // Banner images urls
    const productsUrl = `url(${IMAGE_URL}all-products.png)`;
    const guitarUrl = `url(${IMAGE_URL}guitar-banner.png)`;
    const acousticUrl = `url(${IMAGE_URL}acoustic-banner.png)`;
    const bassUrl = `url(${IMAGE_URL}bass-banner.png)`;
    const accessoryUrl = `url(${IMAGE_URL}accessories-banner.png)`;

    this.imageUrls.push(productsUrl);
    this.imageUrls.push(guitarUrl);
    this.imageUrls.push(acousticUrl);
    this.imageUrls.push(bassUrl);
    this.imageUrls.push(accessoryUrl);
  }

  ngOnInit(): void {
    this.route.params.subscribe({
      next: () => this.listProducts(),
      error: err => this.logger.error('Product list initialization', err),
      complete: () => this.logger.info('Product list fetch success')
    });
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  private handleSearchProducts() {
    const keyword: string = this.route.snapshot.paramMap.get('keyword')!;

    // search for products using keyword
    this.productService.searchProducts(keyword).subscribe(
      data => {
        console.log(JSON.stringify(this.products))
        this.products = data;
      }
    )
  }

  handleListProducts() {

    // check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // get the "id" param string and convert string to a number using the "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    } else {
      // no category id available so default id to 1
      this.currentCategoryId = 1;
    }

    // get products for given category id
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    )
  }
}
