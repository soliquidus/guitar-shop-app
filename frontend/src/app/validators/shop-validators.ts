import {FormControl, ValidationErrors} from "@angular/forms";

export class ShopValidators {
  static noWhiteSpaceOnly(control: FormControl): ValidationErrors | null {
    if ((control.value !== null) && (control.value.trim().length === 0)) {
      return {'noWhitespaceOnly': true};
    } else {
      return null;
    }
  }
}
