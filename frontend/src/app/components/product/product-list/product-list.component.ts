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
  previousCategoryId: number = 1;
  searchMode: boolean = false;
  allProducts: boolean = false;
  imageUrls: string[] = [];

  // pagination
  pageNumber: number = 1;
  pageSize: number = 6;
  totalElements: number = 0;

  previousKeyword: string = '';

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
    this.allProducts = this.router.url.includes('products');

    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  private handleSearchProducts() {
    const keyword: string = this.route.snapshot.paramMap.get('keyword')!;

    // if keyword different from previous, page number set to 1
    if (this.previousKeyword != keyword) {
      this.pageNumber = 1;
    }

    this.previousKeyword = keyword;
    this.logger.debug('keyword | pageNumber', `${keyword} | ${this.pageNumber}`);

    // search for products using keyword
    this.productService.searchProductsWithPagination(this.pageNumber - 1, this.pageSize, keyword)
      .subscribe(this.processResult());
  }

  handleListProducts() {

    if(this.allProducts) {
      this.productService.getAllProductsWithPagination(this.pageNumber -1, this.pageSize)
        .subscribe(this.processResult())
    } else {
      // check if "id" parameter is available
      const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

      if (hasCategoryId) {
        // get the "id" param string and convert string to a number using the "+" symbol
        this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
      } else {
        // no category id available so default id to 1
        this.currentCategoryId = 1;
      }

      // return to page 1 if category change
      if (this.previousCategoryId != this.currentCategoryId) {
        this.pageNumber = 1;
      }

      this.previousCategoryId = this.currentCategoryId;
      this.logger.debug('currentCategoryId | pageNumber', `${this.currentCategoryId} | ${this.pageNumber}`)

      // get products for given category id
      this.productService.getProductListWithPagination(this.pageNumber - 1, this.pageSize, this.currentCategoryId)
        .subscribe(this.processResult());
    }
  }

  updateSizePage(value: string) {
    this.pageSize = +value;
    this.pageNumber = 1;
    this.listProducts();
  }

  private processResult() {
    return (data: any) => {
      this.products = data._embedded.products;
      this.pageNumber = data.page.number + 1;
      this.pageSize = data.page.size;
      this.totalElements = data.page.totalElements;
    }
  }
}
