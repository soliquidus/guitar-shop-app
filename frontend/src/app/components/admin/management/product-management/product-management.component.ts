import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../../../services/product.service";
import {Product} from "../../../../common/models/product";
import {ProductCategory} from "../../../../common/models/productCategory";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ShopValidators} from "../../../../validators/shop-validators";
import {ProductUpdate} from "../../../../common/models/productUpdate";

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
  updateFormGroup!: FormGroup;

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
      this.category = new ProductCategory(this.products[0].id, this.products[0].categoryName);
    }

    this.createUpdateProductForm();
  }

  createUpdateProductForm() {
    console.log(this.category)
    this.updateFormGroup = this.formBuilder.group({
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
          Validators.required
        ]),
        stock: new FormControl(this.product ? this.product.unitsInStock : '', [
          Validators.required
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

  get model() {
    return this.updateFormGroup.get('generalInfo.model');
  }

  get description() {
    return this.updateFormGroup.get('generalInfo.description');
  }

  get brand() {
    return this.updateFormGroup.get('origin.brand');
  }

  get productCategory() {
    return this.updateFormGroup.get('origin.category');
  }

  get unitPrice() {
    return this.updateFormGroup.get('priceStock.unitPrice');
  }

  get stock() {
    return this.updateFormGroup.get('priceStock.stock');
  }


  getProductAndCategories() {
    this.route.data.subscribe(data => {
      this.productWithCategories = data['products'];

      // Get existing brands TODO -> brand filter for product category
      this.productWithCategories.forEach(cat => {
        let category: ProductCategory = new ProductCategory(cat.id, cat.categoryName)
        this.categories.push(category);

        cat.products?.map(product => {
          if (!this.brands.includes(product.brand)) {
            this.brands.push(product.brand);
          }
        })
      })
    })
  }


  showProductsByCategory(id: number) {
    this.products.splice(0);
    this.products = this.productWithCategories.filter(
      category => category.id === id
    )

    this.category = new ProductCategory(this.products[0].id, this.products[0].categoryName);

  }


  getProductInfo(product: Product, category: ProductCategory) {
    this.product = product;
    this.category = category;
    this.createUpdateProductForm();
  }

  onSubmit() {
    let product: ProductUpdate = new ProductUpdate(
      this.product.id,
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
      this.productCategory?.value
    )
    this.productService.updateProduct(product.id, product);

    // recharge page with new infos
    location.reload();
  }
}
