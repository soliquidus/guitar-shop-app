import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {ProductDtoInterface, ProductInterface} from "../common/interface/productInterface";
import {LogService} from "./log.service";
import {ProductCategoryInterface} from "../common/interface/productCategoryInterface";
import {Product} from "../common/models/product";
import {ProductCategory} from "../common/models/productCategory";
import {ProductDto} from "../common/models/productDto";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = environment.shopApiUrl + '/products';
  private categoryUrl = environment.shopApiUrl + '/product-category';

  constructor(private httpClient: HttpClient, private logger: LogService) {
  }

  /*** Search functions ***/

  /**
   * Basic search method
   * @param keyword the search keyword
   */
  searchProducts(keyword: string): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${keyword}`;

    return this.getProducts(searchUrl);
  }

  /**
   * Search method with pagination option
   * @param page the starting page
   * @param pageSize the number of elements to display per page
   * @param keyword the search keyword
   */
  searchProductsWithPagination(page: number, pageSize: number, keyword: string): Observable<ProductInterface> {
    // build URL based on category id, page and size
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${keyword}&page=${page}&size=${pageSize}`;

    return this.httpClient.get<ProductInterface>(searchUrl);
  }

  /*** GET functions ***/

  /**
   * Get all products with pagination option
   * @param page the starting page
   * @param pageSize the number of elements to display per page
   */
  getAllProductsWithPagination(page: number, pageSize: number): Observable<ProductInterface> {
    const url = `${this.baseUrl}?page=${page}&size=${pageSize}`;
    this.logger.debug('Getting all products from', url);

    return this.httpClient.get<ProductInterface>(url);
  }

  /**
   * Get all products for one category with pagination option
   * @param page the starting page
   * @param pageSize the number of elements to display per page
   * @param categoryId the product category id
   */
  getProductListWithPagination(page: number, pageSize: number, categoryId: number): Observable<ProductInterface> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}&page=${page}&size=${pageSize}`;
    this.logger.debug('Getting products from', searchUrl);

    return this.httpClient.get<ProductInterface>(searchUrl);
  }

  /**
   * Get all existing categories
   */
  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<ProductCategoryInterface>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  /**
   * Get all categories with their products
   */
  getProductCategoriesWithProducts(): Observable<ProductCategory[]> {
    let url = `${this.categoryUrl}?projection=withProducts`;

    return this.httpClient.get<ProductCategoryInterface>(url).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  /**
   * Det all products
   * @param searchUrl the api url
   */
  getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<ProductInterface>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  /**
   * Get one product
   * @param productId the product id
   */
  getProduct(productId: number): Observable<Product> {
    const productUrl = `${this.baseUrl}/${productId}`;

    return this.httpClient.get<Product>(productUrl);
  }

  /**
   * Get products with given category
   * @param categoryId the category id
   */
  getProductList(categoryId: number): Observable<Product[]> {
    // need to build URL based on category id
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;

    return this.getProducts(searchUrl);
  }

  /*** POST functions ***/

  /**
   * Create a new product
   * @param product the product object
   * @param category the concerned category object
   */
  addProduct(product: ProductDto, category: ProductCategory) {
    let productDto: ProductDtoInterface = {
      productCategory: category,
      product: product
    }

    this.httpClient.post<ProductDtoInterface>(this.baseUrl + "/", productDto).subscribe(
      () => this.logger.info('Admin added a new product', JSON.stringify(productDto))
    )
  }

  /*** PUT functions ***/

  /**
   * Update a product
   * @param id the product id
   * @param product the product DTO object
   */
  updateProduct(id: number, product: ProductDto) {
    let url = `${this.baseUrl}/product/${id}`;
    let productToUpdateDto: ProductDtoInterface = {
      productCategory: product.category,
      product: product
    }

    this.httpClient.put<ProductDtoInterface>(url, productToUpdateDto).subscribe(
      data => this.logger.info('Admin updating product', JSON.stringify(data))
    );
  }

  /*** DELETE functions ***/

  /**
   * Delete one product
   * @param productId the product id
   * @param product the product object
   */
  deleteProduct(productId: number, product: Product) {
    const deleteUrl = `${this.baseUrl}/product/${productId}`;

    this.httpClient.delete(deleteUrl).subscribe(
      () => this.logger.info('Admin deleted product', JSON.stringify(product))
    )
  }
}
