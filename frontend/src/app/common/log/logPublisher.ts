import {LogEntry} from "../../services/log.service";
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";

export abstract class LogPublisher {
  location: string = '';

  abstract log(record: LogEntry): Observable<boolean>;

  abstract clear(): Observable<boolean>;
}

export class LogConsole extends LogPublisher {

  log(entry: LogEntry): Observable<boolean> {
    // Log to console
    console.log(entry.buildLogString());
    return of(true);
  }

  clear(): Observable<boolean> {
    console.clear();
    return of(true);
  }
}

export class LogLocalStorage extends LogPublisher {
  constructor() {
    // Must call `super()`from derived classes
    super();

    // Set location
    this.location = "logging";
  }

  // Append log entry to local storage
  log(entry: LogEntry): Observable<boolean> {
    let ret: boolean = false;
    let values: LogEntry[];

    try {
      // Get previous values from local storage
      values = JSON.parse(localStorage.getItem(this.location)!) || [];

      // Add new log entry to array
      values.push(entry);

      // Store array into local storage
      localStorage.setItem(this.location, JSON.stringify(values));

      // Set return value
      ret = true;
    } catch (ex) {
      // Display error in console
      console.log(ex);
    }

    return of(ret);
  }

  // Clear all log entries from local storage
  clear(): Observable<boolean> {
    localStorage.removeItem(this.location);
    return of(true);
  }
}

export class LogServerSide extends LogPublisher {

  constructor(private httpClient: HttpClient, private logUrl: string) {
    super();
  }

  log(record: LogEntry): Observable<boolean> {
    let ret: boolean = false;
    let values: LogEntry[] = [];
    try {
      values.push(record);

      this.httpClient.post<LogEntry[]>(this.logUrl, values).subscribe();

      ret = true
    } catch (ex) {
      console.log(ex)
    }
    return of(ret);
  }

  clear(): Observable<boolean> {
    return of(true);
  }

}

