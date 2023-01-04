import { Component, OnInit } from '@angular/core';
import {ProductCategory} from "../../../common/entity/productCategory";
import {ProductService} from "../../../services/product.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  productCategories: ProductCategory[] = [];
  presentYear: number = new Date().getFullYear();

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProductCategories().subscribe(data => this.productCategories = data)
  }

  scrollToTop() {
    window.scroll({
      top: 650,
      left: 0,
      behavior: 'smooth'
    })
  }

}
