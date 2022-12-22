import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {LogService} from "../../../services/log.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(
    private router: Router,
    private logger: LogService
  ) { }

  ngOnInit(): void {
  }

  doSearch(value: string) {
    this.logger.log('Search value', value);
    this.router
      .navigateByUrl(`/search/${value}`)
      .then(r => r)
  }
}
