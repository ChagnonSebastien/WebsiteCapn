import { GenericTextEditorComponent } from './admin/generic-text/generic-text-editor.component';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpModule, JsonpModule, RequestOptions } from '@angular/http';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { MDBBootstrapModules, MDBSpinningPreloader } from 'ng-mdb-pro';
import { SortablejsModule } from 'angular-sortablejs';
import { QuillModule } from 'ngx-quill';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouteResolverService } from './route-resolver.service';
import { ProgramComponent } from './user/modular-page/dynamic/program/program.component';
import { GenericTextComponent } from './user/modular-page/dynamic/generic-text/generic-text.component';
import { ErrorComponent } from './user/error/error.component';
import { HomeComponent } from './user/home/home.component';
import { UserComponent } from './user/user.component';
import { NavbarComponent } from './user/navbar/navbar.component';
import { ModularPageComponent } from './user/modular-page/modular-page.component';
import { FooterComponent } from './user/footer/footer.component';
import { PageDataResolverService } from './user/modular-page/page-data-resolver.service';
import { AdminComponent } from './admin/admin.component';
import { NavigationEditorComponent } from './admin/navigation-editor/navigation-editor.component';
import { NavigationEditorGroupComponent } from './admin/navigation-editor-group/navigation-editor-group.component';
import { AuthenticationService } from './admin/authentification.service';
import { ModularPageEditorComponent } from './admin/modular-page-editor/modular-page-editor.component';
import { ProgramEditorComponent } from './admin/modular-page-editor/dynamic/program-editor/program-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HomeComponent,
    ErrorComponent,
    ModularPageComponent,
    NavbarComponent,
    FooterComponent,
    GenericTextComponent,
    ProgramComponent,
    AdminComponent,
    NavigationEditorComponent,
    NavigationEditorGroupComponent,
    ModularPageEditorComponent,
    GenericTextEditorComponent,
    ProgramEditorComponent
  ],
  imports: [
    BrowserModule,
    QuillModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    MDBBootstrapModules.forRoot(),
    JsonpModule,
    SortablejsModule.forRoot({
      animation: 150,
      handle: '.handle',
      scrollSensitivity: 100
    })
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
    RouteResolverService,
    MDBSpinningPreloader,
    PageDataResolverService,
    AuthenticationService
  ],
  bootstrap: [ AppComponent ],
  entryComponents: [
    GenericTextComponent,
    GenericTextEditorComponent,
    ProgramComponent,
    ProgramEditorComponent
  ]
})
export class AppModule { }
