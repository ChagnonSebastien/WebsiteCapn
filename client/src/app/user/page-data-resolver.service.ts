import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { RouteNode } from '../route-node';
import { UrlSegment } from '@angular/router/src/url_tree';

@Injectable()
export class PageDataResolverService implements Resolve<string> {

  constructor(private http: Http) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> | Promise<string> | string {
    console.log(route, state);
    return route.url.map((segment: UrlSegment) => {
      return segment.path;
    }).join('/');
  }

}
