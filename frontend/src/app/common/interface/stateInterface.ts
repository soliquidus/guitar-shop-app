import {State} from "../entity/state";

export interface StateInterface {
  _embedded: {
    states: State[];
  }
}
