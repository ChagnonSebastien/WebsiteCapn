import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { BaseComponent } from './base/base.component';

const userRoutes: Routes = [
    { path: '', component: BaseComponent, children: [
        { path: '', component: HomeComponent },
        { path: 'not-found', component: ErrorComponent },
        { path: '**', redirectTo: '/app/not-found' }
    ]},
    { path: '**', redirectTo: '/app/not-found' }
];

@NgModule({
    imports: [
        RouterModule.forChild(userRoutes)
    ],
    exports: [RouterModule]
})
export class UserRoutingModule {

}
