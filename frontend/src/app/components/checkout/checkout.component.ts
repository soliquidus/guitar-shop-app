import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {LogService} from "../../services/log.service";
import {Country} from "../../common/entity/country";
import {State} from "../../common/entity/state";
import {ShopFormService} from "../../services/shop-form.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss', '../../../assets/styles/font-awesome.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup!: FormGroup;
  totalPrice = 0;
  totalQuantity = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries: Country[] = [];

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private shopFormService: ShopFormService,
    private logger: LogService
  ) {
  };

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: [''],
      })
    });

    // fill credit card months
    const startMonth: number = new Date().getMonth() + 1;
    this.logger.debug('startMonth', startMonth)

    this.shopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.logger.debug('Retrieved credit card months', data);
        this.creditCardMonths = data;
      }
    );

    // fill credit card years
    this.shopFormService.getCreditCardYears().subscribe(
      data => {
        this.logger.debug('Retrieved credit card years', data);
        this.creditCardYears = data;
      }
    );

    // fill countries
    this.shopFormService.getCountries().subscribe(
      data => {
        this.logger.debug('Retrieved countries', JSON.stringify(data));
        this.countries = data;
      }
    );
  };

  copyShippingToBilling(event: any) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls['billingAddress']
        .setValue(this.checkoutFormGroup.controls['shippingAddress'].value);

      // for correct copy of states
      this.billingAddressStates = this.shippingAddressStates;
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
      this.billingAddressStates = [];
    }
  };

  onSubmit() {
    this.logger.debug('Handling submit button', this.checkoutFormGroup.get('customer')?.value);
    this.logger.debug('Email Address | Shipping Address | State name',
      `${this.checkoutFormGroup.get('customer')?.value.email} |
      ${this.checkoutFormGroup.get('shippingAddress')?.value.country.name} |
      ${this.checkoutFormGroup.get('state')?.value.state.name}`);
  };

  handleCreditCardDate() {
    const creditCardForm = this.checkoutFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardForm?.value.expirationYear);

    let startMonth: number;

    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }

    this.shopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.logger.debug('Retrieved credit card months', data);
        this.creditCardMonths = data;
      }
    )
  };

  getStates(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName);

    const countryCode = formGroup?.value.country.code;
    const countryName = formGroup?.value.country.name;

    this.logger.debug('FormGroup name | Country code | Country name',
      `${formGroupName} | ${countryCode} | ${countryName}`);

    this.shopFormService.getStates(countryCode).subscribe(
      data => {
        if (formGroupName === 'shippingAddress') {
          this.shippingAddressStates = data;
        } else {
          this.billingAddressStates = data;
        }
        // default value
        formGroup?.get('state')?.setValue(data[0]);
      }
    );
  };

}
