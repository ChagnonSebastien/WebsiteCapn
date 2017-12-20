import { BaseComponent } from './base/base.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { GenericTextEditorComponent } from './generic-text/generic-text-editor.component';

const appRoutes: Routes = [
    { path: 'app', component: BaseComponent, children: [
        { path: '', component: HomeComponent },
        { path: 'temp', component: GenericTextEditorComponent },
        { path: 'not-found', component: ErrorComponent },
        { path: '**', redirectTo: '/app/not-found' }
    ]},
    { path: '**', redirectTo: '/app/not-found' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
