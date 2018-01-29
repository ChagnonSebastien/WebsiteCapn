import { ModalDirective } from 'ng-mdb-pro/free';
import { Response } from 'express';
import { AuthenticationService } from './../authentification.service';
import { Http } from '@angular/http';
import { GenericTextEditorComponent } from '../modular-page-editor/dynamic/generic-text-editor/generic-text-editor.component';
import { ActivatedRoute, Data } from '@angular/router';
import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ComponentRef,
  Type,
  ElementRef
} from '@angular/core';
import { DynamicComponent } from '../../user/modular-page/dynamic/dynamic.component';
import { ProgramEditorComponent } from './dynamic/program-editor/program-editor.component';
import { SelectComponent } from 'ng-mdb-pro/pro/material-select';
import { SortablejsDirective } from 'angular-sortablejs/dist';
import { SERVER_URL, SERVER_PORT } from '../../config';
import { UrlSegment } from '@angular/router/src/url_tree';
import { DEFAULT_MODULE } from '../admin.config';

@Component({
  selector: 'app-modular-page-editor',
  templateUrl: './modular-page-editor.component.html',
  styleUrls: ['./modular-page-editor.component.scss']
})
export class ModularPageEditorComponent implements OnInit {

  @ViewChild('success')
  private successModal: ModalDirective;

  @ViewChild('error')
  private errorModal: ModalDirective;

  @ViewChild('content')
  private contentModal: ModalDirective;

  @ViewChild('container', { read: ViewContainerRef })
  container: ViewContainerRef;

  @ViewChild('sortable')
  sortable: SelectComponent;

  public pageData: {}[];

  constructor(private route: ActivatedRoute, private http: Http, private authenticationService: AuthenticationService) {
    this.pageData = [];
  }

  public ngOnInit() {
    this.route.data.subscribe((data: Data) => {
      this.pageData = data['pageData'];
    });
  }

  public savePageData() {
    const path = this.route.snapshot.url.map((segment: UrlSegment) => {
      return segment.path;
    }).join('_');

    this.http
      .post(`http://${SERVER_URL}:${SERVER_PORT}/navigation/page/${path}`, {
        'token': this.authenticationService.getToken(),
        'data': this.pageData
      })
      .toPromise()
      .then((response: Response) => {
        if (response.json().success) {
          this.contentModal.hide();
          this.successModal.show();
        } else {
          setTimeout(() => {
            this.authenticationService.logOut();
          }, 3000);
          console.log(response.json().message);
          this.errorModal.show();
        }
      })
      .catch((reason: any) => {
        console.log(reason);
        this.errorModal.show();
      });
  }

  public newModule(): void {
    this.pageData.push({
      'type': DEFAULT_MODULE,
      'context': {},
      'visible': false
    });
  }

  private deleteModule(index: number) {
    this.pageData.splice(index, 1);
  }

}
