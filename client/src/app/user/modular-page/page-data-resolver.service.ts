import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, UrlSegment, Router } from '@angular/router';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { SERVER_URL, SERVER_PORT } from './../../config';
import { RouteNode } from '../../route-node';

@Injectable()
export class PageDataResolverService implements Resolve<{}[]> {

  constructor(private router: Router, private http: Http) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{}[]> | Promise<{}[]> | {}[] {
    const path = route.url.map((segment: UrlSegment) => {
      return segment.path;
    }).join('_');

    return new Promise((resolve, reject) => {
      this.http
        .get(`http://${SERVER_URL}:${SERVER_PORT}/navigation/page/${path}`)
        .toPromise()
        .then((response: Response) => {
          if (response.text() === '' && state.url.split('/')[1] === 'app') {
            this.router.navigate(['/app', 'not-found']);
          }
          try {
            resolve(JSON.parse(response.text()));
          } catch (err) {
            resolve([]);
          }
        })
        .catch(reason => console.log(reason));
    });
  }

}
