import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isAuthenticated: Subject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }
}
