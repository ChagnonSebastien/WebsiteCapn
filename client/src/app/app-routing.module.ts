import { Routes, RouterModule } from '@angular/router';
import { NgModule, Component } from '@angular/core';

import { AdminComponent } from './admin/admin/admin.component';
import { ProgramComponent } from './user/modular-page/dynamic/program/program.component';
import { ErrorComponent } from './user/error/error.component';
import { HomeComponent } from './user/home/home.component';
import { BaseComponent } from './user/base/base.component';
import { RouteResolverService } from './route-resolver.service';
import { ModularPageComponent } from './user/modular-page/modular-page.component';
import { PageDataResolverService } from './user/modular-page/page-data-resolver.service';

const appRoutes: Routes = [
    { path: 'app', component: BaseComponent, resolve: { routes: RouteResolverService }, children: [
        { path: '', redirectTo: '/app/accueil', pathMatch: 'full' },
        { path: 'not-found', component: ErrorComponent },
        { path: '**', component: ModularPageComponent, resolve: { pageData: PageDataResolverService } }
    ]},
    { path: 'admin', component: AdminComponent, resolve: { routes: RouteResolverService }},
    { path: '', redirectTo: '/app/accueil', pathMatch: 'full' },
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
