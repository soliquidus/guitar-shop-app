import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {ProductInterface} from "../common/interface/productInterface";
import {LogService} from "./log.service";
import {ProductCategoryInterface} from "../common/interface/productCategoryInterface";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = environment.shopApiUrl + '/products';
  private categoryUrl = environment.shopApiUrl + '/product-category';

  constructor(private httpClient: HttpClient, private logger: LogService) {
  }

  getProductListWithPagination(page: number, pageSize: number, categoryId: number): Observable<ProductInterface> {

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}&page=${page}&size=${pageSize}`;
    this.logger.debug('Getting products from', `${searchUrl}`)

    return this.httpClient.get<ProductInterface>(searchUrl);
  }

  getProductCategories() {
    return this.httpClient.get<ProductCategoryInterface>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }
}
