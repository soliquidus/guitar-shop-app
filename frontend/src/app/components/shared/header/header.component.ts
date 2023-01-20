import {Component, OnInit} from '@angular/core';
import {ProductCategory} from "../../../common/models/productCategory";
import {ProductService} from "../../../services/product.service";
import {LogService} from "../../../services/log.service";
import {Roles} from "../../../common/enum/roles";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  dropMenu: boolean = false;
  productCategories: ProductCategory[] = [];
  isAdmin: boolean = false;
  sessionStorage: Storage = sessionStorage;

  constructor(
    private productService: ProductService,
    private logger: LogService
  ) {
  }

  ngOnInit(): void {
    this.checkUserRole();
    if (!this.isAdmin) {
      this.listProductCategories();
    }
  }

  private checkUserRole() {
    switch (this.sessionStorage.getItem('Role')) {
      case Roles.ADMIN:
        this.isAdmin = true;
        break;
      case Roles.ANONYMOUS:
      case Roles.CLIENT:
        this.isAdmin = false;
    }
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
