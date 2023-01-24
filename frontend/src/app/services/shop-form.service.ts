import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, Observable, of} from "rxjs";
import {Country} from "../common/models/country";
import {CountryInterface} from "../common/interface/countryInterface";
import {State} from "../common/models/state";
import {StateInterface} from "../common/interface/stateInterface";

@Injectable({
  providedIn: 'root'
})
export class ShopFormService {

  private countriesUrl = environment.shopApiUrl + '/countries';
  private statesUrl = environment.shopApiUrl + '/states';

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Get all existing countries
   */
  getCountries(): Observable<Country[]> {
    return this.httpClient.get<CountryInterface>(this.countriesUrl).pipe(
      map(response => response._embedded.countries)
    );
  }

  /**
   * Get states by given country
   * @param countryCode the country code
   */
  getStates(countryCode: string): Observable<State[]> {
    const searchUrl = `${this.statesUrl}/search/findByCountryCode?code=${countryCode}`;

    return this.httpClient.get<StateInterface>(searchUrl).pipe(
      map(response => response._embedded.states)
    );
  }

  /**
   * Determine the months to display depending on starting month
   * @param startMonth the starting month
   */
  getCreditCardMonths(startMonth: number): Observable<number[]> {
    let data: number[] = [];

    for (let month = startMonth; month <= 12; month++) {
      data.push(month);
    }

    return of(data);
  }

  /**
   * Determine the years selectable
   */
  getCreditCardYears(): Observable<number[]> {
    let data: number[] = [];

    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;

    for (let year = startYear; year <= endYear; year++) {
      data.push(year);
    }

    return of(data);
  }
}
