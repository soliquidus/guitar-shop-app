import {Country} from "../entity/country";

export interface CountryInterface {
  _embedded: {
    countries: Country[];
  }
}
