import { Http } from '@angular/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';

import { SortablejsOptions } from 'angular-sortablejs';

import { RouteNode } from './../../route-node';
import { SERVER_URL, SERVER_PORT } from '../../config';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  private routes: RouteNode;

  constructor( private route: ActivatedRoute, private http: Http, private router: Router ) { }

  ngOnInit() {
    this.route.data.subscribe((data: Data) => {
      this.routes = data['routes'];
    });
  }

  private saveAndRoute(routes: string[]): void {
    this.save();
    this.router.navigate(['admin'].concat(routes));
  }

  private save(): void {
    this.http.post(`http://${SERVER_URL}:${SERVER_PORT}/navigation`, this.routes);
  }

}
