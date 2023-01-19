import {Country} from "../models/country";

export interface CountryInterface {
  _embedded: {
    countries: Country[];
  }
}
