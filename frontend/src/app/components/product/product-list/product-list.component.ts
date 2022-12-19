import {Component, OnInit} from '@angular/core';
import {Product} from "../../../common/entity/product";
import {ProductService} from "../../../services/product.service";
import {ActivatedRoute} from "@angular/router";
import {LogService} from "../../../services/log.service";

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
  imageUrls: string[] = [];

  // pagination properties
  pageNumber: number = 1;
  pageSize: number = 25;
  totalElements: number = 0;

  previousKeyword: string = '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private logger: LogService
  ) {
    const productsUrl = 'url(../../../../assets/images/all-products.png)';
    const guitarUrl = 'url(../../../../assets/images/guitar-banner.png)';
    const acousticUrl = 'url(../../../../assets/images/acoustic-banner.png)';
    const bassUrl = 'url(../../../../assets/images/bass-banner.png)';
    const accessoryUrl = 'url(../../../../assets/images/accessories-banner.png)';
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
    this.handleListProducts()
    // this.searchMode = this.route.snapshot.paramMap.has('keyword');
    //
    // if (this.searchMode) {
    //   this.handleSearchProducts();
    // } else {
    //   this.handleListProducts();
    // }
  }

  private handleSearchProducts() {
    const keyword: string = this.route.snapshot.paramMap.get('keyword')!;

    // if keyword is different than previous, page number set to 1
    if (this.previousKeyword != keyword) {
      this.pageNumber = 1;
    }

    this.previousKeyword = keyword;
    this.logger.debug('Test search function', `keyword | page number`, `${keyword} | ${this.pageNumber}`)

    // search for products using keyword
    //TODO
  }

  private handleListProducts() {
    // check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // get id param and convert to a number
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    } else {
      // if no category, set to default 1
      this.currentCategoryId = 1;
    }

    // if category different from previous go back to first page
    if(this.previousCategoryId != this.currentCategoryId){
      this.pageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;
    this.logger.debug('Test Category switching', `currentCategoryId | page number`, `${this.currentCategoryId} | ${this.pageNumber}`)

    // get Products for given category id
    this.productService.getProductListWithPagination(this.pageNumber - 1, this.pageSize, this.currentCategoryId)
      .subscribe(this.processResult())

  }

  private processResult() {
    return (data: any) => {
      this.products = data._embedded.products;
      this.pageNumber = data.page.number + 1;
      this.pageSize = data.page.size;
      this.totalElements = data.page.totalElements;
    }
  }

  updateSizePage(value: string) {
    this.pageSize = +value;
    this.pageNumber = 1;
    this.listProducts();
  }
}
