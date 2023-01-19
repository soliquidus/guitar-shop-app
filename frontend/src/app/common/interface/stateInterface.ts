import {State} from "../models/state";

export interface StateInterface {
  _embedded: {
    states: State[];
  }
}
