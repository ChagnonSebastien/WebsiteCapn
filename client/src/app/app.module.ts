import { MDBBootstrapModules, MDBSpinningPreloader } from 'ng-mdb-pro';
import { NavbarComponent } from './user/navbar/navbar.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouteResolverService } from './route-resolver.service';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    MDBBootstrapModules.forRoot()
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [ RouteResolverService, MDBSpinningPreloader ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
