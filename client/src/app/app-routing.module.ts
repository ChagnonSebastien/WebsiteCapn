import { RouteResolverService } from './route-resolver.service';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const appRoutes: Routes = [
    { path: 'app', loadChildren: 'app/user/user.module#UserModule', resolve: { routes: RouteResolverService } },
    { path: '', redirectTo: '/app', pathMatch: 'full' },
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
