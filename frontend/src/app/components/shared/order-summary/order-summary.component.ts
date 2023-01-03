import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {
  @Input()
  totalPrice: number = 0;
  @Input()
  totalQuantity: number = 0;
  checkoutView: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    if(this.router.url.includes('checkout')){
      this.checkoutView = true;
    }
  }

}
