import { ProgramComponent } from './user/modular-page/dynamic/program/program.component';
import { GenericTextComponent } from './user/modular-page/dynamic/generic-text/generic-text.component';
import { ErrorComponent } from './user/error/error.component';
import { HomeComponent } from './user/home/home.component';
import { BaseComponent } from './user/base/base.component';
import { MDBBootstrapModules, MDBSpinningPreloader } from 'ng-mdb-pro';
import { NavbarComponent } from './user/navbar/navbar.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouteResolverService } from './route-resolver.service';
import { HttpModule } from '@angular/http';
import { ModularPageComponent } from './user/modular-page/modular-page.component';
import { FooterComponent } from './user/footer/footer.component';
import { PageDataResolverService } from './user/page-data-resolver.service';

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
    ProgramComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    MDBBootstrapModules.forRoot()
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
