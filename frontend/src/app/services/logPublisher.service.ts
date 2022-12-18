import { Injectable } from '@angular/core';
import {LogConsole, LogPublisher, LogLocalStorage, LogServerSide} from "../common/log/logPublisher";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LogPublisherService {
  publishers: LogPublisher[] = [];
  private logUrl = environment.shopApiUrl + '/log'

  constructor(private httpClient: HttpClient) {
    this.buildPublishers();
  }

  private buildPublishers() {
    // Create instance of LogConsole Class
    this.publishers.push(new LogConsole());

    // Create instance of LogLocalStorage Class
    this.publishers.push(new LogLocalStorage());

    // Create instance of LogServerSide Class
    this.publishers.push(new LogServerSide(this.httpClient, this.logUrl));
  }
}
