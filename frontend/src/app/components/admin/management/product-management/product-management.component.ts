import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../../../services/product.service";
import {Product} from "../../../../common/models/product";
import {ProductCategory} from "../../../../common/models/productCategory";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ShopValidators} from "../../../../validators/shop-validators";
import {ProductDto} from "../../../../common/models/productDto";
import {Categories} from "../../../../common/enum/categories";

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss']
})
export class ProductManagementComponent implements OnInit {

  products: ProductCategory[] = [];
  productWithCategories: ProductCategory[] = [];
  category!: ProductCategory;
  categories: ProductCategory[] = [];
  brands: string[] = [];
  product!: Product;
  formGroup!: FormGroup;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.getProductAndCategories();

    // in order to start page on first category found
    if (this.products.length <= 0) {
      this.products.push(this.productWithCategories[0]);
      if(this.products[0].id !== undefined)
      this.category = new ProductCategory(this.products[0].id, this.products[0].categoryName);
    }
    this.createUpdateProductForm();
    this.createAddProductForm();
  }

  /**
   * Creates the form corresponding to the update of a product
   */
  createUpdateProductForm() {
    this.formGroup = this.formBuilder.group({
      generalInfo: this.formBuilder.group({
        model: new FormControl(this.product ? this.product.name : '', [
          Validators.required,
          Validators.minLength(10),
          ShopValidators.noWhiteSpaceOnly
        ]),
        description: new FormControl(this.product ? this.product.description : '', [
          Validators.required,
          Validators.minLength(30),
          ShopValidators.noWhiteSpaceOnly
        ])
      }),
      priceStock: this.formBuilder.group({
        unitPrice: new FormControl(this.product ? this.product.unitPrice : '', [
          Validators.required,
          Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')
        ]),
        stock: new FormControl(this.product ? this.product.unitsInStock : '', [
          Validators.required,
          Validators.pattern('^[0-9]*$')
        ])
      }),
      origin: this.formBuilder.group({
        brand: new FormControl(this.product ? this.product.brand : '', [
          Validators.required
        ]),
        category: new FormControl(this.category ? this.category : '', [
          Validators.required
        ])
      })
    });
  }

  /**
   * Creates the form corresponding to the creation of a product
   */
  createAddProductForm() {
    this.formGroup = this.formBuilder.group({
      generalInfo: this.formBuilder.group({
        model: new FormControl('', [
          Validators.required,
          Validators.minLength(10),
          ShopValidators.noWhiteSpaceOnly
        ]),
        description: new FormControl('', [
          Validators.required,
          Validators.minLength(30),
          ShopValidators.noWhiteSpaceOnly
        ]),
        sku: new FormControl('TEST-TEST-01')
      }),
      priceStock: this.formBuilder.group({
        unitPrice: new FormControl('', [
          Validators.required
        ]),
        stock: new FormControl('', [
          Validators.required
        ])
      }),
      origin: this.formBuilder.group({
        brand: new FormControl('', [
          Validators.required
        ]),
        category: new FormControl('', [
          Validators.required
        ])
      })
    });
  }

  /** Getters for form attributes **/
  get model() {
    return this.formGroup.get('generalInfo.model');
  }

  get description() {
    return this.formGroup.get('generalInfo.description');
  }

  get sku() {
    return this.formGroup.get('generalInfo.sku');
  }

  get brand() {
    return this.formGroup.get('origin.brand');
  }

  get productCategory() {
    return this.formGroup.get('origin.category');
  }

  get unitPrice() {
    return this.formGroup.get('priceStock.unitPrice');
  }

  get stock() {
    return this.formGroup.get('priceStock.stock');
  }


  /**
   * Gets the category and products corresponding from provider
   */
  getProductAndCategories() {
    this.route.data.subscribe(data => {
      this.productWithCategories = data['products'];

      // Get existing brands TODO -> brand filter for product category
      this.productWithCategories.forEach(cat => {
        let category: ProductCategory = new ProductCategory(cat.id!, cat.categoryName)
        this.categories.push(category);

        cat.products?.map(product => {
          if (!this.brands.includes(product.brand)) {
            this.brands.push(product.brand);
          }
        })
      })
    })
  }


  /**
   * When admin selects a category, products are shown in a dynamical way
   * @param id
   */
  showProductsByCategory(id: number) {
    this.products.splice(0);
    this.products = this.productWithCategories.filter(
      category => category.id === id
    )

    this.category = new ProductCategory(this.products[0].id!, this.products[0].categoryName);

  }

  /**
   * Product object transmitted to modal for further treatment
   * @param product
   * @param category
   */
  getProductInfo(product: Product, category: ProductCategory) {
    this.product = product;
    this.category = category;
    this.createUpdateProductForm();
  }

  /**
   * Constructing the corresponding product object for update operations
   * and then sending the request to API
   */
  onUpdate() {
    let product: ProductDto = new ProductDto(
      this.product.sku,
      this.brand?.value,
      this.model?.value,
      this.description?.value,
      parseInt(this.unitPrice?.value),
      this.product.imageUrl,
      this.product.active,
      parseInt(this.stock?.value),
      this.product.dateCreated,
      new Date(),
      this.productCategory?.value,
      this.product.id
    )
    this.productService.updateProduct(product.id!, product);

    // recharge page with new infos
    // location.reload();
  }

  onDelete() {
    this.productService.deleteProduct(this.product.id!, this.product);
    location.reload();
  }

  onCreate() {
    let category: ProductCategory = this.productCategory?.value;
    let imageUrl: string = '';


    // set default image depending on category
    switch (category.categoryName) {
      case Categories.GUITARS:
        imageUrl = 'assets/images/default-guitar.png';
        break;
      case Categories.BASSES:
        imageUrl = 'assets/images/default-bass.png'
        break;
      case Categories.ACOUSTIC_GUITARS:
        imageUrl = 'assets/images/default-acoustic.png'
        break;
      case Categories.ACCESSORIES:
        imageUrl = 'assets/images/default-accessory.png'
        break;
    }

    let product: ProductDto = new ProductDto(
      this.sku?.value,
      this.brand?.value,
      this.model?.value,
      this.description?.value,
      parseInt(this.unitPrice?.value),
      imageUrl,
      true,
      parseInt(this.stock?.value),
      new Date(),
      new Date(),
      category
    )

    this.productService.addProduct(product, category);
  }
}
