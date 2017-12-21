import { Observable } from 'rxjs/Observable';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router/src/router_state';
import { Resolve } from '@angular/router/src/interfaces';
import { Injectable } from '@angular/core';
import { RouteNode } from './route-node';

@Injectable()
export class RouteResolverService implements Resolve<RouteNode> {

  constructor() { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RouteNode> | Promise<RouteNode> | RouteNode {
    return new Promise<RouteNode>((resolve) => {
      const courseRoutes = new RouteNode('Cours', 'cours', 'navbar');
      courseRoutes.children.push(new RouteNode('Cours pour enfants', 'enfants'));
      courseRoutes.children.push(new RouteNode('Cours pour adultes', 'adultes'));

      const clubRoutes = new RouteNode('Club de compétition', 'club', 'navbar');
      clubRoutes.children.push(new RouteNode('Natation', 'natation'));
      clubRoutes.children.push(new RouteNode('Nage synchronisée', 'synchro'));
      clubRoutes.children.push(new RouteNode('Sauvetage sportif', 'sauvetage'));
      clubRoutes.children.push(new RouteNode('Maitres Nageurs', 'maitres'));

      const routes = new RouteNode('Accueil', 'root');
      routes.children.push(courseRoutes);
      routes.children.push(clubRoutes);
      routes.children.push(new RouteNode('Camp de jour', 'camp', 'navbar'));
      routes.children.push(new RouteNode('Formations de sauvetage', 'sauvetage', 'navbar'));
      routes.children.push(new RouteNode('Contact', 'contact', 'footer'));
      routes.children.push(new RouteNode('Politiques du club', 'politiques', 'footer'));
      routes.children.push(new RouteNode('Emploi', 'emploi', 'footer'));
      routes.children.push(new RouteNode('Conseil d\'administration', 'ca', 'footer'));

      setTimeout(() => resolve(routes), 1000);
    });
  }

}
