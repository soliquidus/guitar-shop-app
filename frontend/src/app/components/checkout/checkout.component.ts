import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {LogService} from "../../services/log.service";
import {Country} from "../../common/entity/country";
import {State} from "../../common/entity/state";
import {ShopFormService} from "../../services/shop-form.service";
import {CartService} from "../../services/cart.service";
import {ShopValidators} from "../../validators/shop-validators";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss', '../../../assets/styles/font-awesome.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup!: FormGroup;
  validationErrors: boolean = false;
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
    private cartService: CartService,
    private logger: LogService
  ) {
  };

  ngOnInit(): void {
    this.reviewCartDetails();

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          ShopValidators.noWhiteSpaceOnly
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          ShopValidators.noWhiteSpaceOnly
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          Validators.minLength(2)
        ]),
      }),
      shippingAddress: this.formBuilder.group({
        street: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          ShopValidators.noWhiteSpaceOnly
        ]),
        city: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          ShopValidators.noWhiteSpaceOnly
        ]),
        state: new FormControl('', Validators.required),
        country: new FormControl('', Validators.required),
        zipCode: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          ShopValidators.noWhiteSpaceOnly
        ])
      }),
      billingAddress: this.formBuilder.group({
        street: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          ShopValidators.noWhiteSpaceOnly
        ]),
        city: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          ShopValidators.noWhiteSpaceOnly
        ]),
        state: new FormControl('', Validators.required),
        country: new FormControl('', Validators.required),
        zipCode: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          ShopValidators.noWhiteSpaceOnly
        ])
      }),
      creditCard: this.formBuilder.group({
        cardType: new FormControl('', Validators.required),
        nameOnCard: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          ShopValidators.noWhiteSpaceOnly
        ]),
        cardNumber: new FormControl('', [
          Validators.required,
          Validators.pattern('[0-9]{16}')
        ]),
        securityCode: new FormControl('', [
          Validators.required,
          Validators.pattern('[0-9]{3}')
        ]),
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


  /********
   * *** Getters for form group attributes
   *******/

  // Customer getters
  get firstName() {
    console.debug((this.checkoutFormGroup.get('customer.firstName'))?.errors)
    return this.checkoutFormGroup.get('customer.firstName');
  }

  get lastName() {
    return this.checkoutFormGroup.get('customer.lastName');
  }

  get email() {
    return this.checkoutFormGroup.get('customer.email');
  }

  // Shipping address getters
  get shippingAddressStreet() {
    return this.checkoutFormGroup.get('shippingAddress.street');
  }

  get shippingAddressCity() {
    return this.checkoutFormGroup.get('shippingAddress.city');
  }

  get shippingAddressState() {
    return this.checkoutFormGroup.get('shippingAddress.state');
  }

  get shippingAddressZipCode() {
    return this.checkoutFormGroup.get('shippingAddress.zipCode');
  }

  get shippingAddressCountry() {
    return this.checkoutFormGroup.get('shippingAddress.country');
  }

  // Billing address getters
  get billingAddressStreet() {
    return this.checkoutFormGroup.get('billingAddress.street');
  }

  get billingAddressCity() {
    return this.checkoutFormGroup.get('billingAddress.city');
  }

  get billingAddressState() {
    return this.checkoutFormGroup.get('billingAddress.state');
  }

  get billingAddressZipCode() {
    return this.checkoutFormGroup.get('billingAddress.zipCode');
  }

  get billingAddressCountry() {
    return this.checkoutFormGroup.get('billingAddress.country');
  }

  // Credit card getters
  get creditCardType() {
    return this.checkoutFormGroup.get('creditCard.cardType');
  }

  get creditCardNameOnCard() {
    return this.checkoutFormGroup.get('creditCard.nameOnCard');
  }

  get creditCardNumber() {
    return this.checkoutFormGroup.get('creditCard.cardNumber');
  }

  get creditCardSecurityCode() {
    return this.checkoutFormGroup.get('creditCard.securityCode');
  }

  onSubmit() {
    if(this.checkoutFormGroup.invalid){
      this.validationErrors = true
      this.checkoutFormGroup.markAllAsTouched();
    } else {
      this.validationErrors = false
    }

    this.logger.debug('Handling submit button', this.checkoutFormGroup.get('customer')?.value);
    this.logger.debug('Email Address | Shipping Address | State name',
      `${this.checkoutFormGroup.get('customer')?.value.email} |
      ${this.checkoutFormGroup.get('shippingAddress')?.value.country.name} |
      ${this.checkoutFormGroup.get('state')?.value.state.name}`);
  };



  /**
   * Copy the shipping to the billing address when user uses the checkbox
   * @param event
   */
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


  /**
   * Handle date logic for credit cards
   */
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

  /**
   * Get states for given address (shipping or billing)
   * @param formGroupName
   */
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

  /**
   * Get total quantity & price for cart from behaviour subjects
   * @private
   */
  private reviewCartDetails() {
    this.cartService.totalQuantity.subscribe(
      totalQuantity => this.totalQuantity = totalQuantity
    );

    this.cartService.totalPrice.subscribe(
      totalPrice => this.totalPrice = totalPrice
    );
  }
}
