import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import {RouterModule} from "@angular/router";
import { ProductListComponent } from './components/product/product-list/product-list.component';
import {LogPublisherService} from "./services/logPublisher.service";
import {LogService} from "./services/log.service";
import {HttpClientModule} from "@angular/common/http";
import { SearchComponent } from './components/shared/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ProductListComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule
  ],
  exports: [
    HeaderComponent
  ],
  providers: [LogService, LogPublisherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
