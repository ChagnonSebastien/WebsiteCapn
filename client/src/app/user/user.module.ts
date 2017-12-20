import { GenericTextEditorComponent } from './generic-text/generic-text-editor.component';
import { HomeComponent } from './home/home.component';
import { UserRoutingModule } from './user-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from './base/base.component';
import { ErrorComponent } from './error/error.component';
import { QuillModule } from 'ngx-quill';

@NgModule({
  imports: [
    UserRoutingModule,
    QuillModule
  ],
  declarations: [
    BaseComponent,
    HomeComponent,
    GenericTextEditorComponent,
    ErrorComponent
  ],
  entryComponents: [ BaseComponent ]
})
export class UserModule { }
