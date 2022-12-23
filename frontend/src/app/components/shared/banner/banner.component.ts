import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

const IMAGE_URL: string = '../../../../assets/images/';

// Banner images urls
const PRODUCTS_URL = `url(${IMAGE_URL}all-products.png)`;
const GUITARS_URL = `url(${IMAGE_URL}guitar-banner.png)`;
const ACOUSTICS_URL = `url(${IMAGE_URL}acoustic-banner.png)`;
const BASS_URL = `url(${IMAGE_URL}bass-banner.png)`;
const ACCESSORY_URL = `url(${IMAGE_URL}accessories-banner.png)`;

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  searchMode: boolean = false;
  productView: boolean = false;
  imageUrls: string[] = [PRODUCTS_URL, GUITARS_URL, ACOUSTICS_URL, BASS_URL, ACCESSORY_URL]
  currentCategory: number = 0;


  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(() => {
      this.searchMode = this.route.snapshot.paramMap.has('keyword');
      this.productView = this.router.url.includes('products');
      if(this.route.snapshot.paramMap.has('id') && !this.router.url.includes('products')){
        this.currentCategory = +this.route.snapshot.paramMap.get('id')!;
      }
    })
  }

}