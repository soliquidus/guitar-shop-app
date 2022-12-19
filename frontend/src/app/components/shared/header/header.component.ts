import { Component, OnInit } from '@angular/core';
import {ProductCategory} from "../../../common/entity/productCategory";
import {ProductService} from "../../../services/product.service";
import {LogService} from "../../../services/log.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  dropMenu: boolean = false;
  productCategories: ProductCategory[] = [];

  constructor(
    private productService: ProductService,
    private logger: LogService
    ) { }

  ngOnInit(): void {
    this.listProductCategories();
  }

  private listProductCategories() {
    this.productService.getProductCategories().subscribe(
      (data: any) => {
        this.logger.debug('Product Categories request')
        this.productCategories = data;
      }
    )
  }
}
