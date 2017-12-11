import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { GenericTextComponent } from './generic-text/generic-text.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'temp', component: GenericTextComponent },
    { path: 'not-found', component: ErrorComponent },
    { path: '**', redirectTo: '/not-found' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
