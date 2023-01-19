import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {ProductInterface} from "../common/interface/productInterface";
import {LogService} from "./log.service";
import {ProductCategoryInterface} from "../common/interface/productCategoryInterface";
import {Product} from "../common/models/product";
import {ProductCategory} from "../common/models/productCategory";
import {ProductUpdate} from "../common/models/productUpdate";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = environment.shopApiUrl + '/products';
  private categoryUrl = environment.shopApiUrl + '/product-category';

  constructor(private httpClient: HttpClient, private logger: LogService) {
  }

  getAllProductsWithPagination(page: number, pageSize: number): Observable<ProductInterface> {
    const url = `${this.baseUrl}?page=${page}&size=${pageSize}`;
    this.logger.debug('Getting all products from', url);

    return this.httpClient.get<ProductInterface>(url);
  }

  getProductListWithPagination(page: number, pageSize: number, categoryId: number): Observable<ProductInterface> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}&page=${page}&size=${pageSize}`;
    this.logger.debug('Getting products from', searchUrl);

    return this.httpClient.get<ProductInterface>(searchUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<ProductCategoryInterface>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  getProductCategoriesWithProducts(): Observable<ProductCategory[]> {
    let url = `${this.categoryUrl}?projection=withProducts`;

    return this.httpClient.get<ProductCategoryInterface>(url).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  updateProduct(id: number, product: ProductUpdate): Observable<ProductUpdate> {
    let url = `${this.baseUrl}/${id}`;
    return this.httpClient.put<ProductUpdate>(url, product);
  }

  searchProducts(keyword: string): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${keyword}`;

    return this.getProducts(searchUrl);
  }

  searchProductsWithPagination(page: number, pageSize: number, keyword: string): Observable<ProductInterface> {
    // build URL based on category id, page and size
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${keyword}&page=${page}&size=${pageSize}`;

    return this.httpClient.get<ProductInterface>(searchUrl);
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<ProductInterface>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProduct(productId: number): Observable<Product> {
    const productUrl = `${this.baseUrl}/${productId}`;

    return this.httpClient.get<Product>(productUrl);
  }

  getProductList(categoryId: number): Observable<Product[]> {
    // need to build URL based on category id
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;

    return this.getProducts(searchUrl);
  }
}
