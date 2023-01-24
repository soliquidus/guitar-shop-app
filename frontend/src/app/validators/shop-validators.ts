import {FormControl, ValidationErrors} from "@angular/forms";

export class ShopValidators {

  /**
   * Validator to avoid an input to be filled with whitespaces only
   * @param control the form control object
   */
  static noWhiteSpaceOnly(control: FormControl): ValidationErrors | null {
    if ((control.value !== null) && (control.value.trim().length === 0)) {
      return {'noWhitespaceOnly': true};
    } else {
      return null;
    }
  }
}
