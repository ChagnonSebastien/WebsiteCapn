import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { RouteNode } from './route-node';
import * as CONFIG from './config';

@Injectable()
export class RouteResolverService implements Resolve<RouteNode> {

  constructor(private http: Http) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RouteNode> | Promise<RouteNode> | RouteNode {
    return new Promise<RouteNode>((resolve, reject) => {
      this.http.get(`http://${CONFIG.SERVER_URL}:${CONFIG.SERVER_PORT}/navigation`).toPromise().then((response: Response) => {
        resolve(response.json());
      });
    });
  }

}