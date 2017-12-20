import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { QuillModule } from 'ngx-quill';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { GenericTextEditorComponent } from './generic-text/generic-text-editor.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BaseComponent } from './base/base.component';

import { RouteResolverService } from './route-resolver.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorComponent,
    GenericTextEditorComponent,
    NavbarComponent,
    BaseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    QuillModule
  ],
  providers: [RouteResolverService],
  bootstrap: [AppComponent]
})
export class AppModule { }
