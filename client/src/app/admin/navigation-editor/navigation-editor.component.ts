import { Http, Headers, Response } from '@angular/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';

import { SortablejsOptions } from 'angular-sortablejs';

import { RouteNode } from '../../route-node';
import { SERVER_URL, SERVER_PORT } from '../../config';
import { ModalDirective } from 'ng-mdb-pro/free';

const headers = new Headers({ 'Content-Type': 'application/json' });

@Component({
  selector: 'app-navigation-editor',
  templateUrl: './navigation-editor.component.html',
  styleUrls: ['./navigation-editor.component.scss']
})
export class NavigationEditorComponent implements OnInit {

  @ViewChild('success')
  private successModal: ModalDirective;

  @ViewChild('error')
  private errorModal: ModalDirective;

  private routes: RouteNode;

  constructor( private route: ActivatedRoute, private http: Http, private router: Router ) { }

  ngOnInit() {
    this.route.data.subscribe((data: Data) => {
      this.routes = data['routes'];
    });
  }

  private saveAndRoute(routes: any): void {
    this.save()
      .then((success: boolean) => {
        if (success) {
          this.router.navigate(['/admin'].concat(routes));
        } else {
          this.errorModal.show();
        }
      })
      .catch((reason: any) => {
        this.errorModal.show();
        console.log(`Error while saving routes: ${reason}`);
      });
  }

  private saveAndStay(routes: string[]): void {
    this.save()
      .then((success: boolean) => {
        if (success) {
          this.successModal.show();
        } else {
          this.errorModal.show();
        }
      })
      .catch((reason: any) => {
        this.errorModal.show();
        console.log(`Error while saving routes: ${reason}`);
      });
  }

  private save(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
    this.http
      .post(`http://${SERVER_URL}:${SERVER_PORT}/navigation`, JSON.stringify(this.routes), {headers: headers})
      .toPromise()
      .then((response: Response) => {
        if (!response.json().error) {
          resolve(true);
        } else {
          reject(response.json().reason);
          resolve(false);
        }
      })
      .catch((reason: any) => {
        reject(reason);
        resolve(false);
      });
    });
  }

}
