import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpModule, JsonpModule, RequestOptions } from '@angular/http';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { MDBBootstrapModules, MDBSpinningPreloader } from 'ng-mdb-pro';

import { ProgramComponent } from './user/modular-page/dynamic/program/program.component';
import { GenericTextComponent } from './user/modular-page/dynamic/generic-text/generic-text.component';
import { ErrorComponent } from './user/error/error.component';
import { HomeComponent } from './user/home/home.component';
import { BaseComponent } from './user/base/base.component';
import { NavbarComponent } from './user/navbar/navbar.component';
import { ModularPageComponent } from './user/modular-page/modular-page.component';
import { FooterComponent } from './user/footer/footer.component';
import { PageDataResolverService } from './user/modular-page/page-data-resolver.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouteResolverService } from './route-resolver.service';
import { AdminComponent } from './admin/admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    HomeComponent,
    ErrorComponent,
    ModularPageComponent,
    NavbarComponent,
    FooterComponent,
    GenericTextComponent,
    ProgramComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    MDBBootstrapModules.forRoot(),
    JsonpModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
    RouteResolverService,
    MDBSpinningPreloader,
    PageDataResolverService
  ],
  bootstrap: [ AppComponent ],
  entryComponents: [
    GenericTextComponent,
    ProgramComponent
  ]
})
export class AppModule { }
