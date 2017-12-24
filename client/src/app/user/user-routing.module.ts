import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { BaseComponent } from './base/base.component';
import { ModularPageComponent } from './modular-page/modular-page.component';
import { PageDataResolverService } from './page-data-resolver.service';

const userRoutes: Routes = [
    { path: '', component: BaseComponent, children: [
        { path: '', component: HomeComponent },
        { path: 'not-found', component: ErrorComponent },
        { path: '**', component: ModularPageComponent, resolve: {pageData: PageDataResolverService} }
    ]}
];

@NgModule({
    imports: [
        RouterModule.forChild(userRoutes)
    ],
    exports: [RouterModule]
})
export class UserRoutingModule {

}
